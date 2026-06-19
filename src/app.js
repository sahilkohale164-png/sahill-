// Global State
let projectData = {
    plotLength: 40,
    plotWidth: 30,
    direction: 'E',
    budget: 1000000,
    rooms: [],
    vastuScore: 0,
    costEstimate: {}
};

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
}

// Generate Layout
function generateLayout() {
    const length = parseFloat(document.getElementById('plotLength').value);
    const width = parseFloat(document.getElementById('plotWidth').value);
    const direction = document.getElementById('direction').value;
    const budget = parseFloat(document.getElementById('budget').value);
    
    if (!length || !width || length <= 0 || width <= 0) {
        alert('Please enter valid length and width');
        return;
    }
    
    projectData.plotLength = length;
    projectData.plotWidth = width;
    projectData.direction = direction;
    projectData.budget = budget;
    
    console.log('Layout Generated:', projectData);
    alert(`✅ Layout Generated!\nPlot: ${length}m × ${width}m\nDirection: ${direction}\nArea: ${(length * width).toFixed(2)}m²`);
    
    // Auto-trigger room suggestions
    generateRoomSuggestions();
}

// Generate Report
function generateReport() {
    const element = document.querySelector('.main-content');
    const opt = {
        margin: 10,
        filename: 'civil-plan-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
    alert('📄 PDF Report Generated!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏗️ Civil Engineer AI App Loaded');
    showTab('plot');
});