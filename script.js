// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene
    initThreeScene();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Scroll event for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add 3D floating educational elements
    createFloatingElements();
});

// Three.js Scene Initialization
function initThreeScene() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create educational 3D objects
    createEducationalObjects(scene);
    
    // Position camera
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate all objects in the scene
        scene.traverse(function(object) {
            if (object.isObject3D && object !== scene && !(object instanceof THREE.Light)) {
                object.rotation.x += 0.002;
                object.rotation.y += 0.003;
                
                // Add some floating movement
                object.position.y += Math.sin(Date.now() * 0.001 + object.position.x) * 0.01;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation loop
    animate();
}

// Create educational 3D objects for the Three.js scene
function createEducationalObjects(scene) {
    // Colors
    const colors = [
        0x3498db, // Blue
        0x2ecc71, // Green
        0xe74c3c, // Red
        0xf39c12, // Orange
        0x9b59b6  // Purple
    ];
    
    // Add more objects to make 3D elements more visible
    
    // Create books
    for (let i = 0; i < 10; i++) {
        const bookGeometry = new THREE.BoxGeometry(2, 3, 0.5);
        const bookMaterial = new THREE.MeshStandardMaterial({
            color: colors[i % colors.length],
            metalness: 0.3,
            roughness: 0.8
        });
        const book = new THREE.Mesh(bookGeometry, bookMaterial);
        
        // Position randomly in the scene
        book.position.x = (Math.random() - 0.5) * 40;
        book.position.y = (Math.random() - 0.5) * 40;
        book.position.z = (Math.random() - 0.5) * 20 - 10;
        
        // Rotate randomly
        book.rotation.x = Math.random() * Math.PI;
        book.rotation.y = Math.random() * Math.PI;
        
        scene.add(book);
    }
    
    // Create pencils
    for (let i = 0; i < 6; i++) {
        const pencilGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 32);
        const pencilMaterial = new THREE.MeshStandardMaterial({
            color: 0xf1c40f,
            metalness: 0.1,
            roughness: 0.6
        });
        const pencil = new THREE.Mesh(pencilGeometry, pencilMaterial);
        
        // Position randomly in the scene
        pencil.position.x = (Math.random() - 0.5) * 40;
        pencil.position.y = (Math.random() - 0.5) * 40;
        pencil.position.z = (Math.random() - 0.5) * 20 - 10;
        
        // Rotate to make it look like a pencil
        pencil.rotation.x = Math.PI / 2;
        pencil.rotation.z = Math.random() * Math.PI;
        
        scene.add(pencil);
    }
    
    // Create globes
    for (let i = 0; i < 4; i++) {
        const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
        const globeMaterial = new THREE.MeshStandardMaterial({
            color: 0x3498db,
            metalness: 0.2,
            roughness: 0.7
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        
        // Position randomly in the scene
        globe.position.x = (Math.random() - 0.5) * 40;
        globe.position.y = (Math.random() - 0.5) * 40;
        globe.position.z = (Math.random() - 0.5) * 20 - 10;
        
        scene.add(globe);
    }
    
    // Create mathematical symbols
    createMathSymbol(scene, 'π', 0xf39c12, -15, 10, -5);
    createMathSymbol(scene, '+', 0x2ecc71, 15, -10, -8);
    createMathSymbol(scene, '÷', 0xe74c3c, -10, -15, -12);
    createMathSymbol(scene, '=', 0x9b59b6, 20, 5, -15);
}

// Create a 3D text geometry for mathematical symbols
function createMathSymbol(scene, symbol, color, x, y, z) {
    const loader = new THREE.FontLoader();
    
    // Use a callback-based approach since we don't have actual font loading
    // In a real implementation, you would load a font file
    setTimeout(() => {
        // Create a simple geometry instead of text since we can't load fonts
        let geometry;
        
        switch(symbol) {
            case 'π':
                geometry = new THREE.TorusGeometry(1, 0.3, 16, 32);
                break;
            case '+':
                geometry = new THREE.BoxGeometry(2, 0.5, 0.5);
                const plusVertical = new THREE.BoxGeometry(0.5, 2, 0.5);
                const plusMaterial = new THREE.MeshStandardMaterial({ color: color });
                const verticalPart = new THREE.Mesh(plusVertical, plusMaterial);
                const plus = new THREE.Mesh(geometry, plusMaterial);
                plus.add(verticalPart);
                plus.position.set(x, y, z);
                scene.add(plus);
                return;
            case '÷':
                geometry = new THREE.BoxGeometry(2, 0.5, 0.5);
                const divMaterial = new THREE.MeshStandardMaterial({ color: color });
                const divSymbol = new THREE.Mesh(geometry, divMaterial);
                
                const dot1Geo = new THREE.SphereGeometry(0.4, 16, 16);
                const dot1 = new THREE.Mesh(dot1Geo, divMaterial);
                dot1.position.y = 1;
                
                const dot2Geo = new THREE.SphereGeometry(0.4, 16, 16);
                const dot2 = new THREE.Mesh(dot2Geo, divMaterial);
                dot2.position.y = -1;
                
                divSymbol.add(dot1);
                divSymbol.add(dot2);
                divSymbol.position.set(x, y, z);
                scene.add(divSymbol);
                return;
            case '=':
                geometry = new THREE.BoxGeometry(2, 0.5, 0.5);
                const eqMaterial = new THREE.MeshStandardMaterial({ color: color });
                const eqSymbol = new THREE.Mesh(geometry, eqMaterial);
                
                const line2Geo = new THREE.BoxGeometry(2, 0.5, 0.5);
                const line2 = new THREE.Mesh(line2Geo, eqMaterial);
                line2.position.y = -0.8;
                
                eqSymbol.add(line2);
                eqSymbol.position.set(x, y, z);
                scene.add(eqSymbol);
                return;
            default:
                geometry = new THREE.SphereGeometry(1.5, 32, 32);
        }
        
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.2,
            roughness: 0.7
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);
    }, 100);
}

// Create HTML floating educational elements
function createFloatingElements() {
    const elements = [
        { icon: 'fas fa-book', color: '#3498db' },
        { icon: 'fas fa-graduation-cap', color: '#2ecc71' },
        { icon: 'fas fa-pencil-alt', color: '#e74c3c' },
        { icon: 'fas fa-calculator', color: '#f39c12' },
        { icon: 'fas fa-atom', color: '#9b59b6' },
        { icon: 'fas fa-globe', color: '#1abc9c' },
        { icon: 'fas fa-microscope', color: '#e67e22' },
        { icon: 'fas fa-flask', color: '#3498db' },
        { icon: 'fas fa-brain', color: '#e84393' },
        { icon: 'fas fa-chalkboard-teacher', color: '#00b894' },
        { icon: 'fas fa-school', color: '#fdcb6e' },
        { icon: 'fas fa-apple-alt', color: '#d63031' }
    ];
    
    // Get the second half of the page
    const secondHalfSections = document.querySelectorAll('.academics, .gallery, .activities, .video-section, .contact');
    
    elements.forEach((element, index) => {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-element';
        floatingEl.innerHTML = `<i class="${element.icon}" style="color: ${element.color}; font-size: 2rem;"></i>`;
        
        // Randomly select a section from the second half
        const randomSection = secondHalfSections[Math.floor(Math.random() * secondHalfSections.length)];
        
        // Set random positions within the selected section
        floatingEl.style.position = 'absolute';
        floatingEl.style.top = `${Math.random() * 70 + 15}%`;
        floatingEl.style.left = `${Math.random() * 70 + 15}%`;
        floatingEl.style.fontSize = '2rem';
        floatingEl.style.zIndex = '100';
        
        // Set random animation delay
        floatingEl.style.animationDelay = `${index * 0.5}s`;
        
        // Append to the selected section instead of body
        if (randomSection) {
            randomSection.style.position = 'relative'; // Ensure the section has position relative
            randomSection.appendChild(floatingEl);
        } else {
            // Fallback to appending to specific sections if query selector fails
            const academics = document.querySelector('.academics');
            if (academics) {
                academics.style.position = 'relative';
                academics.appendChild(floatingEl);
            }
        }
    });
}
