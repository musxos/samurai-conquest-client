import { useEffect, useState } from 'react';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import gsap from 'gsap';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';
import { DeployCommandButton } from './commands/deploy-command.button';
import { MoveCommandButton } from './commands/move-command.button';
import { HealCommandButton } from './commands/heal-command.button';
import { CampCommandButton } from './commands/camp-command.button';
import { useGame } from '@/hooks/useGame';
import { UncampCommandButton } from './commands/uncamp-command.button';
import { DropButtonCommand } from './commands/drop-command.button';

export function TestCard() {
  return (
    <div className="map-agent-in absolute bottom-0 flex w-full justify-center">
      <div className="mx-auto flex w-full max-w-screen-md items-center rounded-t-xl bg-neutral-950/50 px-6 py-6 backdrop-blur-2xl">
        <img className="h-20 w-20 rounded-2xl" alt="test" src="/art/1.png" />
        <div className="ml-4 flex h-full flex-col">
          <h4 className="font-medium">Green Samurai</h4>
          <span>In Bilmem ne krallığı.</span>
        </div>
        <div className="ml-auto grid w-full max-w-sm grid-cols-2 gap-4">
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-red-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">32</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-red-500"
                style={{ maxWidth: '72%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-blue-500">
              <i className="ri-shield-fill mr-1"></i>{' '}
              <span className="text-sm">32</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-blue-500"
                style={{ maxWidth: '72%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-yellow-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">32</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-yellow-500"
                style={{ maxWidth: '72%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-green-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">32</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-green-500"
                style={{ maxWidth: '72%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Map() {
  const [area, setArea] = useState(null);
  const [agent, setAgent] = useState(null);
  const [land, setLand] = useState(null);
  const { game } = useGame();

  const onAgentSelected = () => {
    setAgent('test');
  };

  const onAreaSelected = (name: string) => {
    if (area == name) {
      return;
    }

    const [_, id] = name.split('_');

    setArea(id);
    onAreaChanged(id);
  };

  async function onAreaChanged(id: string) {
    setLand(id);
  }

  useEffect(() => {
    setup({
      onAreaSelected,
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full w-full" id="canvas"></div>
      <div className="absolute top-5 flex w-full justify-center gap-2">
        <button
          onClick={onAgentSelected}
          className="rounded-full border-4 border-neutral-800 border-l-blue-500 border-r-red-500"
        >
          <img className="h-14 w-14 rounded-full" alt="test" src="/art/1.png" />
        </button>
        <button
          onClick={onAgentSelected}
          className="rounded-full border-4 border-neutral-800 border-l-blue-500 border-r-red-500"
        >
          <img className="h-14 w-14 rounded-full" alt="test" src="/art/2.png" />
        </button>
        <button
          onClick={onAgentSelected}
          className="rounded-full border-4 border-neutral-800 border-l-blue-500 border-r-red-500"
        >
          <img className="h-14 w-14 rounded-full" alt="test" src="/art/3.png" />
        </button>
      </div>

      {land && (
        <div className="map-land-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-neutral-950/50 px-8 py-4 backdrop-blur-2xl">
          <h1 className="mb-2 text-2xl font-medium">teeest</h1>
          <p className="text-sm">435345345</p>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="col-span-1 flex h-16 items-center justify-between rounded-xl bg-neutral-950/50 px-6">
              <i className="ri-database-line text-2xl"></i>
              <span className="text-xl">33</span>
            </div>
            <div className="col-span-1 h-32">
              <img
                className="h-full w-full rounded-xl"
                alt="asd"
                src="https://cdn.discordapp.com/attachments/1097614586724765806/1097711747361669213/f6357992-6d38-4e53-a7aa-d8c57c026523.jpg"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-neutral-950/50 px-6 py-6">
              <div className="flex flex-col items-center">
                <i className="ri-shield-line text-4xl"></i>

                <span className="mt-2 text-sm">+33</span>
              </div>
              <div>--------/--------</div>
              <div className="flex flex-col items-center">
                <i className="ri-sword-line text-4xl"></i>

                <span className="mt-2 text-sm">+44</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between gap-4">
              <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-neutral-950/50 px-4 py-4">
                <i className="ri-shield-line text-2xl"></i>
                <ul className="w-full">
                  <li className="flex justify-between">
                    <div>test </div>
                    <div className="font-medium">+33</div>
                  </li>
                </ul>
              </div>
              <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-neutral-950/50 px-4 py-4">
                <i className="ri-sword-line text-2xl"></i>
                <ul className="w-full">
                  <li className="flex justify-between">
                    <div>test</div>
                    <div className="font-medium">+44</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="mt-auto grid grid-cols-3 gap-3">
              <DeployCommandButton></DeployCommandButton>
              <MoveCommandButton></MoveCommandButton>
              <HealCommandButton></HealCommandButton>
              {game.samurai &&
                game.samurai?.camp &&
                game.samurai?.campPosition == game.land && (
                  <CampCommandButton></CampCommandButton>
                )}
              {game.samurai &&
                game.samurai?.camp &&
                game.samurai?.campPosition != game.land && (
                  <UncampCommandButton></UncampCommandButton>
                )}
              <button className="flex items-center justify-center rounded-full bg-neutral-950/50 px-4 py-2">
                <i className="ri-hand-coin-fill mr-1 text-2xl"></i>
                <span>Collect</span>
              </button>
              <DropButtonCommand></DropButtonCommand>
            </div>
          </div>
        </div>
      )}
      {agent && <TestCard></TestCard>}
    </div>
  );
}

function setup({ onAreaSelected }) {
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
      .filter((x) => x.object.name.includes('side'));
    if (intersects.length == 0) return;
    const point = intersects[0].point;

    onAreaSelected(intersects[0].object.name);
  }

  function init() {
    container = document.getElementById('canvas');

    //

    renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    });

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setPixelRatio(window.devicePixelRatio * 0.9);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      10000,
    );
    camera.rotation.x = -Math.PI / 3;
    camera.position.set(0, 4000, 2700);

    //

    sun = new THREE.Vector3(1000, 1000, 0);

    // Water

    const waterGeometry = new THREE.PlaneGeometry(15000, 15000);

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
      1200,
      Math.random() * 800 - 400,
    );
    cloud.rotation.x = -Math.PI / 2;
    scene.add(cloud);

    let light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(700, 50, 0);
    light.lookAt(0, 0, 0);

    light.castShadow = true;

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.position.set(4500, 1500, 100);

    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 10000;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.bottom = -5;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.lookAt(0, 0, 0);

    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/base_color.jpg');

    const material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    const loader = new FBXLoader();
    loader.setResourcePath('/');

    loader.load(
      '/hexagons.fbx',
      function (object) {
        object.scale.set(100, 100, 100);

        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            const formattedName = 'side_' + child.name;
            child.name = formattedName;
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
