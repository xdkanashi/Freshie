@extends('layouts.app')

@section('title', 'Shipping and Delivery')
<link rel="stylesheet" href="{{ asset('css/shipping.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-5xl">
        <!-- Shipping Section -->
        <section class="max-w-full mx-auto px-4 md:px-6 pt-8 pb-12 md:pb-20 bg-black text-white fade-in-section">
            <!-- Shipping Title -->
            <div class="flex flex-col items-center text-center">
                <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4 font-sans animate-fade-in">
                    Shipping & Delivery</h1>
                <p class="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl">Fast. Reliable. Worldwide. Everything you need
                    to know about getting your order to your door.</p>
            </div>

            <!-- 3D Scene Container (Airplane Animation) -->
            <div id="scene-container" class="relative w-full h-[40vh] overflow-hidden mb-12 fade-in-section">
                <!-- Three.js will render here -->
            </div>

            <!-- Shipping Content -->
            <div class="w-full max-w-3xl mx-auto space-y-12">
                <!-- Shipping Info Block -->
                <div
                    class="block-cube block-content relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 fade-in-section">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-4 text-center">Shipping Information</h2>
                    <p class="text-base leading-relaxed text-gray-200">
                        We pride ourselves on swift and secure shipping worldwide. Orders are processed within <span
                            class="font-bold">1-2 business days</span>. Delivery times vary by destination—see below for
                        details.
                    </p>
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                </div>

                <!-- Delivery Times Block with Styled Cards -->
                <div class="block-cube block-content relative p-6 rounded-lg shadow-lg fade-in-section">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-6 text-center">Delivery Times</h2>
                    <div class="delivery-cards">
                        <div class="delivery-cards__inner">
                            <!-- Asia Card -->
                            <div class="delivery-card fade-in-grid-item">
                                <h2 class="delivery-card__heading">Asia</h2>
                                <p class="delivery-card__time">7-14 Days</p>
                                <ul class="delivery-card__bullets">
                                    <li>Express shipping available</li>
                                    <li>Tracking updates provided</li>
                                    <li>Customs support included</li>
                                </ul>
                            </div>
                            <!-- America Card -->
                            <div class="delivery-card fade-in-grid-item">
                                <h2 class="delivery-card__heading">America</h2>
                                <p class="delivery-card__time">5-10 Days</p>
                                <ul class="delivery-card__bullets">
                                    <li>Fast delivery to the US and Canada</li>
                                    <li>Real-time tracking</li>
                                    <li>Priority handling</li>
                                </ul>
                            </div>
                            <!-- Europe Card -->
                            <div class="delivery-card fade-in-grid-item">
                                <h2 class="delivery-card__heading">Europe</h2>
                                <p class="delivery-card__time">3-7 Days</p>
                                <ul class="delivery-card__bullets">
                                    <li>EU-wide shipping</li>
                                    <li>Tracking and support</li>
                                    <li>Expedited options available</li>
                                </ul>
                            </div>
                        </div>
                        <div class="delivery-overlay delivery-cards__inner"></div>
                    </div>
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                </div>

                <!-- Shipping Cost Calculator Placeholder -->
                <div class="relative p-6 rounded-lg shadow-lg fade-in-section">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-6 text-center">Estimate Shipping Costs</h2>
                    <p class="text-base leading-relaxed text-gray-200 mb-10 text-center">
                        Get an instant estimate by entering your destination below.
                    </p>
                    <div id="shipping-calculator" class="space-y-6">
                        <div class="shipping-control shipping-cube shipping-input relative">
                            <input type="text"
                                class="w-full bg-transparent border-0 px-3 mt-2 py-3 text-white text-base placeholder-white focus:outline-none"
                                placeholder="Country / Region *" id="shipping-country" maxlength="30" required
                                autocomplete="off">
                            <div id="country-dropdown"
                                class="absolute top-full left-0 w-full bg-black border border-white rounded mt-1 hidden z-10 max-h-60 overflow-y-auto">
                                <!-- Список стран будет добавляться через JS -->
                            </div>
                            <div class="shipping-bg-top">
                                <div class="shipping-bg-inner"></div>
                            </div>
                            <div class="shipping-bg-right">
                                <div class="shipping-bg-inner"></div>
                            </div>
                            <div class="shipping-bg">
                                <div class="shipping-bg-inner"></div>
                            </div>
                        </div>
                        <button id="calculate-shipping"
                            class="shipping-btn shipping-cube shipping-cube-hover w-32 mx-auto flex items-center justify-center px-4 py-2 text-white text-base font-bold uppercase tracking-wider">
                            <div class="shipping-bg-top">
                                <div class="shipping-bg-inner"></div>
                            </div>
                            <div class="shipping-bg-right">
                                <div class="shipping-bg-inner"></div>
                            </div>
                            <div class="shipping-bg">
                                <div class="shipping-bg-inner"></div>
                            </div>
                            <div class="shipping-text">Calculate</div>
                        </button>
                        <p id="shipping-result" class="text-gray-300 hidden">Estimated Cost: Calculating...</p>
                    </div>
                </div>

                <!-- Animation Container for Typing Effect (Hidden by default, appears on typing) -->
                <div id="typing-animation-container"
                    class="relative w-full h-0 overflow-hidden opacity-0 transition-all duration-1000 ease-in-out">
                    <!-- Three.js will render typing animation here -->
                </div>

                <!-- FAQ Section -->
                <div class="mt-16 w-full max-w-3xl mx-auto fade-in-section">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-8 text-center">Frequently Asked Questions</h2>
                    <div class="space-y-4">
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                Can I expedite my shipping?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                Yes! Expedited options are available at checkout for most regions. Contact us for custom
                                requests.
                            </div>
                        </div>
                        <!-- Другие FAQ элементы остаются без изменений -->
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                What if my package is delayed?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                We’ll work with the carrier to resolve it. Reach out to us with your tracking number for
                                assistance.
                            </div>
                        </div>
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                Do you ship internationally?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                Yes, we ship to most countries worldwide. Enter your destination in the shipping calculator
                                to check availability and costs.
                            </div>
                        </div>
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                Can I change my shipping address after placing an order?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                If your order hasn’t been processed yet, we can update the address. Please contact us as
                                soon as possible with your order number.
                            </div>
                        </div>
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                What are the shipping costs for my region?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                Shipping costs vary by region. Use the "Estimate Shipping Costs" tool above to get an
                                accurate quote for your destination.
                            </div>
                        </div>
                        <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                            <button
                                class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                                How can I track my order?
                                <span class="text-gray-400">+</span>
                            </button>
                            <div class="faq-content hidden mt-2 text-gray-300 text-base">
                                Once your order ships, you’ll receive a tracking number via email. You can use it on our
                                website or the carrier’s site to monitor your package.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('styles')
    <style>
        html {
            scroll-behavior: smooth;
            /* Плавный скроллинг для всей страницы */
        }

        #typing-animation-container {
            transition: opacity 1s ease-in-out, height 1s ease-in-out;
        }
    </style>
@endsection

@section('scripts')
    <script type="module">
        import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
        import { TrackballControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/TrackballControls.js";
        import { OBJLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js";
        import { MeshSurfaceSampler } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/math/MeshSurfaceSampler.js";
        import * as CANNON from "https://cdn.skypack.dev/cannon-es";
        import { gsap } from "https://cdn.skypack.dev/gsap";

        console.clear();
        window.THREE = THREE;
        window.TweenMax = gsap;

        // 3D Scene at the Top (Airplane Animation)
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / document.getElementById('scene-container').offsetHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, document.getElementById('scene-container').offsetHeight);
        document.getElementById('scene-container').appendChild(renderer.domElement);

        camera.position.z = 250;
        camera.position.y = 100;

        const controls = new TrackballControls(camera, renderer.domElement);
        controls.noPan = true;
        controls.maxDistance = 600;
        controls.minDistance = 150;
        controls.rotateSpeed = 2;

        const group = new THREE.Group();
        scene.add(group);
        group.rotation.y = 2;

        let subgroups = [];
        let airplane = new THREE.Group();
        new OBJLoader().load("https://assets.codepen.io/127738/Airplane_model2.obj", (obj) => {
            airplane = obj;
            const mat = new THREE.MeshPhongMaterial({
                emissive: 0xffffff,
                emissiveIntensity: 0.3
            });
            airplane.children.forEach(child => {
                child.geometry.scale(0.013, 0.013, 0.013);
                child.geometry.translate(0, 122, 0);
                child.material = mat;
            });
            let angles = [0.3, 1.3, 2.14, 2.6];
            let speeds = [0.008, 0.01, 0.014, 0.02];
            let rotations = [0, 2.6, 1.5, 4];
            for (let i = 0; i < 4; i++) {
                const g = new THREE.Group();
                g.speed = speeds[i];
                subgroups.push(g);
                group.add(g);
                const g2 = new THREE.Group();
                let _airplane = airplane.clone();
                g.add(g2);
                g2.add(_airplane);
                g2.rotation.x = rotations[i];
                g.rotation.y = angles[i];
                g.reverse = i < 2;
                if (i < 2) {
                    _airplane.children[0].geometry = airplane.children[0].geometry.clone().rotateY(Math.PI);
                }
            }
        });

        let sampler = [];
        let earth = null;
        let paths = [];
        new OBJLoader().load(
            "https://assets.codepen.io/127738/NOVELO_EARTH.obj",
            (obj) => {
                earth = obj.children[0];
                earth.geometry.scale(0.35, 0.35, 0.35);
                earth.geometry.translate(0, -133, 0);

                let positions = Array.from(earth.geometry.attributes.position.array).splice(0, 3960 * 3);
                const landGeom = new THREE.BufferGeometry();
                landGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
                const land = new THREE.Mesh(landGeom);

                positions = Array.from(earth.geometry.attributes.position.array).splice(3960 * 3, 540 * 3);
                const waterGeom = new THREE.BufferGeometry();
                waterGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
                waterGeom.computeVertexNormals();
                const waterMat = new THREE.MeshLambertMaterial({ color: 0x0da9c3, transparent: true, opacity: 1 });
                const water = new THREE.Mesh(waterGeom, waterMat);
                group.add(water);

                const light = new THREE.HemisphereLight(0xccffff, 0x000033, 1);
                scene.add(light);

                sampler = new MeshSurfaceSampler(land).build();

                for (let i = 0; i < 24; i++) {
                    const path = new Path();
                    paths.push(path);
                    group.add(path.line);
                }

                renderer.setAnimationLoop(render);
            },
            (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
            (err) => console.error(err)
        );

        const tempPosition = new THREE.Vector3();
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xbbde2d, transparent: true, opacity: 0.6 });
        class Path {
            constructor() {
                this.geometry = new THREE.BufferGeometry();
                this.line = new THREE.Line(this.geometry, lineMaterial);
                this.vertices = [];

                sampler.sample(tempPosition);
                this.previousPoint = tempPosition.clone();
            }
            update() {
                let pointFound = false;
                while (!pointFound) {
                    sampler.sample(tempPosition);
                    if (tempPosition.distanceTo(this.previousPoint) < 12) {
                        this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
                        this.previousPoint = tempPosition.clone();
                        pointFound = true;
                    }
                }
                this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
            }
        }

        const look = new THREE.Vector3(0, 0, 0);
        function render(a) {
            group.rotation.y += 0.001;
            subgroups.forEach(g => {
                g.children[0].rotation.x += (g.speed * (g.reverse ? -1 : 1));
            });
            paths.forEach(path => {
                if (path.vertices.length < 35000) {
                    path.update();
                }
            });
            controls.update();
            renderer.render(scene, camera);
        }

        window.addEventListener("resize", onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / document.getElementById('scene-container').offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, document.getElementById('scene-container').offsetHeight);
        }

        // Typing Animation Below Calculator (Updated with Cardboard Boxes)
        class Stage {
            constructor(scale, font) {
                this.width = 0;
                this.scale = 1;
                this.wrappingImages = [
                    'https://assets.ste.vg/codepen/cardboard1.jpg',
                    'https://assets.ste.vg/codepen/cardboard2.jpg',
                    'https://assets.ste.vg/codepen/cardboard3.jpg'
                ];
                this.letterTextures = [];
                this.presentTextures = [];
                this.scale = scale;
                this.font = font;

                for (var i in this.wrappingImages) {
                    var letterTexture = new THREE.TextureLoader().load(this.wrappingImages[i]);
                    letterTexture.wrapS = THREE.RepeatWrapping;
                    letterTexture.wrapT = THREE.RepeatWrapping;
                    letterTexture.repeat.set(0.1, 0.1);
                    this.letterTextures.push(letterTexture);

                    var presentTexture = new THREE.TextureLoader().load(this.wrappingImages[i]);
                    presentTexture.wrapS = THREE.RepeatWrapping;
                    presentTexture.wrapT = THREE.RepeatWrapping;
                    presentTexture.repeat.set(1, 1);
                    this.presentTextures.push(presentTexture);
                }

                THREE.Cache.enabled = true;
                this.container = document.getElementById('typing-animation-container');
                this.camera = new THREE.PerspectiveCamera(30, this.container.clientWidth / this.container.clientHeight, 1, 1500);
                this.camera.position.set(0, 0, 0);
                this.cameraTarget = new THREE.Vector3(0, 10, 0);

                this.scene = new THREE.Scene();
                this.dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
                this.dirLight.position.set(10 * this.scale, 20 * this.scale, 1 * this.scale);
                this.dirLight.target.position.set(0, 0, 0);
                this.dirLight.castShadow = true;
                this.dirLight.shadow.camera.near = 10 * this.scale;
                this.dirLight.shadow.camera.far = 100 * this.scale;
                this.dirLight.shadow.camera.left = -20 * this.scale;
                this.dirLight.shadow.camera.right = 20 * this.scale;
                this.dirLight.shadow.camera.top = 55 * this.scale;
                this.dirLight.shadow.camera.bottom = -10 * this.scale;
                this.scene.add(this.dirLight);
                this.scene.add(this.dirLight.target);

                this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
                this.group = new THREE.Group();
                this.group.position.y = 100;
                this.scene.add(this.group);

                // Плоскость с прозрачным фоном
                this.plane = new THREE.Mesh(
                    new THREE.PlaneBufferGeometry(1000 * this.scale, 1000 * this.scale),
                    new THREE.MeshLambertMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0 // Полностью прозрачный материал
                    })
                );
                this.plane.receiveShadow = true;
                this.scene.add(this.plane);

                this.renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true // Включаем прозрачность для рендера
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                this.renderer.setClearColor(0x000000, 0); // Прозрачный фон сцены
                this.renderer.shadowMap.enabled = true;
                this.container.appendChild(this.renderer.domElement);

                this.onResize();
                this.moveCamera(0);
            }

            setPlane(physicsPlane) {
                this.plane.position.copy(physicsPlane.position);
                this.plane.quaternion.copy(physicsPlane.quaternion);
            }

            moveCamera(x) {
                var newYZ = 60 + (x / 2);
                if (newYZ > 60) newYZ = 60;
                TweenMax.to(this.camera.position, 0.4, { x: (-10 + x) * this.scale, z: newYZ * this.scale, y: newYZ * this.scale });
                TweenMax.to(this.cameraTarget, 0.4, { x: x * this.scale });
                TweenMax.to(this.plane.position, 0.4, { x: x * this.scale });
            }

            render() {
                this.camera.lookAt(this.cameraTarget);
                this.renderer.clear();
                this.renderer.render(this.scene, this.camera);
            }

            onResize() {
                this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                var vFOV = this.camera.fov * Math.PI / 180;
                var height = 2 * Math.tan(vFOV / 2) * this.camera.position.z;
                var aspect = this.container.clientWidth / this.container.clientHeight;
                this.width = height * aspect;
            }

            createPresent(sizeX, sizeY, sizeZ) {
                var geometry = new THREE.BoxGeometry(sizeX * this.scale, sizeY * this.scale, sizeZ * this.scale);
                var texture = this.presentTextures[Math.floor(Math.random() * this.presentTextures.length)];
                var material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, shininess: 0 });
                var mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                this.scene.add(mesh);
                return mesh;
            }

            createLetter(letter) {
                var texture = this.letterTextures[Math.floor(Math.random() * this.letterTextures.length)];
                var material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, shininess: 0 });
                var textGeo = new THREE.TextGeometry(letter, {
                    font: this.font,
                    size: 6 * this.scale,
                    height: 1.5 * this.scale,
                    curveSegments: 2,
                    bevelThickness: 0,
                    bevelSize: 0.1,
                    bevelEnabled: true
                });
                textGeo.computeBoundingBox();
                textGeo.computeVertexNormals();
                var centerOffsetX = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
                var centerOffsetZ = 0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
                var textMesh = new THREE.Mesh(textGeo, material);
                textMesh.position.x = centerOffsetX;
                textMesh.position.y = -1 * this.scale;
                textMesh.position.z = centerOffsetZ;
                textMesh.rotation.x = -Math.PI / 2;
                textMesh.castShadow = true;
                var letterContainer = new THREE.Group();
                letterContainer.add(textMesh);
                this.scene.add(letterContainer);
                return letterContainer;
            }
        }

        class Physics {
            constructor(scale = 1) {
                this.scale = scale;
                this.world = new CANNON.World();
                this.world.gravity.set(0, -40 * this.scale, 0);
                this.world.broadphase = new CANNON.SAPBroadphase(this.world);
                this.world.solver.iterations = 10;

                this.groundBody = new CANNON.Body({ mass: 0 });
                const groundShape = new CANNON.Plane();
                this.groundBody.addShape(groundShape);
                const rot = new CANNON.Vec3(1, 0, 0);
                this.groundBody.quaternion.setFromAxisAngle(rot, -(Math.PI / 2));
                this.world.addBody(this.groundBody);

                const groundMaterial = new CANNON.Material("groundMaterial");
                const ground_ground_cm = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
                    friction: 1,
                    restitution: 0.3,
                    contactEquationStiffness: 1e8,
                    contactEquationRelaxation: 3,
                    frictionEquationStiffness: 1e8,
                });
                this.world.addContactMaterial(ground_ground_cm);
                this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
                this.world.defaultContactMaterial.contactEquationRelaxation = 10;
            }

            createPhysics(xPos, yPos, zPos, x = 2, y = 2, z = 2, angularRandomness = 1) {
                const shape = new CANNON.Box(new CANNON.Vec3(x * this.scale, y * this.scale, z * this.scale));
                const body = new CANNON.Body({
                    mass: 1 * this.scale,
                    position: new CANNON.Vec3(xPos * this.scale, yPos * this.scale, zPos * this.scale)
                });
                body.addShape(shape);
                body.velocity.set(0, -80 * this.scale, 0);
                body.angularVelocity.set(
                    ((Math.random() * angularRandomness) - (angularRandomness / 2)) * this.scale,
                    ((Math.random() * angularRandomness) - (angularRandomness / 2)) * this.scale,
                    ((Math.random() * angularRandomness) - (angularRandomness / 2)) * this.scale
                );
                body.angularDamping = 0.8;
                this.world.addBody(body);
                return body;
            }

            jump(body, amount) {
                body.angularVelocity.set(
                    ((Math.random() * 3) - 1.5) * this.scale,
                    ((Math.random() * 3) - 1.5) * this.scale,
                    ((Math.random() * 3) - 1.5) * this.scale
                );
                body.velocity.set(0, amount * this.scale, 0);
            }

            remove(body) {
                this.world.removeBody(body);
            }

            tick() {
                this.world.step(1 / 60);
            }
        }

        function initTypingAnimation(font) {
            const worldScale = 2;
            const typingContainer = document.getElementById('typing-animation-container');
            const stage = new Stage(worldScale, font);
            const physics = new Physics(worldScale);
            stage.setPlane(physics.groundBody);

            // Инициализация рендера с минимальными размерами, если контейнер не виден
            const computedStyle = window.getComputedStyle(typingContainer);
            if (computedStyle.opacity === '0') {
                stage.renderer.setSize(1, 1); // Минимальный размер для предотвращения ошибок
            }

            window.addEventListener('resize', function () {
                stage.onResize();
                const computedOpacity = window.getComputedStyle(typingContainer).opacity;
                if (computedOpacity === '1') {
                    stage.renderer.setSize(typingContainer.clientWidth, typingContainer.clientHeight);
                    stage.render(); // Рендерим при изменении размера
                } else {
                    stage.renderer.setSize(1, 1); // Скрываем рендер при невидимости
                }
            }, false);

            const letters = [];
            let count = 0;
            const presents = [];
            let doPhysics = false;
            let pauseTimer = null;

            const inputField = document.getElementById('shipping-country');

            inputField.addEventListener('input', (event) => {
                console.log('Input event triggered:', event.target.value); // Отладка
                const newLetter = event.data || event.target.value.slice(-1);
                if (!newLetter || newLetter === ' ') return;

                // Плавное появление typing-animation-container при вводе текста
                const computedOpacity = window.getComputedStyle(typingContainer).opacity;
                if (computedOpacity === '0') {
                    console.log('Showing typing container');
                    typingContainer.style.opacity = '1';
                    typingContainer.style.height = '40vh'; // Восстанавливаем высоту

                    // Начинаем рендеринг сразу, даже если размеры ещё не финальные
                    stage.renderer.setSize(typingContainer.clientWidth, typingContainer.clientHeight || 1);
                    stage.onResize();
                    stage.render();

                    // Ждём завершения CSS-перехода, чтобы обновить размеры рендера
                    typingContainer.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'height' || e.propertyName === 'opacity') {
                            console.log('Transition ended, updating renderer size');
                            stage.renderer.setSize(typingContainer.clientWidth, typingContainer.clientHeight);
                            stage.onResize();
                            stage.render();
                            typingContainer.removeEventListener('transitionend', handler); // Удаляем обработчик после выполнения
                        }
                    });
                }

                count++;
                const x = count * 4;
                stage.moveCamera(x);
                doPhysics = true;

                const letter = {
                    letter: stage.createLetter(newLetter),
                    physics: physics.createPhysics(x, 50, 0, 2, 1, 2, 1)
                };

                for (let i = 0; i < Math.ceil(Math.random() * 3); i++) {
                    const sizeX = 1 + Math.ceil(Math.random() * 3);
                    const sizeY = 1 + Math.ceil(Math.random() * 3);
                    const sizeZ = 1 + Math.ceil(Math.random() * 3);
                    const present = {
                        present: stage.createPresent(sizeX, sizeY, sizeZ),
                        physics: physics.createPhysics(x, 30 + (i * 5), (Math.random() * 20) - 10, sizeX / 2, sizeY / 2, sizeZ / 2, 6)
                    };
                    presents.push(present);
                }

                letters.push(letter);
                const lettersToTrack = 15;
                while (letters.length > lettersToTrack) {
                    const l = letters.shift();
                    physics.remove(l.physics);
                }
                while (presents.length > (lettersToTrack * 3)) {
                    const p = presents.shift();
                    physics.remove(p.physics);
                }

                if (pauseTimer) clearTimeout(pauseTimer);
                pauseTimer = setTimeout(() => {
                    doPhysics = false;
                }, 5000);
            });

            function animate() {
                requestAnimationFrame(animate);
                if (doPhysics) physics.tick();
                for (let i in letters) {
                    letters[i].letter.position.copy(letters[i].physics.position);
                    letters[i].letter.quaternion.copy(letters[i].physics.quaternion);
                }
                for (let i in presents) {
                    presents[i].present.position.copy(presents[i].physics.position);
                    presents[i].present.quaternion.copy(presents[i].physics.quaternion);
                }
                const computedOpacity = window.getComputedStyle(typingContainer).opacity;
                if (computedOpacity === '1') {
                    stage.render();
                }
            }
            animate();
        }

        function loadFont() {
            const loader = new THREE.FontLoader();
            loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (response) {
                initTypingAnimation(response);
            }, undefined, function (error) {
                console.error('Font loading error:', error);
            });
        }
        loadFont();
    </script>
    <script>
        // FAQ Toggle Functionality
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const isHidden = content.classList.contains('hidden');

                content.classList.toggle('hidden');
                toggle.querySelector('span').textContent = isHidden ? '−' : '+';

                if (!isHidden) {
                    content.style.height = '0px';
                    content.style.opacity = '0';
                } else {
                    content.style.height = `${content.scrollHeight}px`;
                    content.style.opacity = '1';
                }
            });
        });

        // Delivery Cards Cursor-Following Glow Effect
        const deliveryCardsContainer = document.querySelector(".delivery-cards");
        const deliveryCardsContainerInner = document.querySelector(".delivery-cards__inner");
        const deliveryCards = Array.from(document.querySelectorAll(".delivery-card"));
        const deliveryOverlay = document.querySelector(".delivery-overlay");

        const applyOverlayMask = (e) => {
            const overlayEl = e.currentTarget;
            const rect = deliveryCardsContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const constrainedX = Math.max(0, Math.min(rect.width, x));
            const constrainedY = Math.max(0, Math.min(rect.height, y));

            overlayEl.style.setProperty('--opacity', '1');
            overlayEl.style.setProperty('--x', `${constrainedX}px`);
            overlayEl.style.setProperty('--y', `${constrainedY}px`);
        };

        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const cardIndex = deliveryCards.indexOf(entry.target);
                let width = entry.borderBoxSize[0].inlineSize;
                let height = entry.borderBoxSize[0].blockSize;

                if (cardIndex >= 0) {
                    const overlayCard = deliveryOverlay.children[cardIndex];
                    overlayCard.style.width = `${width}px`;
                    overlayCard.style.height = `${height}px`;
                    overlayCard.style.display = 'flex';
                    overlayCard.style.flexDirection = 'column';
                    overlayCard.style.padding = '1.5em 2em';
                    overlayCard.style.borderRadius = '15px';
                }
            });
        });

        const initOverlayCard = (cardEl) => {
            const overlayCard = document.createElement("div");
            overlayCard.classList.add("delivery-card");
            deliveryOverlay.appendChild(overlayCard);
            observer.observe(cardEl);
        };

        deliveryCards.forEach(initOverlayCard);

        deliveryCardsContainer.addEventListener("pointerenter", () => {
            deliveryOverlay.style.setProperty('--opacity', '1');
        });

        deliveryCardsContainer.addEventListener("pointermove", applyOverlayMask);

        deliveryCardsContainer.addEventListener("pointerleave", () => {
            deliveryOverlay.style.setProperty('--opacity', '0');
        });

        // Scroll Animation Logic
        document.addEventListener('DOMContentLoaded', function () {
            const sections = document.querySelectorAll('.fade-in-section');
            const gridItems = document.querySelectorAll('.fade-in-grid-item');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                        console.log('Section visible:', entry.target);
                        entry.target.classList.add('visible');
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 150); // Staggered delay for grid items
                        itemObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            gridItems.forEach(item => {
                itemObserver.observe(item);
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            const shippingCountryInput = document.getElementById('shipping-country');
            const countryDropdown = document.getElementById('country-dropdown');
            const calculateButton = document.getElementById('calculate-shipping');
            const shippingResult = document.getElementById('shipping-result');

            // Список регионов (расширенный до регионов и подрегионов)
            const countries = [
                // Основные регионы
                'Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America',
                // Африка
                'Central Africa', 'East Africa', 'North Africa', 'Southern Africa', 'West Africa',
                // Азия
                'Central Asia', 'East Asia', 'South Asia', 'Southeast Asia', 'West Asia',
                // Австралия и Океания
                'Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia',
                // Европа
                'Central Europe', 'Eastern Europe', 'Northern Europe', 'Southern Europe', 'Western Europe',
                // Северная Америка
                'Caribbean', 'Central America', 'Northern America',
                // Южная Америка
                'Andean South America', 'Southern Cone', 'Tropical South America'
            ];

            // Функция для отображения списка стран
            function updateDropdown(filter = '') {
                countryDropdown.innerHTML = '';
                const filteredCountries = countries.filter(country =>
                    country.toLowerCase().startsWith(filter.toLowerCase())
                );

                if (filteredCountries.length > 0 && filter) {
                    filteredCountries.forEach(country => {
                        const div = document.createElement('div');
                        div.className = 'px-3 py-2 text-white text-base hover:bg-gray-800 cursor-pointer';
                        div.textContent = country;
                        div.addEventListener('click', () => {
                            shippingCountryInput.value = country;
                            countryDropdown.classList.add('hidden');
                        });
                        countryDropdown.appendChild(div);
                    });
                    countryDropdown.classList.remove('hidden');
                } else {
                    countryDropdown.classList.add('hidden');
                }
            }

            // Обработка ввода в поле
            shippingCountryInput.addEventListener('input', function () {
                const value = this.value.trim();
                updateDropdown(value);
            });

            // Скрытие выпадающего списка при клике вне
            document.addEventListener('click', function (e) {
                if (!shippingCountryInput.contains(e.target) && !countryDropdown.contains(e.target)) {
                    countryDropdown.classList.add('hidden');
                }
            });

            // Обработка клика по кнопке "Calculate"
            calculateButton.addEventListener('click', function () {
                const selectedCountry = shippingCountryInput.value.trim();
                if (selectedCountry && countries.includes(selectedCountry)) {
                    shippingResult.textContent = `Estimated Cost: ${selectedCountry} is 12.99€`;
                    shippingResult.classList.remove('hidden');
                } else {
                    shippingResult.textContent = 'Please select a valid country/region.';
                    shippingResult.classList.remove('hidden');
                }
            });
        });
    </script>
@endsection