@extends('layouts.app')

@section('title', 'Checkout')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">

@section('content')
    <div class="container mx-auto max-w-4xl p-6 bg-black text-white text-center">
        <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4 font-sans animate-fade-in">
            Checkout</h1>

        <!-- Sold Out Warning with z-index -->
        <div class="text-red-500 text-2xl font-bold mb-6 text-center relative z-50">
            THIS PRODUCT IS NOT AVAILABLE - SOLD OUT
        </div>

        <!-- 3D Object Container -->
        <div id="threejs-container" class="max-w-lg mx-auto h-[500px] mt-24 flex items-center justify-center">
            <!-- Контейнер для 3D-объекта с центрированием и увеличенным отступом сверху -->
        </div>
    </div>
@endsection

@section('scripts')
    <script type="importmap">
                    {
                      "imports": {
                        "three": "https://unpkg.com/three@0.171.0/build/three.webgpu.js",
                        "three/webgpu": "https://unpkg.com/three@0.171.0/build/three.webgpu.js",
                        "three/tsl": "https://unpkg.com/three@0.171.0/build/three.tsl.js",
                        "three/addons/": "https://unpkg.com/three@0.171.0/examples/jsm/"
                      }
                    }
                </script>

    <script type="module">
        import * as THREE from "three";
        import * as tsl from "three/tsl";
        import { OrbitControls } from "three/addons/controls/OrbitControls.js";

        import { pass, mrt, output, emissive } from "three/tsl";
        import { bloom } from 'three/addons/tsl/display/BloomNode.js';

        console.clear();

        class Postprocessing extends THREE.PostProcessing {
            constructor(renderer) {
                const scenePass = pass(scene, camera);
                scenePass.setMRT(
                    mrt({
                        output,
                        emissive
                    })
                );

                const outputPass = scenePass.getTextureNode();
                const emissivePass = scenePass.getTextureNode("emissive");

                const bloomPass = bloom(emissivePass, 0.2, 0);

                super(renderer);

                this.outputNode = outputPass.add(bloomPass);
            }
        }

        class BoxOfLight extends THREE.Mesh {
            constructor() {
                let g = new THREE.BoxGeometry();
                let m = new THREE.MeshPhysicalNodeMaterial({
                    side: THREE.DoubleSide,
                    metalness: 0,
                    roughnessNode: tsl.smoothstep(
                        tsl.abs(
                            tsl.dot(
                                tsl.normalView,
                                tsl.positionView.normalize().negate()
                            )
                        ),
                        0.1,
                        0.25
                    ).oneMinus(),
                    transmission: 1,
                    ior: 1.345,
                    thickness: 1,
                    emissiveNode: tsl.Fn(() => {
                        let uv = tsl.uv().toVar();
                        let absUV = uv.sub(0.5).abs().toVar();
                        let maxUV = tsl.max(absUV.x, absUV.y);

                        let fn = tsl.smoothstep(0.48, 0.49, maxUV);

                        let col = tsl.color(0xaaccff).mul(2);

                        return col.mul(fn);
                    })()
                });
                super(g, m);

                // Уменьшаем масштаб на 2% (0.98)
                this.scale.set(0.98, 0.98, 0.98);

                [
                    [1, 0, 0],
                    [-1, 0, 0],
                    [0, 1, 0],
                    [0, -1, 0],
                    [0, 0, 1],
                    [0, 0, -1]
                ].forEach(l => {
                    let v = new THREE.Vector3(...l);
                    let light = new THREE.SpotLight(0xaaccff, Math.PI * 10, 10, Math.PI * 0.75, 1, 2);
                    light.position.copy(v);
                    light.target.position.copy(v.multiplyScalar(2));
                    this.add(light);
                    this.add(light.target);
                });

                this.inits = {
                    rot: { x: Math.PI * 2 * Math.random(), y: Math.PI * 2 * Math.random(), z: Math.PI * 2 * Math.random() }
                }
            }

            update(t) {
                this.rotation.set(
                    this.inits.rot.x + t * 0.4 * Math.PI * 2,
                    this.inits.rot.y + t * 0.2 * Math.PI * 2,
                    this.inits.rot.z
                )
                this.position.y = 2.0 + Math.sin(t * Math.PI * 2 * 0.125) * 0.75; // Увеличено базовое положение y до 2.0
            }
        }

        class HollySurface extends THREE.Mesh {
            constructor() {
                let shape = new THREE.Shape([[1, 1], [-1, 1], [-1, -1], [1, -1]].reverse().map(p => { return new THREE.Vector2(...p).multiplyScalar(10) }));
                let size = 1.5;
                let radius = 0.5;
                let center = size - radius;
                let hole = new THREE.Path()
                    .absarc(center, center, radius, Math.PI * 0.5 * 0, Math.PI * 0.5 * 1)
                    .absarc(-center, center, radius, Math.PI * 0.5 * 1, Math.PI * 0.5 * 2)
                    .absarc(-center, -center, radius, Math.PI * 0.5 * 2, Math.PI * 0.5 * 3)
                    .absarc(center, -center, radius, Math.PI * 0.5 * 3, Math.PI * 0.5 * 4)
                shape.holes.push(hole);

                let g = new THREE.ExtrudeGeometry(
                    shape,
                    {
                        depth: 0.875,
                        bevelSize: 0.05,
                        bevelThickness: 0.05,
                        bevelSegments: 10
                    }
                ).rotateX(-Math.PI * 0.5).rotateY(Math.PI * 0.25).translate(0, 0, 0);
                let m = new THREE.MeshStandardMaterial({
                    color: 0x444444,
                    metalness: 0.6,
                    roughness: 0.4
                });

                super(g, m);
                this.position.y = 0.0; // Сдвигаем поверхность ниже
            }
        }

        let scene = new THREE.Scene();
        scene.backgroundNode = tsl.color(0x000000);
        let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
        camera.position.set(0, 5, 8); // Поднята камера для лучшего обзора
        camera.lookAt(0, 2.0, 0); // Смотрим на новое положение куба
        let renderer = new THREE.WebGPURenderer({ antialias: true });
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(innerWidth, innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        document.getElementById('threejs-container').appendChild(renderer.domElement);

        let postprocessing = new Postprocessing(renderer);

        window.addEventListener("resize", (event) => {
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        });

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 5;
        controls.maxDistance = 15;
        controls.maxPolarAngle = Math.PI * 0.45;
        controls.autoRotate = true;
        controls.target.set(0, 2.0, 0); // Центр вращения смещен вниз

        let hollySurface = new HollySurface();
        scene.add(hollySurface);

        let boxOfLight = new BoxOfLight();
        boxOfLight.position.set(0, 2.0, 0); // Сдвигаем куб ниже
        scene.add(boxOfLight);

        let clock = new THREE.Clock();
        let t = 0;

        renderer.setAnimationLoop(() => {
            let dt = clock.getDelta();
            t += dt;
            controls.update();
            boxOfLight.update(t);
            postprocessing.render();
        });

        // Simple fade-in animation
        const fadeSections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeSections.forEach(section => {
            observer.observe(section);
        });
    </script>
@endsection