const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('index', {
    title: 'BVM Bytes',
    description: 'Feed Burner for BVMites'
  });
});

app.listen(app.get('port'), function () {
  console.log('BVM Bytes is running on port', app.get('port'));
});
