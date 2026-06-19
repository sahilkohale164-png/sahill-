import React, { useRef, useEffect } from 'react';
import './FloorPlan2D.css';

const FloorPlan2D = ({ projectData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    draw2DPlan();
  }, [projectData]);

  const draw2DPlan = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, width, height);

    const scaleX = (width - 40) / projectData.plotLength;
    const scaleY = (height - 40) / projectData.plotWidth;
    const scale = Math.min(scaleX, scaleY);

    const startX = 20;
    const startY = 20;

    // Draw plot boundary
    ctx.strokeStyle = '#1ab3d4';
    ctx.lineWidth = 3;
    ctx.strokeRect(
      startX,
      startY,
      projectData.plotLength * scale,
      projectData.plotWidth * scale
    );

    // Draw direction
    ctx.fillStyle = '#ff6b35';
    ctx.font = 'bold 20px Arial';
    const directionMap = {
      'N': '⬆️ N',
      'S': '⬇️ S',
      'E': '➡️ E',
      'W': '⬅️ W'
    };
    ctx.fillText(directionMap[projectData.direction], startX + 10, startY + 30);

    // Draw rooms
    if (projectData.rooms.length > 0) {
      const colors = ['#ff6b35', '#004e89', '#1ab3d4', '#f7931e', '#00a86b', '#8b0000'];
      let x = startX + 10;
      let y = startY + 40;
      let roomIndex = 0;

      projectData.rooms.forEach((room) => {
        if (roomIndex >= 6) return;

        const dims = room.size.split('x').map(d => parseFloat(d.trim()));
        const roomWidth = dims[0] * scale;
        const roomHeight = dims[1] * scale;

        ctx.fillStyle = colors[roomIndex % colors.length];
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x, y, roomWidth, roomHeight);
        ctx.globalAlpha = 1;

        ctx.strokeStyle = colors[roomIndex % colors.length];
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, roomWidth, roomHeight);

        ctx.fillStyle = '#e0e0e0';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(room.name, x + 5, y + 20);
        ctx.font = '10px Arial';
        ctx.fillText(room.area + 'm²', x + 5, y + 35);

        x += roomWidth + 15;
        if (x + 100 > width) {
          x = startX + 10;
          y += 100;
        }

        roomIndex++;
      });
    }

    // Draw info
    ctx.fillStyle = '#1ab3d4';
    ctx.font = '12px Arial';
    ctx.fillText(`Plot: ${projectData.plotLength}m × ${projectData.plotWidth}m`, startX + 10, height - 20);
    ctx.fillText(`Area: ${(projectData.plotLength * projectData.plotWidth).toFixed(0)}m²`, startX + 10, height - 5);
  };

  const downloadPlan = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = '2d-floor-plan.png';
    link.click();
    alert('📥 2D Plan Downloaded!');
  };

  return (
    <div className="tab-container">
      <h2>2️⃣ 2D Floor Plan</h2>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          className="floor-plan-canvas"
        />
      </div>
      <button className="btn-primary" onClick={downloadPlan}>📥 Download 2D Plan</button>
    </div>
  );
};

export default FloorPlan2D;