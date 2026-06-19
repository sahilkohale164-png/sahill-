import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './FloorPlan3D.css';

const FloorPlan3D = ({ projectData }) => {
  const containerRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    generate3DView();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [projectData]);

  const generate3DView = () => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x0a0e27);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(20, 0, 15);

    const newRenderer = new THREE.WebGLRenderer({ antialias: true });
    newRenderer.setSize(width, height);
    newRenderer.shadowMap.enabled = true;
    containerRef.current.appendChild(newRenderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(40, 40, 30);
    directionalLight.castShadow = true;
    newScene.add(directionalLight);

    // Plot
    const plotGeometry = new THREE.BoxGeometry(
      projectData.plotLength,
      0.2,
      projectData.plotWidth
    );
    const plotMaterial = new THREE.MeshPhongMaterial({ color: 0x1ab3d4, shininess: 100 });
    const plotMesh = new THREE.Mesh(plotGeometry, plotMaterial);
    plotMesh.receiveShadow = true;
    newScene.add(plotMesh);

    // Rooms
    if (projectData.rooms.length > 0) {
      const colors = [0xff6b35, 0x004e89, 0x1ab3d4, 0xf7931e, 0x00a86b, 0x8b0000];
      let xPos = -projectData.plotLength / 2 + 3;
      let zPos = -projectData.plotWidth / 2 + 3;
      let roomIndex = 0;

      projectData.rooms.forEach((room) => {
        if (roomIndex >= 6) return;

        const dims = room.size.split('x').map(d => parseFloat(d.trim()));
        const roomWidth = dims[0];
        const roomDepth = dims[1];

        const roomGeometry = new THREE.BoxGeometry(roomWidth, 2.5, roomDepth);
        const roomMaterial = new THREE.MeshPhongMaterial({
          color: colors[roomIndex % colors.length],
          shininess: 50
        });
        const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
        roomMesh.position.set(xPos + roomWidth / 2, 1.25, zPos + roomDepth / 2);
        roomMesh.castShadow = true;
        roomMesh.receiveShadow = true;
        newScene.add(roomMesh);

        xPos += roomWidth + 1;
        if (xPos > projectData.plotLength / 2 - 2) {
          xPos = -projectData.plotLength / 2 + 3;
          zPos += roomDepth + 1;
        }

        roomIndex++;
      });
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      newRenderer.render(newScene, camera);
    };
    animate();

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    newRenderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    newRenderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.005);
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    newRenderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    setScene(newScene);
    setRenderer(newRenderer);
  };

  const downloadView = () => {
    if (renderer) {
      const canvas = renderer.domElement;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = '3d-floor-plan.png';
      link.click();
      alert('📥 3D View Downloaded!');
    }
  };

  return (
    <div className="tab-container">
      <h2>3️⃣ 3D Visualization</h2>
      <div ref={containerRef} className="canvas-3d" />
      <button className="btn-primary" onClick={downloadView}>📥 Download 3D View</button>
    </div>
  );
};

export default FloorPlan3D;