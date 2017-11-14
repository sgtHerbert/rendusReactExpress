var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//db connection
var mongoose    = require('mongoose');//test db connection 
dbbAltas = "mongodb://admin:lololala@airbnb-shard-00-00-58wlj.mongodb.net:27017,airbnb-shard-00-01-58wlj.mongodb.net:27017,airbnb-shard-00-02-58wlj.mongodb.net:27017/test?ssl=true&replicaSet=airbnb-shard-0&authSource=admin" 
mongoose.Promise = global.Promise;

mongoose.connect( dbbAltas, function(err){
    if (err) throw err;
    else console.log("connecté à la dbb atlas");
})

// routes
var index        = require('./routes/index');
// routes de l'api
var api = require('./routes/api');

// view engine setup
var app = express();
//app.use(cors);

//socket.io messaging
var socketListener = require('http').createServer(app);
var io = require('socket.io')(socketListener);
socketListener.listen(3002);

var dialogues = ["c'est quoi ton nom ? ", 'chui pas rassuré', 'regarde à gauche ya des dauphins', "moi c'est zambla", "oua t'es balaise"]

io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('message', function () {
        io.emit('message', dialogues[Math.floor(Math.random() * dialogues.length)]);
    })
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//authoriser cors requetes
var cors = require('cors')
var whitelist = [
    'http://0.0.0.0:3000',
    'http://0.0.0.0:3001',
    'http://0.0.0.0:3002',
    'http://localhost:3000',
    'http://localhost:3001,',
    'http://localhost:3002'
];
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use('/'   , index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
