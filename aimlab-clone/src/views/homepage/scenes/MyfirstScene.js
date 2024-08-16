import { Engine, Scene, Vector3, HemisphericLight, Texture, ArcRotateCamera, MeshBuilder, Matrix ,StandardMaterial,Color3, FreeCamera } from '@babylonjs/core';
import "@babylonjs/loaders/OBJ/objFileLoader";
import "@babylonjs/loaders/glTF";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
// import grassTexture from '@/assets/material/black.jpg';
// import { loadGLTFModel } from '../../../scenes/gunLoader'

let scene

 const createScene = async( canvas ) => {

    const engine = new Engine(canvas);
    const scene = new Scene(engine);
  
     // 创建 Camera
     const camera = new ArcRotateCamera(
        "camera", // camera name
        Math.PI / 2, // 相机的alpha值，水平旋转角度
        Math.PI / 2, // 相机的beta值，垂直旋转角度
        100, // 相机的直径
        Vector3.Zero(), // 相机的目标点
        scene // 相机所在的场景
      );
    
      camera.attachControl(canvas, true);

    // 创建 Camera
    // const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    camera.setTarget(new Vector3(0, 0, 0));
    // camera.attachControl(canvas, true);

    // 设置相机移动速度
    // camera.speed = 0.1;
    // 关闭相机的惯性
    camera.inertia = 0;

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 1.5;

    // // 测试枪模型加载
    // loadGunModel(scene, camera)
    await loadGLTFModel(scene, camera)


    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener('resize', () => {
      engine.resize();
    });
  };


  async function loadGLTFModel(scene, camera) {
    const modelPath = '/src/assets/gun_model/sci_fi_gun/';
    const fileName = 'Sci-fi-Gun.glb';

    try {
        const result = await SceneLoader.ImportMeshAsync("", modelPath, fileName, scene);
        console.log(result)
        result.meshes.forEach(m => {
            m.parent = camera
            m.material = new StandardMaterial("");
            m.material.diffuseColor = new Color3(Math.random(),Math.random(),Math.random());
            m.scaling = new Vector3(0.5,0.5,0.5)
            // 调整枪支相对于相机的位置
            m.position = new Vector3(-2, -1.1, 6);

            // 如果需要,调整枪支的旋转
            m.rotation = new Vector3(degToRad(0), degToRad(-70), degToRad(15));
        });
    } catch (error) {
        console.error("Error loading the gun model:", error);
    }
  }

  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  async function loadGunModel(scene, camera) {
    const modelPath = '/src/assets/gun_model/Tanfoglio3D/';
    const fileName = 'Tanfoglio Black Custom.obj';
    console.log("Attempting to load gun model...");

    try {
        const result = await SceneLoader.ImportMeshAsync("", modelPath, fileName, scene, (meshes) => {
            for (let index = 0; index < meshes.length; index++) {
                meshes[index].scaling = new Vector3(0.00001,0.00001,0.00001);
                
            }
        });
        console.log("Model loaded successfully. Number of meshes:", result.meshes.length);
        

        if (result.meshes.length > 0) {
            console.log("Meshes found:", result.meshes.map(mesh => mesh.name));
            const gunMesh = result.meshes[0];  // 假设第一个mesh是主要的枪支模型
            
            // 将枪支设为场景的子对象，而不是相机的子对象
            gunMesh.parent = null;
            
            // 调整枪支位置，使其在视野内
            gunMesh.position = new Vector3(0, 0, 0);
            
            // 调整缩放
            gunMesh.scaling = new Vector3(0.0000001, 0.0000001, 0.0000001);  // 可能需要根据实际模型大小调整
            
            // 添加材质以确保可见性
            const gunMaterial = new StandardMaterial("gunMaterial", scene);
            gunMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
            gunMesh.material = gunMaterial;

            // 打印边界信息
            // const boundingInfo = gunMesh.getBoundingInfo();
            // console.log("Model bounding box:", boundingInfo.boundingBox.minimumWorld, boundingInfo.boundingBox.maximumWorld);

            // 添加一个参考球体
            const sphere = MeshBuilder.CreateSphere("refSphere", {diameter: 1}, scene);
            sphere.position = new Vector3(0, 0, 5);
            sphere.material = new StandardMaterial("sphereMat", scene);
            sphere.material.diffuseColor = new Color3(1, 0, 0);  // 红色

            console.log("Gun mesh setup complete");
        } else {
            console.log("No meshes were loaded");
        }
    } catch (error) {
        console.error("Error loading the gun model:", error);
    }
}


  export { createScene }