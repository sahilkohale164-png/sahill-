import React, { useState } from 'react';
import './PlotInput.css';

const PlotInput = ({ projectData, setProjectData }) => {
  const [formData, setFormData] = useState(projectData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'plotLength' || name === 'plotWidth' || name === 'budget' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleGenerate = () => {
    if (formData.plotLength <= 0 || formData.plotWidth <= 0) {
      alert('❌ Please enter valid length and width');
      return;
    }
    setProjectData(formData);
    alert(`✅ Layout Generated!\nPlot: ${formData.plotLength}m × ${formData.plotWidth}m\nDirection: ${formData.direction}\nArea: ${(formData.plotLength * formData.plotWidth).toFixed(2)}m²`);
  };

  const area = formData.plotLength * formData.plotWidth;

  return (
    <div className="tab-container">
      <h2>📐 Plot Input & Configuration</h2>
      
      <div className="form-wrapper">
        <div className="form-group">
          <label>Plot Length (meters):</label>
          <input
            type="number"
            name="plotLength"
            value={formData.plotLength}
            onChange={handleChange}
            min="1"
            max="1000"
          />
        </div>

        <div className="form-group">
          <label>Plot Width (meters):</label>
          <input
            type="number"
            name="plotWidth"
            value={formData.plotWidth}
            onChange={handleChange}
            min="1"
            max="1000"
          />
        </div>

        <div className="form-group">
          <label>Road Direction:</label>
          <select name="direction" value={formData.direction} onChange={handleChange}>
            <option value="N">⬆️ North</option>
            <option value="S">⬇️ South</option>
            <option value="E">➡️ East</option>
            <option value="W">⬅️ West</option>
          </select>
        </div>

        <div className="form-group">
          <label>Budget (₹):</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="100000"
          />
        </div>

        <div className="info-card">
          <h3>📊 Plot Analysis</h3>
          <p><strong>Area:</strong> {area.toFixed(2)}m²</p>
          <p><strong>Perimeter:</strong> {(2 * (formData.plotLength + formData.plotWidth)).toFixed(2)}m</p>
          <p><strong>Plot Type:</strong> {area < 800 ? 'Compact' : area < 1200 ? 'Medium' : 'Spacious'}</p>
        </div>
      </div>

      <button className="btn-primary" onClick={handleGenerate}>🚀 Generate Layout</button>
    </div>
  );
};

export default PlotInput;