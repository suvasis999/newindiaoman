'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use('/api', eventRoutes.routes);



/*app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});*/

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send(`Working fine on server ${config.port}`);
});

app.listen(config.port, () => {
  console.log("Server is up on port " + config.port);
});

module.exports = app;