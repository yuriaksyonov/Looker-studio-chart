function drawViz(data, element) {
  const rows = (data && data.tables && data.tables.DEFAULT && data.tables.DEFAULT.rows) || [];

  // 🟡 CASE 1: Not enough data → show placeholder image
  if (rows.length < 2) {
    element.innerHTML = `
      <div style="
        text-align:center;
        color:#777;
        font-family:'Segoe UI', Roboto, sans-serif;
        padding:20px;
      ">
        <img src="https://raw.githubusercontent.com/yuriaksyonov/Looker-studio-chart/main/chart.svg"
             alt="Недостатньо даних"
             style="width:120px;opacity:0.8;margin-bottom:8px;">
        <div style="font-size:16px;">Недостатньо даних</div>
      </div>`;
    return;
  }

  // 🟢 CASE 2: Enough data → draw chart
  const ctx = document.createElement('canvas');
  element.innerHTML = '';
  element.appendChild(ctx);

  const labels = rows.map(r => r.dimID[0]);  // first dimension
  const values = rows.map(r => r.metricID[0]); // first metric

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
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: {
          ticks: { color: '#333' },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#555' },
          grid: { color: '#ddd' }
        }
      }
    }
  });
}
