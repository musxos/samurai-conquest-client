import { useEffect } from 'react';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import gsap from 'gsap';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

export function Map() {
  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="max-h-full max-w-full">
      <div id="canvas"></div>
    </div>
  );
}

function setup() {
  let container;
  let camera, scene, renderer;
  let cloudMesh, water, sun;

  const textureLoader = new THREE.TextureLoader();
  const cloudTexture = textureLoader.load('/cloud.jpg', function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  const cloudPlaneMaterial = new THREE.MeshStandardMaterial({
    alphaMap: cloudTexture,
    color: 0xffffff,
    transparent: true,
  });

  cloudPlaneMaterial.alphaMap.repeat.set(10, 10);
  cloudPlaneMaterial.opacity = 0.3;

  init();
  animate();

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  let activeSide;

  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('click', onMouseClick, false);

  function rotateSmooth(rotation: any) {
    gsap.to(camera.rotation, {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
      duration: 2,
      ease: 'power2.inOut',
    });
  }
  function moveSmooth(position: any) {
    gsap.to(camera.position, {
      x: position.x,
      y: position.y - 1,
      z: position.z,
      duration: 2,
      ease: 'power2.inOut',
    });
  }

  function onMouseMove(event: MouseEvent) {
    return;
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster
      .intersectObjects(scene.children, true)
      .filter((x) => x.object.name == 'side');
    if (intersects.length == 0) return;

    if (activeSide) {
      var material = activeSide.material;
      if (material.color) {
        material.color.set(0xffffff);
      }
    }
    activeSide = intersects[0].object;
    var material = (intersects[0].object as any).material;

    if (material.color) {
      material.color.set(0xff0000);
    }
  }

  function onMouseClick(event: MouseEvent) {
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster
      .intersectObjects(scene.children, true)
      .filter((x) => x.object.name == 'side');
    if (intersects.length == 0) return;
    const point = intersects[0].point;

    moveSmooth({
      x: point.x,
      y: 640,
      z: point.z + 200,
    });
    rotateSmooth({
      x: -Math.PI / 3.5,
      y: 0,
      z: 0,
    });
  }

  function init() {
    container = document.getElementById('canvas');

    //

    renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(window.devicePixelRatio * 0.9);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      5000,
    );
    camera.rotation.x = -Math.PI / 2;
    camera.position.set(0, 2800, 0);

    //

    sun = new THREE.Vector3();

    // Water

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        '/water4.jpg',
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        },
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x005dff,
      distortionScale: 120,
      fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;

    scene.add(water);

    // Skybox

    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
      elevation: 80,
      azimuth: 180,
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    let renderTarget;

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms['sunPosition'].value.copy(sun);
      water.material.uniforms['sunDirection'].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      renderTarget = pmremGenerator.fromScene(sky as any);

      scene.environment = renderTarget.texture;
    }

    updateSun();

    //

    window.addEventListener('resize', onWindowResize);

    const cloudPlaneGeometry = new THREE.PlaneGeometry(10000, 10000);

    const cloud = (cloudMesh = new THREE.Mesh(
      cloudPlaneGeometry,
      cloudPlaneMaterial,
    ));
    cloud.name = 'cloud';
    cloud.position.set(
      Math.random() * 800 - 400,
      300,
      Math.random() * 800 - 400,
    );
    cloud.rotation.x = -Math.PI / 2;
    scene.add(cloud);

    let light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(0, 1200, 0);
    light.lookAt(0, 0, 0);
    scene.add(light);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.shadow.mapSize.width = 10000;
    directionalLight.position.set(600, 1200, 0);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    const loader = new FBXLoader();

    loader.load(
      '/map.fbx',
      function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.name = 'side';
          }
        });

        new THREE.Box3()
          .setFromObject(object)
          .getCenter(object.position)
          .multiplyScalar(-1);
        object.position.y = -200;
        object.rotation.y = -Math.PI / 2;

        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function (error) {
        console.log('An error happened');
        console.error(error);
      },
    );
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    cloudPlaneMaterial.alphaMap.offset.y -= 0.00005;
    // console.log("Number of Triangles :", renderer.info.render.triangles);

    render();
  }

  function render() {
    water.material.uniforms['time'].value += 1.0 / 90.0;

    renderer.render(scene, camera);
  }
}
