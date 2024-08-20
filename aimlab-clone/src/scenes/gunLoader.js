import { SceneLoader, Vector3, StandardMaterial, TransformNode, Color3} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";


async function loadGLTFModel(scene, camera, right_hand_mode = true) {
    const modelPath = '/src/assets/gun_model/sci_fi_gun/';
    const fileName = 'Sci-fi-Gun.glb';

    try {
        const result = await SceneLoader.ImportMeshAsync("", modelPath, fileName, scene);
        console.log(result)
        result.meshes.forEach(m => {
            m.parent = camera
            m.material = new StandardMaterial("");
            m.material.diffuseColor = new Color3(Math.random(),Math.random(),Math.random());
            m.scaling = new Vector3(0.2,0.2,0.2)
            // 调整枪支相对于相机的位置
            m.position = new Vector3(-2, -1.1, 4.5);

            // 如果需要,调整枪支的旋转
            m.rotation = new Vector3(degToRad(0), degToRad(-70), degToRad(15));
        });
        return result
    } catch (error) {
        console.error("Error loading the gun model:", error);
    }
  }

function degToRad(degrees) {
return degrees * (Math.PI / 180);
}

export { loadGLTFModel }