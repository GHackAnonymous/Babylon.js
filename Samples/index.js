﻿var onload = function () {
    var canvas = document.getElementById("renderCanvas");

    // Demos
    var demos = [
        {
            title: "TRAIN", scene: "Train", screenshot: "train.jpg", size: "70 MB", big: true, onload: function () {
                scene.collisionsEnabled = false;
                for (var index = 0; index < scene.cameras.length; index++) {
                    scene.cameras[index].minZ = 10;
                }

                scene.activeCamera.detachControl(canvas);
                scene.activeCamera = scene.cameras[4];
                scene.activeCamera.attachControl(canvas);
                scene.getMaterialByName("terrain_eau").bumpTexture = null;
            }
        },
        {
            title: "ROBOT", url: "Scenes/Robot/index.html", screenshot: "robot.jpg", size: "8.5 MB", onload: function () {
                scene.collisionsEnabled = false;
            }
        },
        { title: "WORLDMONGER", url: "Scenes/Worldmonger/index.html", screenshot: "worldmonger.jpg", size: "8.5 MB" },
        { title: "HEART", scene: "Heart", screenshot: "heart.jpg", size: "14 MB", },
        {
            title: "ESPILIT", scene: "Espilit", screenshot: "espilit.jpg", size: "50 MB", incremental: true, onload: function () {
                scene.autoClear = true;
                scene.createOrUpdateSelectionOctree();
            }
        },
        { title: "WINDOWS CAFE", scene: "WCafe", screenshot: "wcafe.jpg", size: "28 MB" },
        {
            title: "FLAT 2009",
            scene: "Flat2009",
            screenshot: "flat2009.jpg",
            size: "44 MB",
            onload: function () {
                var ecran = scene.getMeshByName("Ecran");
                ecran.material.diffuseTexture = new BABYLON.VideoTexture("video", ["Scenes/Flat2009/babylonjs.mp4", "Scenes/Flat2009/babylonjs.webm"], 256, scene, true);
                scene.createOrUpdateSelectionOctree();
            }
        },
        { title: "THE CAR", scene: "TheCar", screenshot: "thecar.jpg", size: "100 MB", incremental: true },
        { title: "VIPER", scene: "Viper", screenshot: "viper.jpg", size: "18 MB" },
        { title: "SPACESHIP", scene: "Spaceship", screenshot: "spaceship.jpg", size: "1 MB" },
        {
            title: "OMEGA CRUSHER", scene: "SpaceDek", screenshot: "omegacrusher.jpg", size: "10 MB", onload: function () {
                scene.collisionsEnabled = false;
            }
        }];

    var tests = [
        { title: "OCTREE - 8000 spheres", id: 8, screenshot: "octree.jpg", size: "0.1 MB" },
        { title: "BONES", id: 9, screenshot: "bones.jpg", size: "10 MB" },
        { title: "CHARTING", id: 7, screenshot: "charting.jpg", size: "0.1 MB" },
        { title: "SHADOWS", id: 6, screenshot: "shadows.jpg", size: "1.0 MB" },
        { title: "HEIGHTMAP", id: 5, screenshot: "heightmap.jpg", size: "1.0 MB" },
        { title: "LIGHTS", id: 1, screenshot: "testlight.jpg", size: "0.1 MB" },
        { title: "BUMP", id: 2, screenshot: "bump.jpg", size: "0.1 MB" },
        { title: "FOG", id: 3, screenshot: "fog.jpg", size: "0.1 MB" },
        { title: "MULTIMATERIAL", id: 4, screenshot: "multimat.jpg", size: "0.1 MB" },
        { title: "BLENDER", scene: "blender", screenshot: "blender.jpg", size: "0.2 MB" },
        { title: "SCENE #1", id: 0, screenshot: "testscene.jpg", size: "10 MB" }
    ];

    var thirdParties = [
    { title: "CAR GAME", url: "http://babylon.azurewebsites.net", screenshot: "car.jpg", size: "by G. Carlander" },
    { title: "CYCLE GAME", url: "http://tronbabylon.azurewebsites.net/", screenshot: "tron.jpg", size: "by G. Carlander" },
    { title: "GALLERY", url: "http://guillaume.carlander.fr/Babylon/Gallery/", screenshot: "gallery.png", size: "by G. Carlander" }
    ];

    // UI
    var opacityMask = document.getElementById("opacityMask");
    var menuPanel = document.getElementById("screen1");
    var items = document.getElementById("items");
    var testItems = document.getElementById("testItems");
    var _3rdItems = document.getElementById("3rdItems");
    var renderZone = document.getElementById("renderZone");
    var controlPanel = document.getElementById("controlPanel");
    var cameraPanel = document.getElementById("cameraPanel");
    var wireframe = document.getElementById("wireframe");
    var divFps = document.getElementById("fps");
    var stats = document.getElementById("stats");
    var enableStats = document.getElementById("enableStats");
    var loadingBack = document.getElementById("loadingBack");
    var loadingText = document.getElementById("loadingText");
    var hardwareScalingLevel = document.getElementById("hardwareScalingLevel");
    var collisions = document.getElementById("collisions");
    var status = document.getElementById("status");
    var fullscreen = document.getElementById("fullscreen");
    var touchCamera = document.getElementById("touchCamera");
    var deviceOrientationCamera = document.getElementById("deviceOrientationCamera");
    var camerasList = document.getElementById("camerasList");

    var sceneChecked;

    var itemClick = function (demo) {
        return function () {
            // Check support
            if (!BABYLON.Engine.isSupported()) {
                document.getElementById("notSupported").className = "";
                opacityMask.className = "";
            } else {
                if (demo.url) {
                    window.location = demo.url;
                    return;
                }
                loadScene(demo.id !== undefined ? demo.id : demo.scene, demo.incremental ? ".incremental" : "", function () {
                    if (demo.collisions !== undefined) {
                        scene.collisionsEnabled = demo.collisions;
                    }

                    if (demo.onload) {
                        demo.onload();
                    }
                });
            };
        };
    };

    var createItem = function (item, root) {
        var span = document.createElement("span");
        var img = document.createElement("img");
        var div = document.createElement("div");
        var label2 = document.createElement("label");

        if (item.big) {
            span.className = "big-item";
            var newImg = document.createElement("img");
            var newText = document.createElement("div");
            newImg.id = "newImg";
            newImg.src = "Assets/SpotLast.png";
            newText.innerHTML = "LAST<br>UPDATE";
            newText.id = "newText";
            span.appendChild(newImg);
            span.appendChild(newText);
        } else {
            span.className = "item";
        }

        img.className = "item-image";
        img.src = "Screenshots/" + item.screenshot;
        span.appendChild(img);

        div.className = "item-text";
        div.innerHTML = item.title;
        span.appendChild(div);

        label2.className = "item-text-right";
        label2.innerHTML = item.size;
        span.appendChild(label2);

        span.onclick = itemClick(item);

        root.appendChild(span);
    };

    // Demos
    for (var index = 0; index < demos.length; index++) {
        var demo = demos[index];
        createItem(demo, items);
    }

    // Tests
    for (index = 0; index < tests.length; index++) {
        var test = tests[index];
        createItem(test, testItems);
    }

    // 3rd party
    for (index = 0; index < thirdParties.length; index++) {
        var thirdParty = thirdParties[index];
        createItem(thirdParty, _3rdItems);
    }

    // Go Back
    var goBack = function () {
        if (scene) {
            scene.dispose();
            scene = null;
        }
        menuPanel.className = "";
        renderZone.className = "movedRight";
    };

    // History
    if (window.onpopstate !== undefined) {
        window.onpopstate = function () {
            goBack();
        };
    }

    // Babylon
    var engine = new BABYLON.Engine(canvas, true);
    var scene;

    var restoreUI = function () {
        loadingBack.className = "loadingBack";
        loadingText.className = "loadingText";
        menuPanel.className = "movedLeft";
        renderZone.className = "";
        opacityMask.className = "hidden";
        sceneChecked = true;

        camerasList.options.length = 0;

        for (var index = 0; index < scene.cameras.length; index++) {
            var camera = scene.cameras[index];
            var option = new Option();
            option.text = camera.name;
            option.value = camera;

            if (camera == scene.activeCamera) {
                option.selected = true;
            }

            camerasList.appendChild(option);
        }
    };

    var loadScene = function (name, incremental, then) {
        // Cleaning
        if (scene) {
            scene.dispose();
            scene = null;
        }

        sceneChecked = false;

        // History
        if (history.pushState) {
            history.pushState({}, name, window.location.pathname + window.location.search);
        }

        // Loading
        var importScene = function () {
            loadingBack.removeEventListener("transitionend", importScene);
            loadingBack.removeEventListener("webkitTransitionend", importScene);

            engine.resize();

            if (typeof name == "number") {
                var newScene;

                switch (name) {
                    case 0:
                        newScene = CreateTestScene(engine);
                        break;
                    case 1:
                        newScene = CreateLightsTestScene(engine);
                        break;
                    case 2:
                        newScene = CreateBumpScene(engine);
                        break;
                    case 3:
                        newScene = CreateFogScene(engine);
                        break;
                    case 4:
                        newScene = CreateMultiMaterialScene(engine);
                        break;
                    case 5:
                        newScene = CreateHeightMapTestScene(engine);
                        break;
                    case 6:
                        newScene = CreateShadowsTestScene(engine);
                        break;
                    case 7:
                        newScene = CreateChartingTestScene(engine);
                        break;
                    case 8:
                        newScene = CreateOctreeTestScene(engine);
                        break;
                    case 9:
                        newScene = CreateBonesTestScene(engine);
                        break;
                }
                scene = newScene;

                scene.executeWhenReady(function () {
                    if (scene.activeCamera) {
                        scene.activeCamera.attachControl(canvas);
                        if (then) {
                            then();
                        }
                    }

                    // UI
                    restoreUI();
                });

                return;
            };

            var dlCount = 0;
            BABYLON.SceneLoader.Load("Scenes/" + name + "/", name + incremental + ".babylon", engine, function (newScene) {
                scene = newScene;
                scene.executeWhenReady(function () {
                    if (scene.activeCamera) {
                        scene.activeCamera.attachControl(canvas);

                        if (newScene.activeCamera.keysUp) {
                            newScene.activeCamera.keysUp.push(90); // Z
                            newScene.activeCamera.keysUp.push(87); // W
                            newScene.activeCamera.keysDown.push(83); // S
                            newScene.activeCamera.keysLeft.push(65); // A
                            newScene.activeCamera.keysLeft.push(81); // Q
                            newScene.activeCamera.keysRight.push(69); // E
                            newScene.activeCamera.keysRight.push(68); // D
                        }
                    }

                    if (then) {
                        then();
                    }

                    // UI
                    restoreUI();

                });

            }, function (evt) {
                if (evt.lengthComputable) {
                    loadingText.innerHTML = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";
                } else {
                    dlCount = evt.loaded / (1024 * 1024);
                    loadingText.innerHTML = "Loading, please wait..." + Math.floor(dlCount * 100.0) / 100.0 + " MB already loaded.";
                }
            });
        };

        loadingBack.addEventListener("transitionend", importScene);
        loadingBack.addEventListener("webkitTransitionend", importScene);

        loadingBack.className = "";
        loadingText.className = "";
        opacityMask.className = "";
        loadingText.innerHTML = "Loading, please wait...";
    };

    // Render loop
    var renderFunction = function () {
        // Fps
        divFps.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";

        // Render scene
        if (scene) {
            if (!sceneChecked) {
                var remaining = scene.getWaitingItemsCount();
                loadingText.innerHTML = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
            }

            scene.render();

            // Stats
            if (enableStats.checked) {
                stats.innerHTML = "Total vertices: " + scene.getTotalVertices() + "<br>"
                    + "Active vertices: " + scene.getActiveVertices() + "<br>"
                    + "Active particles: " + scene.getActiveParticles() + "<br><br><br>"
                    + "Frame duration: " + scene.getLastFrameDuration() + " ms<br><br>"
                    + "<i>Evaluate Active Meshes duration:</i> " + scene.getEvaluateActiveMeshesDuration() + " ms<br>"
                    + "<i>Render Targets duration:</i> " + scene.getRenderTargetsDuration() + " ms<br>"
                    + "<i>Particles duration:</i> " + scene.getParticlesDuration() + " ms<br>"
                    + "<i>Sprites duration:</i> " + scene.getSpritesDuration() + " ms<br>"
                    + "<i>Render duration:</i> " + scene.getRenderDuration() + " ms";
            }

            // Streams
            if (scene.useDelayedTextureLoading) {
                var waiting = scene.getWaitingItemsCount();
                if (waiting > 0) {
                    status.innerHTML = "Streaming items..." + waiting + " remaining";
                } else {
                    status.innerHTML = "";
                }
            }
        }
    };

    // Launch render loop
    engine.runRenderLoop(renderFunction);

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // Caps
    var caps = engine.getCaps();
    document.getElementById("extensions").innerHTML =
            "Max textures image units: <b>" + caps.maxTexturesImageUnits + "</b><br>" +
            "Max texture size: <b>" + caps.maxTextureSize + "</b><br>" +
            "Max cubemap texture size: <b>" + caps.maxCubemapTextureSize + "</b><br>" +
            "Max render texture size: <b>" + caps.maxRenderTextureSize + "</b><br>";

    // UI

    var panelIsClosed = true;
    var cameraPanelIsClosed = true;
    var aboutIsClosed = true;
    document.getElementById("clickableTag").addEventListener("click", function () {
        if (panelIsClosed) {
            panelIsClosed = false;
            controlPanel.style.webkitTransform = "translateY(0px)";
            controlPanel.style.transform = "translateY(0px)";
        } else {
            panelIsClosed = true;
            controlPanel.style.webkitTransform = "translateY(200px)";
            controlPanel.style.transform = "translateY(200px)";
        }
    });

    document.getElementById("cameraClickableTag").addEventListener("click", function () {
        if (cameraPanelIsClosed) {
            cameraPanelIsClosed = false;
            cameraPanel.style.webkitTransform = "translateX(0px)";
            cameraPanel.style.transform = "translateX(0px)";
        } else {
            cameraPanelIsClosed = true;
            cameraPanel.style.webkitTransform = "translateX(300px)";
            cameraPanel.style.transform = "translateX(300px)";
        }
    });

    document.getElementById("aboutLink").addEventListener("click", function () {
        if (aboutIsClosed) {
            aboutIsClosed = false;
            aboutPanel.style.webkitTransform = "translateX(0px)";
            aboutPanel.style.transform = "translateX(0px)";
        } else {
            aboutIsClosed = true;
            aboutPanel.style.webkitTransform = "translateX(-120%)";
            aboutPanel.style.transform = "translateX(-120%)";
        }
    });

    document.getElementById("notSupported").addEventListener("click", function () {
        document.getElementById("notSupported").className = "hidden";
        opacityMask.className = "hidden";
    });

    opacityMask.addEventListener("click", function () {
        document.getElementById("notSupported").className = "hidden";
        opacityMask.className = "hidden";
    });

    document.getElementById("aboutPanel").addEventListener("click", function (evt) {
        evt.cancelBubble = true;
    });

    document.getElementById("menuPanel").addEventListener("click", function (evt) {
        if (!aboutIsClosed) {
            aboutIsClosed = true;
            aboutPanel.style.webkitTransform = "translateX(-120%)";
            aboutPanel.style.transform = "translateX(-120%)";
        }
    });

    canvas.addEventListener("click", function (evt) {
        if (!panelIsClosed) {
            panelIsClosed = true;
            cameraPanelIsClosed = true;
            controlPanel.style.webkitTransform = "translateY(200px)";
            controlPanel.style.transform = "translateY(200px)";
            cameraPanel.style.webkitTransform = "translateX(300px)";
            cameraPanel.style.transform = "translateX(300px)";
        }

        if (evt.ctrlKey) {
            if (!scene)
                return;

            var pickResult = scene.pick(evt.clientX, evt.clientY);

            if (pickResult.hit) {
                status.innerHTML = "Selected object: " + pickResult.pickedMesh.name;

                // Animations
                scene.beginAnimation(pickResult.pickedMesh, 0, 100, true, 1.0);
                var material = pickResult.pickedMesh.material;
                if (material) {
                    scene.beginAnimation(material, 0, 100, true, 1.0);
                }

                // Emit particles
                var particleSystem = new BABYLON.ParticleSystem("particles", 400, scene);
                particleSystem.particleTexture = new BABYLON.Texture("Assets/Flare.png", scene);
                particleSystem.minAngularSpeed = -0.5;
                particleSystem.maxAngularSpeed = 0.5;
                particleSystem.minSize = 0.1;
                particleSystem.maxSize = 0.5;
                particleSystem.minLifeTime = 0.5;
                particleSystem.maxLifeTime = 2.0;
                particleSystem.minEmitPower = 0.5;
                particleSystem.maxEmitPower = 1.0;
                particleSystem.emitter = pickResult.pickedPoint;
                particleSystem.emitRate = 400;
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
                particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
                particleSystem.direction1 = new BABYLON.Vector3(-1, -1, -1);
                particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
                particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1);
                particleSystem.color2 = new BABYLON.Color4(0, 1, 1, 1);
                particleSystem.gravity = new BABYLON.Vector3(0, -5, 0);
                particleSystem.disposeOnStop = true;
                particleSystem.targetStopDuration = 0.1;
                particleSystem.start();

            } else {
                status.innerHTML = "";
            }
        }
    });

    wireframe.addEventListener("change", function () {
        if (engine) {
            engine.forceWireframe = wireframe.checked;
        }
    });

    enableStats.addEventListener("change", function () {
        stats.className = enableStats.checked ? "" : "hidden";
    });

    fullscreen.addEventListener("click", function () {
        if (engine) {
            engine.switchFullscreen(true);
        }
    });

    touchCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        var camera = new BABYLON.TouchCamera("touchCamera", scene.activeCamera.position, scene);
        camera.rotation = scene.activeCamera.rotation.clone();
        camera.fov = scene.activeCamera.fov;
        camera.minZ = scene.activeCamera.minZ;
        camera.maxZ = scene.activeCamera.maxZ;

        camera.ellipsoid = scene.activeCamera.ellipsoid.clone();
        camera.checkCollisions = scene.activeCamera.checkCollisions;
        camera.applyGravity = scene.activeCamera.applyGravity;

        camera.speed = scene.activeCamera.speed;

        scene.activeCamera.detachControl(canvas);

        scene.activeCamera = camera;

        scene.activeCamera.attachControl(canvas);
    });

    deviceOrientationCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        var camera = new BABYLON.DeviceOrientationCamera("deviceOrientationCamera", scene.activeCamera.position, scene);
        camera.rotation = scene.activeCamera.rotation.clone();
        camera.fov = scene.activeCamera.fov;
        camera.minZ = scene.activeCamera.minZ;
        camera.maxZ = scene.activeCamera.maxZ;

        camera.ellipsoid = scene.activeCamera.ellipsoid.clone();
        camera.checkCollisions = scene.activeCamera.checkCollisions;
        camera.applyGravity = scene.activeCamera.applyGravity;

        camera.speed = scene.activeCamera.speed;

        scene.activeCamera.detachControl(canvas);

        scene.activeCamera = camera;

        scene.activeCamera.attachControl(canvas);
    });

    hardwareScalingLevel.addEventListener("change", function () {
        if (!engine)
            return;
        engine.setHardwareScalingLevel(hardwareScalingLevel.selectedIndex + 1);
    });

    collisions.addEventListener("change", function () {
        if (scene) {
            scene.collisionsEnabled = collisions.checked;
        }
    });

    // Cameras
    camerasList.addEventListener("change", function (ev) {
        scene.activeCamera.detachControl(canvas);
        scene.activeCamera = scene.cameras[camerasList.selectedIndex];
        scene.activeCamera.attachControl(canvas);
    });

    // Query string
    var queryString = window.location.search;

    if (queryString) {
        var query = queryString.replace("?", "");
        var index = parseInt(query);

        if (!isNaN(index)) {
            if (index >= demos.length) {
                itemClick(tests[index - demos.length])();
            } else {
                itemClick(demos[index])();
            }
        } else {
            for (index = 0; index < demos.length; index++) {
                if (demos[index].title === query) {
                    itemClick(demos[index])();
                    return;
                }
            }
            for (index = 0; index < tests.length; index++) {
                if (tests[index].title === query) {
                    itemClick(tests[index])();
                    return;
                }
            }
        }

    }

};