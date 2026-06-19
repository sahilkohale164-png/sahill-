import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'plot', label: '📐 Plot Input', icon: '📐' },
    { id: 'rooms', label: '🧠 AI Rooms', icon: '🧠' },
    { id: 'vastu', label: '🔯 Vastu Check', icon: '🔯' },
    { id: '2d', label: '2️⃣ 2D Plan', icon: '2️⃣' },
    { id: '3d', label: '3️⃣ 3D View', icon: '3️⃣' },
    { id: 'cost', label: '💰 Cost Est.', icon: '💰' }
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <h1>🏗️ Civil AI</h1>
      </div>
      <ul className="nav-menu">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;