import { Engine, Scene, Vector3, HemisphericLight, MeshBuilder, Matrix ,StandardMaterial,Color3, FreeCamera } from '@babylonjs/core';
  
const createScene = ( canvas ) => {

    const engine = new Engine(canvas);
    const scene = new Scene(engine);
  
     // 创建 UniversalCamera
    const camera = new FreeCamera('camera', new Vector3(0, 1.6, -5), scene);
    camera.setTarget(new Vector3(0, 5, 10));
    camera.attachControl(canvas, true);

    // 设置相机移动速度
    camera.speed = 0.1
  
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    // 创建墙
    const wall = MeshBuilder.CreatePlane('wall', { width: 20, height: 10 }, scene);
    wall.position = new Vector3(0, 5, 10);

    // 创建红点材质
    const redMaterial = new StandardMaterial('redMaterial', scene);
    redMaterial.diffuseColor = new Color3(1, 0, 0);
    redMaterial.specularColor = new Color3(0, 0, 0);

    // 创建目标红点
    const createTarget = () => {
        const target = MeshBuilder.CreateSphere('target', { diameter: 0.2 }, scene);
        target.material = redMaterial;
        target.position = new Vector3(
        Math.random() * 18 - 9,
        Math.random() * 8 + 1,
        10
        );
        return target;
    };

    // 创建多个目标
    const targets = Array(10).fill().map(() => createTarget());
    
    // 射击功能
    const shoot = () => {
        const pointerX = engine.getRenderWidth() / 2;
        const pointerY = engine.getRenderHeight() / 2;
        const ray = scene.createPickingRay(pointerX, pointerY, Matrix.Identity(), camera);
        const hit = scene.pickWithRay(ray);

        console.log("Shoot called, hit:", hit.pickedMesh ? hit.pickedMesh.name : "nothing");

        if (hit.pickedMesh && hit.pickedMesh.name.startsWith('target')) {
            console.log("Target hit:", hit.pickedMesh.name);
            const index = targets.findIndex(t => t === hit.pickedMesh);
            if (index !== -1) {
                scene.removeMesh(targets[index]);
                targets.splice(index, 1);
                
                // 创建新目标
                const newTarget = createTarget();
                targets.push(newTarget);
            }
        }
    };

    // 点击事件处理
    scene.onPointerDown = (evt, pickInfo) => {
        console.log(pickInfo)
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