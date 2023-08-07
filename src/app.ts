import express from 'express';
import * as fs from 'fs';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('get');
  const text = fs.readFileSync('items.json','utf8');
  res.send(text);
});

app.delete('/:id', (req, res) => {
  console.log('delete');
  res.send("ok");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});