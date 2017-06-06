const express = require('express');
const webpack = require('webpack');
const path = require('path');
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const config = require('../../webpack.config.dev');

const app = express();
const compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(express.static(path.join(__dirname, '../..')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(port);
console.log('Running on port ' + port);
