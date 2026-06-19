import React, { useState } from 'react';
import './CostEstimator.css';

const materialRates = {
  cement: { unit: 'bag (50kg)', pricePerUnit: 350 },
  bricks: { unit: 'piece', pricePerUnit: 8 },
  steel: { unit: 'kg', pricePerUnit: 65 },
  sand: { unit: 'cu.ft', pricePerUnit: 40 },
  gravel: { unit: 'cu.ft', pricePerUnit: 35 },
  laborCost: { unit: 'sq.ft', pricePerUnit: 150 }
};

const standardQuantities = {
  cement: 5,
  bricks: 500,
  steel: 50,
  sand: 10,
  gravel: 5
};

const CostEstimator = ({ projectData, setProjectData }) => {
  const [costData, setCostData] = useState(null);

  const calculateCost = () => {
    const plotArea = projectData.plotLength * projectData.plotWidth;
    const builtUpArea = projectData.rooms.reduce((sum, room) => sum + room.area, 0);
    const estimatedBuildingArea = Math.min(builtUpArea * 1.2, plotArea * 0.7);
    const estimatedBuildingSqFt = estimatedBuildingArea * 10.764;

    const quantities = {
      cement: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.cement),
      bricks: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.bricks),
      steel: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.steel),
      sand: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.sand),
      gravel: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.gravel),
      labor: Math.ceil(estimatedBuildingSqFt)
    };

    const costs = {
      cement: quantities.cement * materialRates.cement.pricePerUnit,
      bricks: quantities.bricks * materialRates.bricks.pricePerUnit,
      steel: quantities.steel * materialRates.steel.pricePerUnit,
      sand: quantities.sand * materialRates.sand.pricePerUnit,
      gravel: quantities.gravel * materialRates.gravel.pricePerUnit,
      labor: quantities.labor * materialRates.laborCost.pricePerUnit
    };

    const materialCost = Object.values(costs).reduce((a, b) => a + b, 0);
    const contingency = materialCost * 0.15;
    const totalCost = materialCost + contingency;

    setCostData({
      quantities,
      costs,
      materialCost,
      contingency,
      totalCost,
      buildingArea: estimatedBuildingArea,
      costPerSqM: totalCost / estimatedBuildingArea
    });

    setProjectData(prev => ({
      ...prev,
      costEstimate: { quantities, costs, materialCost, contingency, totalCost, buildingArea: estimatedBuildingArea, costPerSqM: totalCost / estimatedBuildingArea }
    }));
  };

  return (
    <div className="tab-container">
      <h2>💰 Cost Estimator</h2>
      
      <button className="btn-primary" onClick={calculateCost}>Calculate Cost</button>

      {costData && (
        <div className="cost-results">
          <div className="cost-header">
            <div className="cost-summary">
              <h3>Building Area</h3>
              <p>{costData.buildingArea.toFixed(2)}m² ({(costData.buildingArea * 10.764).toFixed(0)} sq.ft)</p>
            </div>
            <div className="cost-summary">
              <h3>Cost per Sq.M</h3>
              <p>₹{costData.costPerSqM.toLocaleString('en-IN')}</p>
            </div>
            <div className="cost-summary">
              <h3>Total Estimated</h3>
              <p className="total-cost">₹{costData.totalCost.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="cost-breakdown">
            <h3>📦 Material Breakdown</h3>
            <div className="materials-grid">
              {Object.entries(costData.costs).map(([material, cost]) => (
                <div key={material} className="material-card">
                  <h4>{material.toUpperCase()}</h4>
                  <p className="quantity">Qty: {costData.quantities[material]} {materialRates[material]?.unit || 'units'}</p>
                  <p className="cost">₹{cost.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cost-summary-box">
            <h3>💾 Cost Summary</h3>
            <div className="summary-line">
              <span>Material Cost:</span>
              <span>₹{costData.materialCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-line">
              <span>Contingency (15%):</span>
              <span>₹{costData.contingency.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-line total">
              <span>Total Cost:</span>
              <span>₹{costData.totalCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-line budget">
              <span>Budget:</span>
              <span>₹{projectData.budget.toLocaleString('en-IN')}</span>
            </div>
            <div className={`budget-status ${costData.totalCost <= projectData.budget ? 'within' : 'exceed'}`}>
              {costData.totalCost <= projectData.budget
                ? `✅ Within Budget by ₹${(projectData.budget - costData.totalCost).toLocaleString('en-IN')}`
                : `❌ Exceeds Budget by ₹${(costData.totalCost - projectData.budget).toLocaleString('en-IN')}`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostEstimator;