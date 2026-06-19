import React, { useEffect, useState } from 'react';
import './RoomSuggestions.css';

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

const RoomSuggestions = ({ projectData, setProjectData }) => {
  const [rooms, setRooms] = useState([]);
  const [plotType, setPlotType] = useState('compact');

  useEffect(() => {
    generateSuggestions();
  }, [projectData]);

  const generateSuggestions = () => {
    const area = projectData.plotLength * projectData.plotWidth;
    let type = 'compact';
    
    if (area > 1200) {
      type = 'spacious';
    } else if (area > 800) {
      type = 'medium';
    }
    
    setPlotType(type);
    setRooms(roomDatabase[type]);
    
    setProjectData(prev => ({
      ...prev,
      rooms: roomDatabase[type]
    }));
  };

  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0);
  const plotArea = projectData.plotLength * projectData.plotWidth;
  const builtUpPercentage = (totalArea / plotArea) * 100;

  return (
    <div className="tab-container">
      <h2>🧠 AI Room Suggestions</h2>
      
      <div className="suggestions-grid">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <div className="room-header">
              <h3>{room.name}</h3>
              <span className={`type-badge type-${room.type}`}>{room.type}</span>
            </div>
            <div className="room-details">
              <p><strong>Dimensions:</strong> {room.size}m</p>
              <p><strong>Area:</strong> {room.area}m²</p>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-card">
        <h3>📊 Layout Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Plot Type</span>
            <span className="value">{plotType.toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Room Area</span>
            <span className="value">{totalArea}m²</span>
          </div>
          <div className="summary-item">
            <span className="label">Plot Area</span>
            <span className="value">{plotArea.toFixed(0)}m²</span>
          </div>
          <div className="summary-item">
            <span className="label">Built-up %</span>
            <span className="value">{builtUpPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSuggestions;