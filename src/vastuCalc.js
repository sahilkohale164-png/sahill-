// Vastu Compliance Checker
const vastuRules = [
    { id: 1, name: 'North/East Entrance', description: 'Main entrance should face North or East', weight: 15 },
    { id: 2, name: 'Master Bedroom Position', description: 'Master bedroom in South-West corner', weight: 15 },
    { id: 3, name: 'Kitchen Position', description: 'Kitchen in South-East corner (fire element)', weight: 12 },
    { id: 4, name: 'Living Room Central', description: 'Living room in center of house', weight: 12 },
    { id: 5, name: 'Prayer Room North-East', description: 'Prayer/Pooja room in North-East', weight: 10 },
    { id: 6, name: 'Toilet Away from Center', description: 'Toilet/Bathroom not in center', weight: 10 },
    { id: 7, name: 'Plot Shape', description: 'Square or rectangular plot', weight: 10 },
    { id: 8, name: 'Water Feature NE', description: 'Water features in North-East', weight: 8 },
    { id: 9, name: 'Open Space East', description: 'Open space/courtyard on East side', weight: 5 },
    { id: 10, name: 'No Slopes', description: 'Plot should be level without major slopes', weight: 3 }
];

function checkVastuCompliance() {
    const container = document.getElementById('vastuReport');
    container.innerHTML = '<h3>🔯 Vastu Analysis Report</h3>';
    
    let totalScore = 0;
    let acquiredScore = 0;
    
    vastuRules.forEach(rule => {
        // Random compliance check for demo
        const isCompliant = Math.random() > 0.4;
        const score = isCompliant ? rule.weight : Math.floor(rule.weight * 0.5);
        acquiredScore += score;
        totalScore += rule.weight;
        
        const div = document.createElement('div');
        div.className = 'vastu-item';
        
        const status = isCompliant ? 'compliant' : 'partial';
        const statusText = isCompliant ? '✅ Compliant' : '⚠️ Partial';
        
        div.innerHTML = `
            <h3>${rule.name}</h3>
            <p>${rule.description}</p>
            <p><strong>Score:</strong> ${score}/${rule.weight}</p>
            <span class="vastu-status ${status}">${statusText}</span>
        `;
        container.appendChild(div);
    });
    
    const percentage = Math.round((acquiredScore / totalScore) * 100);
    projectData.vastuScore = percentage;
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'vastu-item';
    let recommendation = '';
    
    if (percentage >= 85) {
        recommendation = '✅ Excellent Vastu Compliance! Your plot layout is highly aligned with Vastu principles.';
    } else if (percentage >= 70) {
        recommendation = '🟢 Good Vastu Compliance! Minor adjustments recommended.';
    } else if (percentage >= 50) {
        recommendation = '🟡 Average Vastu Score. Consider redesigning for better alignment.';
    } else {
        recommendation = '🔴 Low Vastu Compliance. Major redesign recommended.';
    }
    
    summaryDiv.innerHTML = `
        <h3>📈 Overall Vastu Score</h3>
        <h2 style="color: var(--primary); font-size: 32px;">${percentage}%</h2>
        <p>${recommendation}</p>
    `;
    container.appendChild(summaryDiv);
    
    console.log('Vastu Compliance Score:', percentage);
}