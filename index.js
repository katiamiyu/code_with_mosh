const Joi = require('joi');
const express = require('express');
const app = express();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const genres = [
    {name: 'action', id:1},
    {name:'romance', id: 2},
    {name: 'adventure', id: 3}
  ];
  
 const genreSchema = Joi.object({
    name: Joi.string().min(5).required()
  });
  
  app.get('/api/genres', (req, res)=>{
    res.status(200).send(genres);
  });
  
  app.get('/api/genres/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const genre = genres.find(g=>g.id===id);
    
    if (!genre) return res.status(404).send(`genre with id ${id} cannot be found`);
    
    res.status(200).send(genre);
  });
  
  app.post('/api/genres', (req, res)=>{
    const id = genres.length+1;
    
    const {error, value} = genreSchema.validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    genres.push({id: id, name: req.body.name});
    res.status(201).send(JSON.stringify(value));
    
  });
  
  app.put('/api/genres/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const genre = genres.find(g=>g.id===id);
    
    if (!genre) return res.status(404).send(`item with id ${id} does not exist`);
    
    const {error, value} = genreSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    res.status(200).send(`genre with id ${id}, updated successfully`);
  });
  
  app.delete('/api/genres/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const genre = genres.find(g=>g.id===id);
    if(!genre) return res.status(400).send(`genre with id ${id}, does not exist`);
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.status(200).send(`genre with id ${id}, removed successfully`);
  });

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`app listening on ${port}`));