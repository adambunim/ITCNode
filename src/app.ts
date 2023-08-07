import express from 'express';
import * as fs from 'fs';

const app = express();
const port = 3000;
const fileName = 'items.json';

app.get('/', (req, res) => {
  console.log('get');
  const text = fs.readFileSync(fileName,'utf8');
  res.send(text);
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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});