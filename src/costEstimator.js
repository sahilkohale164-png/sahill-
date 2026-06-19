// Cost Estimator
const materialRates = {
    cement: { unit: 'bag (50kg)', pricePerUnit: 350 }, // per bag
    bricks: { unit: 'piece', pricePerUnit: 8 }, // per brick
    steel: { unit: 'kg', pricePerUnit: 65 }, // per kg
    sand: { unit: 'cu.ft', pricePerUnit: 40 },
    gravel: { unit: 'cu.ft', pricePerUnit: 35 },
    laborCost: { unit: 'sq.ft', pricePerUnit: 150 } // per sq.ft
};

// Standard quantities per sq.m of construction
const standardQuantities = {
    cement: 5, // bags per 10 sq.m
    bricks: 500, // per 10 sq.m
    steel: 50, // kg per 10 sq.m
    sand: 10, // cu.ft per 10 sq.m
    gravel: 5 // cu.ft per 10 sq.m
};

function calculateCost() {
    const plotArea = projectData.plotLength * projectData.plotWidth;
    const builtUpArea = projectData.rooms.reduce((sum, room) => sum + room.area, 0);
    
    // Estimate usable built-up area (typically 60-70% of plot)
    const estimatedBuildingArea = Math.min(builtUpArea * 1.2, plotArea * 0.7);
    const estimatedBuildingSqFt = estimatedBuildingArea * 10.764; // convert to sq.ft
    
    // Calculate material quantities
    const quantities = {
        cement: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.cement),
        bricks: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.bricks),
        steel: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.steel),
        sand: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.sand),
        gravel: Math.ceil((estimatedBuildingArea / 10) * standardQuantities.gravel),
        labor: Math.ceil(estimatedBuildingSqFt)
    };
    
    // Calculate costs
    const costs = {
        cement: quantities.cement * materialRates.cement.pricePerUnit,
        bricks: quantities.bricks * materialRates.bricks.pricePerUnit,
        steel: quantities.steel * materialRates.steel.pricePerUnit,
        sand: quantities.sand * materialRates.sand.pricePerUnit,
        gravel: quantities.gravel * materialRates.gravel.pricePerUnit,
        labor: quantities.labor * materialRates.laborCost.pricePerUnit
    };
    
    const materialCost = Object.values(costs).reduce((a, b) => a + b, 0);
    const contingency = materialCost * 0.15; // 15% contingency
    const totalCost = materialCost + contingency;
    
    projectData.costEstimate = {
        quantities,
        costs,
        materialCost,
        contingency,
        totalCost,
        buildingArea: estimatedBuildingArea,
        costPerSqM: totalCost / estimatedBuildingArea
    };
    
    // Display report
    const container = document.getElementById('costReport');
    container.innerHTML = '<h3>💰 Cost Estimation Report</h3>';
    
    // Material costs
    const materialDiv = document.createElement('div');
    materialDiv.className = 'cost-item';
    materialDiv.innerHTML = `<h3>📦 Material Costs</h3>`;
    
    Object.entries(costs).forEach(([material, cost]) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${material.toUpperCase()}:</strong> ₹${cost.toLocaleString('en-IN')} (${quantities[material]} ${materialRates[material] ? materialRates[material].unit : 'units'})`;
        materialDiv.appendChild(p);
    });
    
    container.appendChild(materialDiv);
    
    // Summary
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'cost-item';
    summaryDiv.innerHTML = `
        <h3>📊 Summary</h3>
        <p><strong>Building Area:</strong> ${estimatedBuildingArea.toFixed(2)}m² (${estimatedBuildingSqFt.toFixed(0)} sq.ft)</p>
        <p><strong>Material Cost:</strong> ₹${materialCost.toLocaleString('en-IN')}</p>
        <p><strong>Contingency (15%):</strong> ₹${contingency.toLocaleString('en-IN')}</p>
        <h2 style="color: var(--primary); margin-top: 15px;">Total Estimated Cost: ₹${totalCost.toLocaleString('en-IN')}</h2>
        <p><strong>Cost per Sq.M:</strong> ₹${projectData.costEstimate.costPerSqM.toLocaleString('en-IN')}</p>
        <p><strong>Budget:</strong> ₹${projectData.budget.toLocaleString('en-IN')}</p>
        <p style="color: ${totalCost <= projectData.budget ? '#4caf50' : '#f44336'};">
            ${totalCost <= projectData.budget ? '✅ Within Budget' : '❌ Exceeds Budget by ₹' + (totalCost - projectData.budget).toLocaleString('en-IN')}
        </p>
    `;
    container.appendChild(summaryDiv);
    
    console.log('Cost Calculated:', projectData.costEstimate);
}