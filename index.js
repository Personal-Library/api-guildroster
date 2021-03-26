require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

const { testDBConnection } = require('./queries')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send({ msg: 'Hello World' });
});

app.get('/test', async(req, res) => {
  const responseFromDB = await testDBConnection();
  res.send(responseFromDB)
})

app.listen(PORT, () => {
	console.log(`App is live on PORT: ${PORT}`);
});
