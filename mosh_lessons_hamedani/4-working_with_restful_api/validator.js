const Joi = require('joi');

const validator = (data, schemaObject)=>{
  schema = Joi.object(schemaObject);
  return schema.validate(data);
};
module.exports = validator;