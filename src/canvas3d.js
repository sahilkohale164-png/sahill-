// 3D Visualization with Three.js
let scene, camera, renderer;

function generate3DView() {
    const container = document.getElementById('canvas3d');
    container.innerHTML = ''; // Clear previous
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    
    // Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(20, 0, 15);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(40, 40, 30);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Draw plot boundary
    const plotGeometry = new THREE.BoxGeometry(
        projectData.plotLength,
        0.2,
        projectData.plotWidth
    );
    const plotMaterial = new THREE.MeshPhongMaterial({ color: 0x1ab3d4, shininess: 100 });
    const plotMesh = new THREE.Mesh(plotGeometry, plotMaterial);
    plotMesh.receiveShadow = true;
    scene.add(plotMesh);
    
    // Draw plot outline
    const outlineGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -projectData.plotLength/2, 0.1, -projectData.plotWidth/2,
        projectData.plotLength/2, 0.1, -projectData.plotWidth/2,
        projectData.plotLength/2, 0.1, projectData.plotWidth/2,
        -projectData.plotLength/2, 0.1, projectData.plotWidth/2,
        -projectData.plotLength/2, 0.1, -projectData.plotWidth/2
    ]);
    outlineGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff6b35, linewidth: 3 });
    const outline = new THREE.Line(outlineGeometry, lineMaterial);
    scene.add(outline);
    
    // Draw rooms as 3D boxes
    if (projectData.rooms.length > 0) {
        const colors = [0xff6b35, 0x004e89, 0x1ab3d4, 0xf7931e, 0x00a86b, 0x8b0000];
        let xPos = -projectData.plotLength / 2 + 3;
        let zPos = -projectData.plotWidth / 2 + 3;
        let roomIndex = 0;
        
        projectData.rooms.forEach((room, index) => {
            if (roomIndex >= 6) return;
            
            const dims = room.size.split('x').map(d => parseFloat(d.trim()));
            const roomWidth = dims[0];
            const roomDepth = dims[1];
            
            // Draw room box
            const roomGeometry = new THREE.BoxGeometry(roomWidth, 2.5, roomDepth);
            const roomMaterial = new THREE.MeshPhongMaterial({
                color: colors[roomIndex % colors.length],
                shininess: 50,
                wireframe: false
            });
            const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
            roomMesh.position.set(xPos + roomWidth/2, 1.25, zPos + roomDepth/2);
            roomMesh.castShadow = true;
            roomMesh.receiveShadow = true;
            scene.add(roomMesh);
            
            // Draw room label
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 128;
            context.fillStyle = '#1ab3d4';
            context.fillRect(0, 0, 256, 128);
            context.fillStyle = '#000';
            context.font = 'bold 20px Arial';
            context.fillText(room.name, 20, 50);
            context.font = '14px Arial';
            context.fillText(room.area + 'm²', 20, 90);
            
            const texture = new THREE.CanvasTexture(canvas);
            const labelGeometry = new THREE.PlaneGeometry(2, 1);
            const labelMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.set(xPos + roomWidth/2, 2.8, zPos + roomDepth/2);
            scene.add(label);
            
            xPos += roomWidth + 1;
            if (xPos > projectData.plotLength / 2 - 2) {
                xPos = -projectData.plotLength / 2 + 3;
                zPos += roomDepth + 1;
            }
            
            roomIndex++;
        });
    }
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
    
    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.005);
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });
    
    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    console.log('3D View Generated');
}

function downloadCanvas3D() {
    if (!renderer) {
        alert('Please generate 3D view first');
        return;
    }
    
    const canvas = renderer.domElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = '3d-floor-plan.png';
    link.click();
    alert('📥 3D View Downloaded!');
}