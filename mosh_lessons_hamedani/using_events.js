const Logger = require("./logger");
const logger = new Logger();

logger.on('loggercalled', (arg)=>{
  console.log(arg);
});

logger.log("na today");