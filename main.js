function drawViz(data, element) {
  const rows = (data && data.tables && data.tables.DEFAULT && data.tables.DEFAULT.rows) || [];

  if (rows.length < 2) {
    element.innerHTML = `
      <div style="text-align:center;color:#777;font-family:sans-serif;padding:20px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
             alt="No data"
             style="width:100px;opacity:0.5;">
        <div style="margin-top:10px;font-size:16px;">Немає даних за цей період</div>
      </div>`;
    return;
  }

  const ctx = document.createElement('canvas');
  element.innerHTML = '';
  element.appendChild(ctx);

  const labels = rows.map(r => r.dimID[0]);
  const values = rows.map(r => r.metricID[0]);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Value',
        data: values,
        backgroundColor: '#4285F4'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}
