import express from 'express';
import * as fs from 'fs';

const app = express();
const port = 3000;
const fileName = 'items.json';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  console.log('get');
  const text = fs.readFileSync(fileName,'utf8');
  var items = JSON.parse(text);
  let filter  = req.query.filter; 
  if (filter) {
    items = items.filter(item => item.title.includes(filter) || item.details.includes(filter));
  }
  let lat  = Number(req.query.lat); 
  let long  = Number(req.query.long);
  if (lat && long) {
    items = items.filter(item => {
      if (!item.lat || !item.long) {
        return false;
      }
      if (Math.abs(lat - item.lat) > 0.1) {
        return false
      }
      if (Math.abs(long - item.long) > 0.1) {
        return false
      }
      return true
    });
  }
  let response = JSON.stringify(items, null, 2);
  res.send(response);
  return
});

app.delete('/:id', (req, res) => {
  let id = req.params.id
  console.log('delete ' + id);
  let text = fs.readFileSync(fileName,'utf8');
  let items = JSON.parse(text);
  let filtered = items.filter(item => item.id !== id);
  let firteredText = JSON.stringify(filtered, null, 2);
  fs.writeFileSync(fileName, firteredText);
  res.send("ok");
});

app.put('/:id', jsonParser, (req, res) => {
  let id = req.params.id
  console.log('put ' + id);
  let text = fs.readFileSync(fileName,'utf8');
  var items = JSON.parse(text);
  items = items.filter(item => item.id !== id);
  items.push(req.body)
  let firteredText = JSON.stringify(items, null, 2);
  fs.writeFileSync(fileName, firteredText);
  res.send("ok");
});

app.post('/', jsonParser, (req, res) => {
  let id = "" + Math.floor(Math.random() * 1000000);
  console.log('post');
  var text = fs.readFileSync(fileName,'utf8');
  var items = JSON.parse(text);
  let item = req.body
  item.id = id
  items.push(req.body)
  text = JSON.stringify(items, null, 2);
  fs.writeFileSync(fileName, text);
  res.send(id);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});