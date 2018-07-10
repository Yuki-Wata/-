//milkcocoaに接続
var milkcocoa = new MilkCocoa('catjhyx3g1b.mlkcca.com');
var ds = milkcocoa.dataStore('messages');
//時間，温度のデータを入れる変数
var buf = {};
buf['my_chart'] = [];
var data_id = getDataName();
//グラフ描画
var id = 'my_chart';
var yAxes_min = 0;
var yAxes_max = 0;
var ctx = document.getElementById(id).getContext('2d');
//サイズ設定
ctx.canvas.width=600;
ctx.canvas.height=200;
//グラフ本体
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      data: [],
      label: getDataName(),
      borderColor: 'rgb(255,99,132)',
      backgroundColor: 'rgba(255,99,132,0.5)',
      fill: false,
      pointBorderWidth: 0,
      //lineTension: 0
    }]
  },
  options: {
    title: {
      text: getDataName(),
      display: true
    },
    scales: {
      xAxes: [{
        type: 'realtime'
      }],
      yAxes: [{
          ticks: {
            beginAtZero: true,
            min: yAxes_min,
            max: yAxes_max
          }
      }]
    },
    plugins: {
      //リアルタイム制御
      streaming: {
        duration: 86400000,
        onRefresh: function(chart){
          //データをグラフに追加
          Array.prototype.push.apply(
            chart.data.datasets[0].data,buf[id]
          );
          buf[id] = [];
        }
      }
    }
  }
});



//最初にデータを読み取って描画
ds.stream().size(150).next(function(err,messages){
  for(var i=0;i<150;i++){
    if(messages[i]!=undefined){
      switch (data_id) {
        case 'temperature1':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.temperature1
          });
          break;
        case 'temperature2':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.temperature2
          });
          break;
        case 'humidity1':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.humidity1
          });
          break;
        case 'humidity2':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.humidity2
          });
          break;
        case 'soilmoisture':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.soil_moisture
          });
          break;
        case 'light':
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.light
          });
          break;
        default:
          buf['my_chart'].push({
            x: messages[i].timestamp,
            y: messages[i].value.temperature1
          });
      }
    }
  }
});

//データストアにpushされたときにデータを読み込み
ds.on('push', function(messages){
  switch (data_id) {
    case 'temperature1':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.temperature1
      });
      break;
    case 'temperature2':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.temperature2
      });
      break;
    case 'humidity1':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.humidity1
      });
      break;
    case 'humidity2':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.humidity2
      });
      break;
    case 'soilmoisture':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.soil_moisture
      });
      break;
    case 'light':
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.light
      });
      break;
    default:
      buf['my_chart'].push({
        x: messages.timestamp,
        y: messages.value.temperature1
      });
  }
});

function getDataName() {
  switch (window.location.href.split('/').pop()) {
    case 'temperature1-charts.html':
        yAxes_min=15;yAxes_max=35;
        return 'temperature1';
      break;
    case 'temperature2-charts.html':
        yAxes_min=15;yAxes_max=35;
        return 'temperature2';
      break;
    case 'humidity1-charts.html':
        yAxes_min=0;yAxes_max=100;
        return 'humidity1';
      break;
    case 'humidity2-charts.html':
        yAxes_min=0;yAxes_max=100;
        return 'humidity2';
      break;
    case 'soilmoisture-charts.html':
        yAxes_min=-100;yAxes_max=700;
        return 'soilmoisture';
      break;
    case 'light-charts.html':
        yAxes_min=0;yAxes_max=100;
        return 'light';
      break;
    default:
        yAxes_min=15;yAxes_max=35;
        return 'temperature1';

  }
}
