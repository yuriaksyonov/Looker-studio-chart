// main.js

// The main function that receives data and config from Looker Studio
dscc.subscribeToData(function(data) {
    const element = document.getElementById('chart_container');
    element.innerHTML = ''; // Clear the container

    // 1. Get data and config
    const rows = (data && data.tables && data.tables.DEFAULT) || [];
    const config = data.config;

    // 2. Extract necessary values
    const thresholdValue = parseFloat(config.style.visibilityThreshold || 0);

    // Calculate the total of the metric column (assuming the metric is the second column [1])
    const totalMetricValue = rows.reduce((sum, row) => {
        // Looker Studio sends metrics as strings, so we must parse them
        const metric = parseFloat(row.metricID[0]); 
        return sum + (isNaN(metric) ? 0 : metric);
    }, 0);

    // 3. Implement Conditional Visibility Logic

    if (totalMetricValue > thresholdValue) {
        // --- CONDITION MET: Draw the actual chart ---
        
        const ctx = document.createElement('canvas');
        element.appendChild(ctx);

        const labels = rows.map(r => r.dimID[0]);
        const values = rows.map(r => parseFloat(r.metricID[0]));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Значення',
                    data: values,
                    backgroundColor: '#4a90e2'
                }]
            },
            options: {
                // Ensure chart scales to the container
                maintainAspectRatio: false, 
                responsive: true,
                // ... rest of your Chart.js options ...
            }
        });

    } else {
        // --- CONDITION NOT MET: Show Placeholder Message ---
        
        element.innerHTML = `
          <div style="
            text-align:center;
            color:#D0021B; 
            font-family:'Segoe UI', Roboto, sans-serif;
            padding:20px;
            height: 100%; 
            display: flex; 
            flex-direction: column;
            justify-content: center;
          ">
            <div style="font-size:20px; font-weight: bold;">
              Threshold Not Met
            </div>
            <div style="font-size:14px; margin-top: 5px;">
              Total Value (${totalMetricValue.toFixed(2)}) is not greater than Threshold (${thresholdValue.toFixed(2)}).
            </div>
            <img src="https://yuriaksyonov.github.io/Looker-studio-chart/chart.svg" 
                alt="Threshold Not Met"
                style="width:120px; opacity:0.6; margin: 20px auto;">
          </div>`;
    }
});
