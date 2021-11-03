//Variables
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const { read } = require('fs');
const crud = require('./app.controller/app.controller');
let cruds =new crud();
const app = express();
let PORT = process.env.PORT || 3000;
const urlEncodeParser = bodyParser.urlencoded({extended:false});



//Template Engine
app.engine("handlebars", handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/media', express.static('media'));



//Routes
app.get("/selecionar/:id?", (req, res) => {cruds.read(req, res);});
app.get("/editar/:id", (req, res) => {res.render("updateForm", {id: req.params.id})});
app.post("/editar/updateForm", urlEncodeParser, (req, res) => {cruds.update(req, res);});
app.get("/deletar/:id", (req, res) => {cruds.delete(req, res);});
app.get("/inserir", (req, res) => {res.render('insertForm');});
app.post("/insertForm", urlEncodeParser, (req, res) => {cruds.create(req, res);});
app.get("/:id?", (req, res) => {res.render('index', {id:req.params.id});});



//Server Start
console.log('Inicializando aplicativo...');
app.listen(PORT, function(req, res){console.log('Rodando aplicativo.');});