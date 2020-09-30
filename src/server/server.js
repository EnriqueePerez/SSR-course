import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('*', (req, res) => {
  res.send({ hello: 'hola' });
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(
      // eslint-disable-next-line comma-dangle
      `Server is running on port ${process.env.PORT} and in ${process.env.ENV} mode`
    );
  }
});
