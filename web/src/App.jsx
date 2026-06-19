import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import PlotInput from './components/PlotInput';
import RoomSuggestions from './components/RoomSuggestions';
import VastuChecker from './components/VastuChecker';
import FloorPlan2D from './components/FloorPlan2D';
import FloorPlan3D from './components/FloorPlan3D';
import CostEstimator from './components/CostEstimator';

function App() {
  const [activeTab, setActiveTab] = React.useState('plot');
  const [projectData, setProjectData] = React.useState({
    plotLength: 40,
    plotWidth: 30,
    direction: 'E',
    budget: 1000000,
    rooms: [],
    vastuScore: 0,
    costEstimate: {}
  });

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {activeTab === 'plot' && <PlotInput projectData={projectData} setProjectData={setProjectData} />}
        {activeTab === 'rooms' && <RoomSuggestions projectData={projectData} setProjectData={setProjectData} />}
        {activeTab === 'vastu' && <VastuChecker projectData={projectData} setProjectData={setProjectData} />}
        {activeTab === '2d' && <FloorPlan2D projectData={projectData} />}
        {activeTab === '3d' && <FloorPlan3D projectData={projectData} />}
        {activeTab === 'cost' && <CostEstimator projectData={projectData} setProjectData={setProjectData} />}
      </div>
    </div>
  );
}

export default App;