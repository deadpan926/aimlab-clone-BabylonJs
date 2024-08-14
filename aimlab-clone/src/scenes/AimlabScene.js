import { Engine, Scene, Vector3, HemisphericLight, Texture, MeshBuilder, Matrix ,StandardMaterial,Color3, FreeCamera } from '@babylonjs/core';
import grassTexture from '@/assets/material/black.jpg';
let scene

const createScene = ( canvas, targetStore ) => {

    const engine = new Engine(canvas);
    const scene = new Scene(engine);
  
     // 创建 Camera
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    camera.setTarget(new Vector3(0, 5, 10));
    camera.attachControl(canvas, true);

    // 设置相机移动速度
    camera.speed = 0.03
    // 关闭相机的惯性
    camera.inertia = 0
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    // new PointLight("Omni", new Vector3(0, 100, 100), scene);
    // 创建墙
    const wall = MeshBuilder.CreatePlane('wall', { width: 20, height: 10 }, scene);
    wall.position = new Vector3(0, 5, 10);
    // 创建地
    const ground = MeshBuilder.CreateGround("ground",{width: 500, height: 500, subdivisions: 10}, scene);

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = new Texture("../assets/material/black.jpg", scene);
    groundMaterial.diffuseTexture = new Texture(grassTexture, scene, false, false, Texture.BILINEAR_SAMPLINGMODE, function() {
        console.log("Texture loaded successfully");
    }, function(err) {
        console.error("Error loading texture:", err);
    });
    ground.material = groundMaterial;
    // 创建红点材质
    const redMaterial = new StandardMaterial('redMaterial', scene);
    redMaterial.diffuseColor = new Color3(1, 0, 0);
    redMaterial.specularColor = new Color3(0, 0, 0);

    // 创建目标红点
    const createTarget = (size) => {
        const target = MeshBuilder.CreateSphere('target', { diameter: size }, scene);
        target.material = redMaterial;
        target.position = new Vector3(
        Math.random() * 18 - 9,
        Math.random() * 8 + 1,
        10
        );
        return target;
    };

    // 创建多个目标
    const targets = Array(10).fill().map(() => createTarget(targetStore.targetSize));

    console.log("targets", targetStore.targets)
    
    const shoot = () => {
        const pointerX = engine.getRenderWidth() / 2;
        const pointerY = engine.getRenderHeight() / 2;
        const ray = scene.createPickingRay(pointerX, pointerY, Matrix.Identity(), camera);
    
        // 检查射线是否与任何目标相交
        const hit = scene.pickWithRay(ray);
        console.log("hit prepare check")
        console.log("hit", hit)
        if (hit.pickedMesh && hit.pickedMesh.name.startsWith('target')) {
            console.log("Target hit:", hit.pickedMesh.name);
            const index = targets.findIndex(t => t.uniqueId === hit.pickedMesh.uniqueId);
            console.log("index", index)
            if (index !== -1) {
                console.log("remove mesh", targets[index])
                scene.removeMesh(targets[index]);
                console.log("Mesh removed from scene:", !scene.getMeshByUniqueID(targets[index].uniqueId));

                // 创建新目标
                const newTarget = createTarget(targetStore.targetSize);
                targets.push(newTarget)
            }
        }
    };

    // 射击功能
    // const shoot = () => {
    //     const pointerX = engine.getRenderWidth() / 2;
    //     const pointerY = engine.getRenderHeight() / 2;
    //     const ray = scene.createPickingRay(pointerX, pointerY, Matrix.Identity(), camera);
    
    //     // 检查射线是否与任何目标相交
    //     const hit = scene.pickWithRay(ray);
    //     console.log("hit prepare check")
    //     console.log("hit", hit)
    //     if (hit.pickedMesh && hit.pickedMesh.name.startsWith('target')) {
    //         console.log("Target hit:", hit.pickedMesh.name);
    //         const index = targetStore.targets.findIndex(t => t.uniqueId === hit.pickedMesh.uniqueId);
    //         console.log("index", index)
    //         if (index !== -1) {
    //             console.log("remove mesh", targetStore.targets[index])
    //             scene.removeMesh(targetStore.targets[index]);
    //             console.log("Mesh removed from scene:", !scene.getMeshByUniqueID(targetStore.targets[index].uniqueId));
    //             targetStore.removeTarget(index)

    //             // 创建新目标
    //             const newTarget = createTarget(targetStore.targetSize);
    //             targetStore.addTarget(newTarget)
    //         }
    //     }
    // };

    // 点击事件处理
    scene.onPointerDown = (evt, pickInfo) => {
        // console.log(pickInfo)
        if (evt.button === 0) {
            console.log("click left mouse")
            // 锁定指针
            engine.enterPointerlock()
            shoot()
        }
    };

    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener('resize', () => {
      engine.resize();
    });
  };



  export { createScene }