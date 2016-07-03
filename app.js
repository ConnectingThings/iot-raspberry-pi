var sensorLib = require('node-dht-sensor');
var mqtt = require('mqtt');

var client = mqtt.connect({ 
  port: 1883, 
  host: 'app.connectingthings.io', 
  keepalive: 10000, 
  protocolId: 'MQIsdp', 
  protocolVersion: 3
});

var sensor = {
    initialize: function () {
        return sensorLib.initialize(22, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        var temp =  readout.temperature.toFixed(2) ;
        var humidity = readout.humidity.toFixed(2);
       
        client.publish('/device/switch/key/1qaz2wsx', "{\"value\": \""+humidity+"\",\"tag\": \"humidity\"}");
        client.publish('/device/switch/key/1qaz2wsx', "{\"value\": \""+temp+"\",\"tag\": \"temperature\"}");
       
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +  'humidity: ' + readout.humidity.toFixed(2) + '%');
       
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
