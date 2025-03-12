const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message){
    console.log(`from logger ${message}`);
    this.emit("loggercalled", {id: 1, value: 10});
  }
}
module.exports = Logger;