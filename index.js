//requiring all the dependencies
var express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes');
    
//Setting up the application(with minimum dependencies)
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(cors());

//setting up routing
app.use('/', routes);

//port route
app.listen(process.env.PORT || 8080, function(){
    console.log('Server has started');
})