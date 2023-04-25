import { useEffect, useState } from 'react';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import gsap from 'gsap';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, OutlineEffect, BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three';
import { DeployCommandButton } from './commands/deploy-command.button';
import { MoveCommandButton } from './commands/move-command.button';
import { HealCommandButton } from './commands/heal-command.button';
import { CampCommandButton } from './commands/camp-command.button';
import { useGame } from '@/hooks/useGame';
import { UncampCommandButton } from './commands/uncamp-command.button';
import { DropButtonCommand } from './commands/drop-command.button';
import Image from 'next/image';
import useAPI from '@/hooks/useAPI';
import { useUser } from '@/hooks/useUser';

export function LandCard() {
  const { game } = useGame();

  return (
    <div className="map-agent-in absolute bottom-0 flex w-full justify-center">
      <div className="mx-auto flex w-full max-w-screen-md items-center rounded-t-xl bg-neutral-950/50 px-6 py-6 backdrop-blur-2xl">
        <Image width={256} height={256} className="h-20 w-20 rounded-2xl" alt="test" src={"/art/" + game.samurai.TokenId + ".png"} />
        <div className="ml-4 flex h-full flex-col">
          <h4 className="font-medium">{game.samurai.TokenName}</h4>
        </div>
        <div className="ml-auto grid w-full max-w-sm grid-cols-2 gap-4">
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-red-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">{game.samurai.Attack}</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-red-500"
                style={{ maxWidth: game.samurai.Attack * 5 + '%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-blue-500">
              <i className="ri-shield-fill mr-1"></i>{' '}
              <span className="text-sm">{game.samurai.Defence}</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-blue-500"
                style={{ maxWidth: (game.samurai.Defence * 5) + '%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-yellow-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">{game.samurai.Chakra}</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-yellow-500"
                style={{ maxWidth: (game.samurai.Chakra * 5) + '%' }}
              ></div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="mb-1 flex items-center text-green-500">
              <i className="ri-sword-fill mr-1"></i>{' '}
              <span className="text-sm">{game.samurai.CurrentAgility}</span>
            </span>
            <div className="h-2 rounded-full bg-neutral-800">
              <div
                className="stats h-2 rounded-full bg-green-500"
                style={{ maxWidth: (game.samurai.CurrentAgility * 5) + '%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Map() {
  const user = useUser();
  const [area, setArea] = useState(null);

  const { game, setLand, setSamurai } = useGame();
  const { land: landAPI, user: userApi } = useAPI();
  const [locations, setLocations] = useState([])
  const [deck, setDeck] = useState([]);

  const onAgentSelect = (data) => {
    setSamurai(data); // TODO: Need samurai data
  };

  const onAreaSelect = (name: string) => {
    if (area == name) {
      return;
    }

    const [_, id] = name.split('_');

    setArea(id);
    onAreaChanged(id);
  };

  async function onAreaChanged(id: string) {
    const landData = await landAPI.getLand(id);

    if (landData) {
      setLand(landData[0]);
    } else {
      setLand(null);
    }
  }

  useEffect(() => {
    getDeck().then(async () => {
      console.log(1)
      await setup({
        locations: locations,
        setLocations: setLocations,
        onAreaSelect,
        deck,
      });
      console.log(2)
      setLocations([...locations]);
    })
  }, []);

  useEffect(() => {
    const _window = window as any
    const scene = _window.scene;
    console.log(locations);

    locations.forEach((location) => {
      const agentInLocation = deck.some(x => x.Location == location.id);

      if (agentInLocation) {
        gsap.to(location.mesh.position, {
          x: location.mesh.position.x,
          y: location.mesh.position.y + 0.5,
          z: location.mesh.position.z,
          duration: 1,
          ease: 'power2.inOut',
        });
      }

    })
  }, [locations])

  const getDeck = async () => {
    const _deck = await userApi.getOwnedNFTs(user.user.address);

    setDeck(_deck);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full w-full" id="canvas"></div>
      <div className="absolute top-5 flex w-full justify-center gap-2">
        {deck.map((x, i) => (<button
          key={i}
          onClick={() => onAgentSelect(x)}
          className="rounded-full border-4 border-neutral-800 border-l-blue-500 border-r-red-500"
        >
          <Image
            height={56}
            width={56}
            className="h-14 w-14 rounded-full"
            alt="test"
            src={"/art/" + x.TokenId + ".png"}
          />
        </button>))}
      </div>

      {game.land && (
        <div className="map-land-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-neutral-950/50 px-8 py-4 backdrop-blur-2xl">
          <h1 className="mb-2 text-2xl font-medium">{game.land.name}</h1>
          <p className="text-sm">{game.land.desc}</p>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="col-span-1 flex flex-col rounded-xl bg-neutral-950/50 px-6 py-4">
              <h1 className='text-white/80'>Land Details</h1>
              <div className="col-span-1 flex h-16 items-center justify-between rounded-xl ">
                <i className="ri-database-line text-xl"></i>
                <span className="text-lg">{game.land.value}</span>
              </div>
            </div>
            {game.land.uri && (
              <div className="col-span-1 h-32">
                <img
                  className="h-full w-full rounded-xl"
                  alt="asd"
                  src={game.land.uri}
                />
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-neutral-950/50 px-6 py-6">
              <div className="flex flex-col items-center">
                <i className="ri-shield-line text-4xl"></i>

                <span className="mt-2 text-sm">
                  +{game.land.defendersPower}
                </span>
              </div>
              <div>--------/--------</div>
              <div className="flex flex-col items-center">
                <i className="ri-sword-line text-4xl"></i>

                <span className="mt-2 text-sm">
                  +{game.land.attackersPower}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between gap-4">
              <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-neutral-950/50 px-4 py-4">
                <i className="ri-shield-line text-2xl"></i>
                <ul className="w-full">
                  {game.land.attackerSamurai.map((x, i) => (
                    <li key={i} className="flex justify-between">
                      <div>{x.name}</div>
                      <div className="font-medium">+{x.power}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-neutral-950/50 px-4 py-4">
                <i className="ri-sword-line text-2xl"></i>
                <ul className="w-full">
                  {game.land.defenderSamurai.map((x, i) => (
                    <li key={i} className="flex justify-between">
                      <div>{x.name}</div>
                      <div className="font-medium">+{x.power}</div>
                    </li>
                  ))}
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
                game.land &&
                game.samurai?.campPosition == game.land.id && (
                  <CampCommandButton></CampCommandButton>
                )}
              {game.samurai &&
                game.samurai?.camp &&
                game.land &&
                game.samurai?.campPosition != game.land.id && (
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
      {game.samurai && <LandCard></LandCard>}
    </div>
  );
}

async function setup({ onAreaSelect, locations, setLocations, deck }) {
  let container;
  let camera, scene, renderer, composer;
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

  await init();
  animate();

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  let activeSide;

  document.addEventListener('click', onMouseClick, false);

  function onMouseClick(event: MouseEvent) {
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster
      .intersectObjects(scene.children, true)
      .filter((x) => x.object.name.includes('side'));
    if (intersects.length == 0) return;
    const point = intersects[0].point;

    onAreaSelect(intersects[0].object.name);
  }

  async function init() {
    container = document.getElementById('canvas');

    //

    renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
    });

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setPixelRatio(window.devicePixelRatio * 0.9);
    renderer.setSize(container.clientWidth, container.clientHeight);

    composer = new EffectComposer(renderer);
    composer.autoRenderToScreen = true;
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new EffectPass(camera, new BloomEffect({
      blendFunction: BlendFunction.COLOR_DODGE,
      kernelSize: KernelSize.VERY_LARGE,
      intensity: 60,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.1,
      height: container.clientHeight,
      width: container.clientWidth,
    })))


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

    const group = await loader.loadAsync(
      '/map.fbx',
      function (event) {
        console.log((event.loaded / event.total) * 100 + '% loaded');
      },
    );


    group.traverse(function (child: any) {
      if (child instanceof THREE.Mesh) {

        if (!isNaN(Number(child.name))) {
          const payload = {
            name: child.name,
            id: Number(child.name),
            location: child.position,
            mesh: child,
          }

          locations.push(payload)
        }

        const formattedName = 'side_' + child.name;
        child.name = formattedName;
        child.material = material;
      }


      child.castShadow = true;
      child.receiveShadow = true;
    });

    group.scale.set(100, 100, 100)

    new THREE.Box3()
      .setFromObject(group)
      .getCenter(group.position)
      .multiplyScalar(-1);
    group.position.y = 50;

    scene.add(group);


    (window as any).scene = scene;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    cloudPlaneMaterial.alphaMap.offset.y -= 0.00005;

    composer.render()
    render();
  }

  function render() {
    water.material.uniforms['time'].value += 1.0 / 90.0;
    renderer.render(scene, camera);
  }
}
