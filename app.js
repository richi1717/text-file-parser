const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/resources'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

function getFileName(fileName, i = 0) {
  const doesExist =
    i > 0
      ? fs.existsSync(`./${fileName}${i}.txt`)
      : fs.existsSync(`./${fileName}.txt`);

  if (doesExist) {
    return getFileName(fileName, ++i);
  }

  return i > 0 ? `./${fileName}${i}.txt` : `./${fileName}.txt`;
}

app.post('/correct', function(req, res) {
  try {
    req.pipe(fs.createWriteStream(getFileName('correctlyFormattedRecords')));
    res.status(200).send();
  } catch (err) {
    console.log(`sorry ol' chap, you done messed up...' ${err}`);
    res.status(502).send();
  }
});

app.post('/incorrect', function(req, res) {
  try {
    req.pipe(fs.createWriteStream(getFileName('incorrectlyFormattedRecords')));
    res.status(200).send();
  } catch (err) {
    console.log(`sorry ol' chap, you done messed up...' ${err}`);
    res.status(502).send();
  }
});

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  }
});
