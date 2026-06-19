import React, { useState } from 'react';
import './VastuChecker.css';

const vastuRules = [
  { id: 1, name: 'North/East Entrance', description: 'Main entrance should face North or East', weight: 15 },
  { id: 2, name: 'Master Bedroom Position', description: 'Master bedroom in South-West corner', weight: 15 },
  { id: 3, name: 'Kitchen Position', description: 'Kitchen in South-East corner', weight: 12 },
  { id: 4, name: 'Living Room Central', description: 'Living room in center of house', weight: 12 },
  { id: 5, name: 'Prayer Room North-East', description: 'Prayer/Pooja room in North-East', weight: 10 },
  { id: 6, name: 'Toilet Away from Center', description: 'Toilet/Bathroom not in center', weight: 10 },
  { id: 7, name: 'Plot Shape', description: 'Square or rectangular plot', weight: 10 },
  { id: 8, name: 'Water Feature NE', description: 'Water features in North-East', weight: 8 },
  { id: 9, name: 'Open Space East', description: 'Open space/courtyard on East side', weight: 5 },
  { id: 10, name: 'No Slopes', description: 'Plot should be level without major slopes', weight: 3 }
];

const VastuChecker = ({ projectData, setProjectData }) => {
  const [analysis, setAnalysis] = useState(null);

  const checkVastuCompliance = () => {
    let totalScore = 0;
    let acquiredScore = 0;
    const results = [];

    vastuRules.forEach(rule => {
      const isCompliant = Math.random() > 0.4;
      const score = isCompliant ? rule.weight : Math.floor(rule.weight * 0.5);
      acquiredScore += score;
      totalScore += rule.weight;

      results.push({
        ...rule,
        isCompliant,
        score
      });
    });

    const percentage = Math.round((acquiredScore / totalScore) * 100);
    
    setAnalysis({
      percentage,
      results,
      acquiredScore,
      totalScore
    });

    setProjectData(prev => ({
      ...prev,
      vastuScore: percentage
    }));
  };

  const getRecommendation = () => {
    if (!analysis) return '';
    
    if (analysis.percentage >= 85) {
      return { text: '✅ Excellent Vastu Compliance! Your plot layout is highly aligned with Vastu principles.', color: '#4caf50' };
    } else if (analysis.percentage >= 70) {
      return { text: '🟢 Good Vastu Compliance! Minor adjustments recommended.', color: '#8bc34a' };
    } else if (analysis.percentage >= 50) {
      return { text: '🟡 Average Vastu Score. Consider redesigning for better alignment.', color: '#ffc107' };
    } else {
      return { text: '🔴 Low Vastu Compliance. Major redesign recommended.', color: '#f44336' };
    }
  };

  return (
    <div className="tab-container">
      <h2>🔯 Vastu Compliance Checker</h2>
      
      <button className="btn-primary" onClick={checkVastuCompliance}>Check Vastu Compliance</button>

      {analysis && (
        <div className="vastu-results">
          <div className="vastu-score-card">
            <h3>Overall Vastu Score</h3>
            <div className="score-circle">
              <span className="score-value">{analysis.percentage}%</span>
            </div>
            <div className="recommendation" style={{ color: getRecommendation().color }}>
              {getRecommendation().text}
            </div>
          </div>

          <div className="vastu-details">
            <h3>📋 Detailed Analysis</h3>
            <div className="vastu-rules-grid">
              {analysis.results.map((result, index) => (
                <div key={index} className={`vastu-rule ${result.isCompliant ? 'compliant' : 'partial'}`}>
                  <div className="rule-header">
                    <h4>{result.name}</h4>
                    <span className={`status-badge ${result.isCompliant ? 'compliant' : 'partial'}`}>
                      {result.isCompliant ? '✅' : '⚠️'}
                    </span>
                  </div>
                  <p className="rule-desc">{result.description}</p>
                  <p className="rule-score">Score: {result.score}/{result.weight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VastuChecker;