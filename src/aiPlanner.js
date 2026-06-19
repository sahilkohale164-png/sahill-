// AI Room Suggestion Logic
const roomDatabase = {
    compact: [
        { name: 'Living Room', size: '4x5', area: 20, type: 'common' },
        { name: 'Kitchen', size: '3x3', area: 9, type: 'utility' },
        { name: 'Bedroom', size: '3x4', area: 12, type: 'private' },
        { name: 'Bathroom', size: '2x2.5', area: 5, type: 'utility' }
    ],
    medium: [
        { name: 'Living Room', size: '5x6', area: 30, type: 'common' },
        { name: 'Dining Room', size: '4x4', area: 16, type: 'common' },
        { name: 'Kitchen', size: '4x4', area: 16, type: 'utility' },
        { name: 'Master Bedroom', size: '4x5', area: 20, type: 'private' },
        { name: 'Bedroom', size: '3x4', area: 12, type: 'private' },
        { name: 'Bathroom', size: '2.5x3', area: 7.5, type: 'utility' }
    ],
    spacious: [
        { name: 'Living Room', size: '6x7', area: 42, type: 'common' },
        { name: 'Dining Room', size: '5x5', area: 25, type: 'common' },
        { name: 'Kitchen', size: '5x5', area: 25, type: 'utility' },
        { name: 'Master Bedroom', size: '5x6', area: 30, type: 'private' },
        { name: 'Bedroom 2', size: '4x5', area: 20, type: 'private' },
        { name: 'Bedroom 3', size: '3.5x4', area: 14, type: 'private' },
        { name: 'Study Room', size: '4x4', area: 16, type: 'private' },
        { name: 'Bathroom', size: '3x3', area: 9, type: 'utility' }
    ]
};

function generateRoomSuggestions() {
    const area = projectData.plotLength * projectData.plotWidth;
    let plotType = 'compact';
    
    if (area > 1200) {
        plotType = 'spacious';
    } else if (area > 800) {
        plotType = 'medium';
    }
    
    const suggestedRooms = roomDatabase[plotType];
    projectData.rooms = suggestedRooms;
    
    // Display suggestions
    const container = document.getElementById('roomSuggestions');
    container.innerHTML = `<h3>🎯 Suggested Layout for ${plotType.toUpperCase()} Plot</h3>`;
    
    let totalArea = 0;
    suggestedRooms.forEach(room => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <h3>${room.name}</h3>
            <p><strong>Dimensions:</strong> ${room.size}m</p>
            <p><strong>Area:</strong> ${room.area}m²</p>
            <p><strong>Type:</strong> ${room.type}</p>
        `;
        container.appendChild(div);
        totalArea += room.area;
    });
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'suggestion-item';
    summaryDiv.innerHTML = `
        <h3>📊 Summary</h3>
        <p><strong>Total Room Area:</strong> ${totalArea}m²</p>
        <p><strong>Plot Area:</strong> ${area}m²</p>
        <p><strong>Built-up %:</strong> ${((totalArea/area)*100).toFixed(1)}%</p>
    `;
    container.appendChild(summaryDiv);
    
    console.log('AI Rooms Generated:', suggestedRooms);
}