// 2D Floor Plan Generator
function draw2DPlan() {
    const canvas = document.getElementById('canvas2d');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Scale to fit canvas
    const scaleX = (canvas.width - 40) / projectData.plotLength;
    const scaleY = (canvas.height - 40) / projectData.plotWidth;
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
    
    // Draw direction indicator
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
        
        projectData.rooms.forEach((room, index) => {
            if (roomIndex >= 6) return; // Max 6 rooms to display
            
            // Parse room dimensions
            const dims = room.size.split('x').map(d => parseFloat(d.trim()));
            const roomWidth = dims[0] * scale;
            const roomHeight = dims[1] * scale;
            
            // Draw room
            ctx.fillStyle = colors[roomIndex % colors.length];
            ctx.globalAlpha = 0.3;
            ctx.fillRect(x, y, roomWidth, roomHeight);
            ctx.globalAlpha = 1;
            
            // Draw room border
            ctx.strokeStyle = colors[roomIndex % colors.length];
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, roomWidth, roomHeight);
            
            // Draw room name
            ctx.fillStyle = '#e0e0e0';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(room.name, x + 5, y + 20);
            ctx.font = '10px Arial';
            ctx.fillText(room.area + 'm²', x + 5, y + 35);
            
            // Position next room
            x += roomWidth + 15;
            if (x + 100 > canvas.width) {
                x = startX + 10;
                y += 100;
            }
            
            roomIndex++;
        });
    }
    
    // Draw info
    ctx.fillStyle = '#1ab3d4';
    ctx.font = '12px Arial';
    ctx.fillText(`Plot: ${projectData.plotLength}m × ${projectData.plotWidth}m`, startX + 10, canvas.height - 20);
    ctx.fillText(`Area: ${(projectData.plotLength * projectData.plotWidth).toFixed(0)}m²`, startX + 10, canvas.height - 5);
    
    console.log('2D Plan Drawn');
}

function downloadCanvas2D() {
    const canvas = document.getElementById('canvas2d');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = '2d-floor-plan.png';
    link.click();
    alert('📥 2D Plan Downloaded!');
}