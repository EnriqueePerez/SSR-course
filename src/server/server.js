import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.send({ hello: 'hola' });
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Server is running on port 3000');
});
