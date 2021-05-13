let myChart = document.getElementById('myChart').getContext('2d');

const temp = localStorage;
console.log(temp);
const data = [];
function processData(array) {
  for (let i = 0; i < 4; i++) {
    data[i] = array[i].split(',').reduce((sum, curr) => sum + Number(curr), 0);
  }
}
processData(temp);
console.log(data);

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

let barChart = new Chart(myChart, {
  type: 'doughnut',
  data: {
    labels: ['Starters', 'Mains', 'Desserts', 'Drinks'],
    datasets: [
      {
        label: ' ',
        data: [...data],
        backgroundColor: [
          'rgba(54,162,235,0.6)',
          'rgba(255,206,86,0.6)',
          'rgba(75,192,192,0.6)',
          'rgba(153.102,255,0.6)',
        ],
        hoverOffset: 7,
        borderWidth: 1,
        borderColor: '#000000',
        hoverBorderWidth: 3,
        hoverBorderColor: '#333',
      },
    ],
  },
  plugins: [plugin],
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Products Price Comparison',
        font: {
          size: 30,
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          fontColor: '#333',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 50,
    },
  },
});
