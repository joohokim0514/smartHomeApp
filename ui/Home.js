var myParticleAccessToken = ""
var myDeviceId = ""
var topic = "cse222/homeApp"

//listener that listens for a json string reponse
function newHomeEvent(objectContainingData) {
    console.log(objectContainingData)
    var data = JSON.parse(objectContainingData.data);

    home.doorState = data.ds;
    home.lightState = data.ls;
    home.acState = data.acs;
    home.autoOff = data.auoff;
    home.alarmState = data.as;
    home.danger = data.danger;
    home.autoOffTime = parseInt(data.aot);
    alarmStateResponse(home.alarmState);
    dangerResponse(home.danger);
    doorStateResponse(home.doorState);
    lightStateResponse(home.lightState);
    acStateResponse(home.acState);
    autoOffTimeResponse(home.autoOffTime);

    console.log("finished")

}
//home object that controls the state of UI
var home = {
    particle: null,

    setup: function() {
        particle = new Particle();
        function onSuccess(stream) {
          // DONE:  This will "subscribe' to the stream and get the state"
          console.log("getEventStream success")
          stream.on('event', newHomeEvent)
        //gets state as soon as the argon is connected 
          var functionData = {
            deviceId:myDeviceId,
            name: "publishState",
            argument: "",
            auth: myParticleAccessToken
          }
          function onSuccess(e) { console.log("publishState call success") }
          function onFailure(e) { console.log("publishState call failed")
                                 console.dir(e) }
  
          particle.callFunction(functionData).then(onSuccess,onFailure)
        }
        function onFailure(e) { console.log("getEventStream call failed") }
        particle.getEventStream( { name: topic, auth: myParticleAccessToken, deviceId: myDeviceId }).then(onSuccess, onFailure)
    },

    //Displays door state
    doorState: "LOCKED",

    getDoorState: function() {
        return this.doorState;
    },

    setDoorState: function(newDoorState) {

        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setDoorState",
            argument: newDoorState,
            auth: myParticleAccessToken 
        }

        function onSuccess(e) { console.log("setDoorState call success"); }
        function onFailure(e) { console.log("setDoorState failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },
    //locked or unlocked functions
    lock: function() { 
        this.setDoorState("LOCKED");
    },

    unlock: function() { 
        this.setDoorState("UNLOCKED");
    },

    alarmState: "OFF",
    danger: "NONE",

    //sets alarm state
    setAlarmState: function(newAlarmState) {
        this.alarmState = newAlarmState;

        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setAlarmState",
            argument: newAlarmState,
            auth: myParticleAccessToken 
        }

        function onSuccess(e) { console.log("setAlarmState call success"); }
        function onFailure(e) { console.log("setAlarmState failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },

    enableAlarm: function() { 
        this.setAlarmState("ON");
    },

    disableAlarm: function() { 
        this.setAlarmState("OFF");
    },
    //light states => on or off
    lightState: "OFF",

    getLightState: function() {
        return this.lightState;
    },
    //sets light state and communicates with argon
    setLightState: function(newLightState) {
        this.lightState = newLightState;

        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setLightState",
            argument: newLightState,
            auth: myParticleAccessToken 
        }
        function onSuccess(e) { console.log("setLightState call success"); }
        function onFailure(e) { console.log("setLightState failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },

    lightOn: function() {
        if(this.lightState=="OFF") {
            this.setLightState("ON");
        }
    },

    lightOff: function() { 
        if(this.lightState=="ON") {
            this.setLightState("OFF");
        }
    },
    //air conditioner state => on or off
    acState: "OFF",

    setACState: function(newACState) {
        this.acState = newACState;

        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setACState",
            argument: newACState,
            auth: myParticleAccessToken 
        }
        function onSuccess(e) { console.log("setACState call success"); }
        function onFailure(e) { console.log("setACState failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },

    acOn: function() {
        if(this.acState=="OFF") {
            this.setACState("ON");
        }
    },

    acOff: function() { 
        if(this.acState=="ON") {
            this.setACState("OFF");
        }
    },
    //auto off state => enabled or disabled
    autoOff: "DISABLED",
    autoOffTime: 10,

    enableAutoOff: function() {
        this.autoOff = "ENABLED";
        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setAutoOffState",
            argument: "ENABLED",
            auth: myParticleAccessToken 
        }
        function onSuccess(e) { console.log("setAutoOffState call success"); }
        function onFailure(e) { console.log("setAutoOffState failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },

    disableAutoOff: function() {
        this.autoOff = "DISABLED";
        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setAutoOffState",
            argument: "DISABLED",
            auth: myParticleAccessToken 
        }
        function onSuccess(e) { console.log("setAutoOffState call success"); }
        function onFailure(e) { console.log("setAutoOfftate failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },
    //sets auto off time to time between 5 and 120 seconds
    setAutoOffTime: function(time) {
        if(time>120) time = 120;
        if(time<5) time = 5;
        this.autoOffTime = time;
        var self = this;
        var functionData = {
            deviceId:myDeviceId,
            name: "setAutoOffTime",
            argument: time.toString(),
            auth: myParticleAccessToken 
        }
        function onSuccess(e) { console.log("setAutoOffTime call success"); }
        function onFailure(e) { console.log("setAutoOffTime failed") }
        particle.callFunction(functionData).then(onSuccess,onFailure)
    },


}