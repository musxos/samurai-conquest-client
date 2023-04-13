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
    <div className="relative h-screen w-full">
      <div className="h-full w-full" id="canvas"></div>
      <div className="absolute top-5 flex w-full justify-center gap-2">
        <div className="h-12 w-12 rounded-full border-4 border-neutral-700">
          <img className="rounded-full" alt="test" src="/1.png" />
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-neutral-700">
          <img className="rounded-full" alt="test" src="/2.png" />
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-neutral-700">
          <img className="rounded-full" alt="test" src="/3.png" />
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-neutral-700">
          <img className="rounded-full" alt="test" src="/4.png" />
        </div>
      </div>
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
      y: 1080,
      z: point.z - 200,
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

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setPixelRatio(window.devicePixelRatio * 0.9);
    renderer.setSize(container.clientWidth, container.clientHeight);
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

    sun = new THREE.Vector3(1000, 1000, 0);

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
      distortionScale: 3.7,
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
    light.position.set(700, 50, 0);
    light.lookAt(0, 0, 0);

    light.castShadow = true;    
    scene.add(light);


    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.position.set(600, 1000, 0);
    directionalLight.lookAt(0, 0, 0);

    directionalLight.shadow.mapSize.width = 10000;
    directionalLight.shadow.mapSize.height = 10000;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 5000;
    scene.add(directionalLight);


    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/base_color.jpg');

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
    });

    const loader = new FBXLoader();
    loader.setResourcePath('/');

    loader.load(
      '/hexagons.fbx',
      function (object) {
        object.scale.set(100, 100, 100);

        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.name = 'side';
            child.material = material;
          }

          child.castShadow = true;
          child.receiveShadow = true;
        });

        new THREE.Box3()
          .setFromObject(object)
          .getCenter(object.position)
          .multiplyScalar(-1);
        object.position.y = 50;
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
