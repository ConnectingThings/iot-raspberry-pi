
var mqtt = require('mqtt');
/*
var client = mqtt.connect({ 
  port: 1883, 
  host: 'app.connectingthings.io', 
  keepalive: 10000, 
  protocolId: 'MQIsdp', 
  protocolVersion: 3
});

*/
       
//        client.publish('/device/switch/key/1qaz2wsx', "{\"value\": \""+humidity+"\",\"tag\": \"humidity\"}");
//        client.publish('/device/switch/key/1qaz2wsx', "{\"value\": \""+temp+"\",\"tag\": \"temperature\"}");



var rpiDhtSensor = require('rpi-dht-sensor');

var dht = new rpiDhtSensor.DHT22(2);

function read () {
  var readout = dht.read();

    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
        'humidity: ' + readout.humidity.toFixed(2) + '%');
    setTimeout(read, 5000);
}
read();
