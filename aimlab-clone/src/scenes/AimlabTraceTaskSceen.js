import { Engine, Scene, Vector3, HemisphericLight, Texture, MeshBuilder, Matrix, StandardMaterial, Color3, FreeCamera, Animation } from '@babylonjs/core';
import grassTexture from '@/assets/material/black.jpg';

let scene, target, isTracking = false;

const createScene = (canvas, targetStore) => {
    const engine = new Engine(canvas);
    scene = new Scene(engine);

    // 创建 Camera
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    camera.setTarget(new Vector3(0, 5, 10));
    camera.attachControl(canvas, true);

    // 设置相机移动速度
    camera.speed = 0.03;
    // 关闭相机的惯性
    camera.inertia = 0;
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    // 创建墙
    const wall = MeshBuilder.CreatePlane('wall', { width: 20, height: 10 }, scene);
    wall.position = new Vector3(0, 5, 10);

    // 创建地
    const ground = MeshBuilder.CreateGround("ground", {width: 500, height: 500, subdivisions: 10}, scene);

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture(grassTexture, scene, false, false, Texture.BILINEAR_SAMPLINGMODE, 
        () => console.log("Texture loaded successfully"),
        (err) => console.error("Error loading texture:", err)
    );
    ground.material = groundMaterial;

    // 创建红点材质
    const redMaterial = new StandardMaterial('redMaterial', scene);
    redMaterial.diffuseColor = new Color3(1, 0, 0);
    redMaterial.specularColor = new Color3(0, 0, 0);

    // 创建黄点材质
    const yellowMaterial = new StandardMaterial('yellowMaterial', scene);
    yellowMaterial.diffuseColor = new Color3(1, 1, 0);
    yellowMaterial.specularColor = new Color3(0, 0, 0);

    // 创建目标红点
    const createTarget = () => {
        target = MeshBuilder.CreateSphere('target', { diameter: 0.5 }, scene);
        target.material = redMaterial;
        target.position = new Vector3(0, 5, 10);
        return target;
    };

    target = createTarget();

    const startTracking = () => {
        isTracking = true;
        animateTarget();
    };

    const animateTarget = () => {
        const frameRate = 10;
        const xSlide = new Animation("xSlide", "position.x", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        const ySlide = new Animation("ySlide", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        const keyFrames = {
            x: [],
            y: []
        };

        keyFrames.x.push({ frame: 0, value: target.position.x });
        keyFrames.y.push({ frame: 0, value: target.position.y });

        for (let i = 1; i <= 100; i++) {
            keyFrames.x.push({ frame: i * frameRate, value: Math.random() * 18 - 9 });
            keyFrames.y.push({ frame: i * frameRate, value: Math.random() * 8 + 1 });
        }

        xSlide.setKeys(keyFrames.x);
        ySlide.setKeys(keyFrames.y);

        target.animations.push(xSlide);
        target.animations.push(ySlide);

        scene.beginAnimation(target, 0, 100 * frameRate, true);
    };

    const shoot = () => {
        if (!isTracking) {
            startTracking();
            return;
        }

        const pointerX = engine.getRenderWidth() / 2;
        const pointerY = engine.getRenderHeight() / 2;
        const ray = scene.createPickingRay(pointerX, pointerY, Matrix.Identity(), camera);

        const hit = scene.pickWithRay(ray);
        if (hit.pickedMesh && hit.pickedMesh.name === 'target') {
            target.material = yellowMaterial;
            setTimeout(() => {
                target.material = redMaterial;
            }, 100);
        }
    };

    // 点击事件处理
    scene.onPointerDown = (evt) => {
        if (evt.button === 0) {
            engine.enterPointerlock();
            shoot();
        }
    };

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
};

export { createScene };