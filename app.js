var express = require("express");
var app     = express();
var http    = require("http");
var server  = http.createServer(app);

app.configure(function () {
  // Localización de los ficheros estáticos
  app.use(express.static(__dirname + '/public'));
  // Muestra un log de todos los request en la consola    
  app.use(express.logger('dev')); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

require("./routes/routes")(app);

app.get('*', function(req, res) {           // Carga una vista HTML simple donde irá nuesta Single App Page
  res.sendFile('./public/index.html');        // Angular Manejará el Frontend
});

server.listen(1953, function() {
  console.log("Node server running on http://localhost:1953");
});