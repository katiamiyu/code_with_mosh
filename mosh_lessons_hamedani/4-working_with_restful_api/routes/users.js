const Joi = require('joi');
const validator = require('../validator');
const express = require('express');
const router = express.Router();


const users =[
  {id: 1, name: 'katiamiyu'},
  {id: 2, name: 'keacyd5'},
  {id: 3, name: 'husty'}
  ];
  
  const schema = {
    name: Joi.string().min(3).required()
  };

router.get('/', (req, res)=>{
  res.status(200).send(users);
});

router.get('/:id', (req, res)=>{
  const user = users.find(x=>x.id === parseInt(req.params.id));
  if(!user) return res.status(404).send(`user with id: ${req.params.id} cannot be found`);
  res.status(200).send(user);
});

router.post('/', (req, res)=>{
  const id = users.length + 1;
  
  const {error, value} = validator(req.body, schema);
  
  if (error) return res.status(400).send(`bad request: ${error.details[0].message}`);
  
  users.push({id: id, name: req.body.name});
  res.status(201).send(`Data saved: ${JSON.stringify(value)}`);
}); 

router.put('/:id', (req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) return res.status(404).send(`user with id: ${req.params.id} cannot be found`);
  
  const {error, value} = validator(req.body, schema);
  if (error) return res.status(400).send(`bad request: ${error.details[0].message}`);
  
  const index = users.indexOf(user);
  users[index].name = req.body.name;
  
  res.status(200).send('user record updated successfully');
});

router.delete('/:id', (req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) return res.status(404).send(`user with id: ${req.params.id} cannot be found`);
  
  const index = users.indexOf(user);
  users.splice(index, 1);
  
  res.status(200).send('user record deleted successfully');
  
});

module.exports = router;