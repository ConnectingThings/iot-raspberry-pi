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
        return sensorLib.initialize(11, 4);
    },
    readTemperature: function () {
        var readout = sensorLib.read();
        var temp =  readout.temperature.toFixed(0);
        
        client.publish('/device/xxxx/key/xxxx', "{\"value\": \""+temp+"\",\"tag\": \"temperature\"}");
       
        setTimeout(function () {
            sensor.readHumidity();
        }, 5000);
    },
    readHumidity: function () {
        var readout = sensorLib.read();
        var humidity = readout.humidity.toFixed(0) ;
       
        client.publish('/device/xxxx/key/xxxx', "{\"value\": \""+humidity+"\",\"tag\": \"humidity\"}");
       
        setTimeout(function () {
            sensor.readTemperature();
        }, 5000);
    }
};

if (sensor.initialize()) {
    sensor.readTemperature();
} else {
    console.warn('Failed to initialize sensor');
}
