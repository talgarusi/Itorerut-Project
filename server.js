var express = require('express');
var routes = require('./routes');

var app = express();


app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);

app.get('/partials/:name', routes.partials);

app.get('*', routes.index);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});