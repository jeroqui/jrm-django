// ==========================================================================
// Smooth Scroll for Anchor Links
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href')?.slice(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    history.pushState(null, '', `#${targetId}`);
                }
            }
        });
    });
});

// ==========================================================================
// Three.js Header Background (only on home page)
// ==========================================================================
(function() {
    const canvas = document.querySelector('.header-bg');
    if (!canvas) return;

    // Dynamically load Three.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initThree;
    document.head.appendChild(script);

    function initThree() {
        let scene, camera, renderer;
        let model;
        let isMouseDown = false;
        let previousMouseX = 0;

        // Scene
        scene = new THREE.Scene();

        const canvasRect = canvas.getBoundingClientRect();

        // Camera
        camera = new THREE.PerspectiveCamera(75, canvasRect.width / canvasRect.height, 0.1, 1000);
        camera.position.set(0, 2, 5);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(canvasRect.width, canvasRect.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        // Directional Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 5);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.radius = 8;

        const shadowCamera = light.shadow.camera;
        shadowCamera.left = -10;
        shadowCamera.right = 10;
        shadowCamera.top = 10;
        shadowCamera.bottom = -10;
        shadowCamera.near = 0.5;
        shadowCamera.far = 50;

        scene.add(light);

        // Ground
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);

        // Model (Cube placeholder)
        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        model = new THREE.Mesh(cubeGeometry, cubeMaterial);
        model.castShadow = true;
        model.receiveShadow = true;
        model.position.y = 0.5;
        model.position.x = 3;
        scene.add(model);

        // Event listeners
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        animate();

        function onMouseDown(event) {
            isMouseDown = true;
            previousMouseX = event.clientX;
        }

        function onMouseUp() {
            isMouseDown = false;
        }

        function onMouseMove(event) {
            if (isMouseDown) {
                const deltaX = event.clientX - previousMouseX;
                model.rotation.y += deltaX * 0.01;
                previousMouseX = event.clientX;
            }
        }

        function onResize() {
            canvas.style.width = '';
            canvas.style.height = '';
            const canvasRect = canvas.getBoundingClientRect();
            camera.aspect = canvasRect.width / canvasRect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasRect.width, canvasRect.height);
        }

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    }
})();

