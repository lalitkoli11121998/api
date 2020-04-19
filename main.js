const express = require('express');
const app = express()
require('custom-env').env(true)
const port = process.env.port;
const bodyParser = require('body-parser')
const routes = require('./router/route');
var logger = require('./config/winston');
const swaggerUi = require('swagger-ui-express');
const swaggerDef = require('./swaggerDef');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const path =  require('path');

//let host = `${process.env.ip}:${process.env.port}`;
let basePath = `/`
if (process.env.name != 'default') {
    basePath = `/fee-api`
}
const swaggerOptions = {
    // swaggerDefinition: swaggerDef,
    swaggerDefinition: {
        info: {
            title: 'FEE MANAGEMENT API',
            description: 'FEE MANAGEMENT API information',
            contact: {
                name: ' Developer'
            }
        },
        basePath: basePath
    },
    //['.routes/*.js]
    // apis: ["app.js"]
    apis: ['router/route.js', 'controllers/*_controller.js','controllers/*/*_controller.js', 'controllers/*/*/*_controller.js', 'controllers/*/*_schema.js', 'controllers/*/*/*_schema.js'],


};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const cookieSession = require('cookie-session');
var engines = require('consolidate');
var ejs = require('ejs');
var engine = require('ejs-mate');



//Middlewares
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






// const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

let originsWhitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
    'http://localhost:2228',
];


let corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization,Referer,User-Agent, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});



//test

app.get('/test', (req, res) => res.status(200).send('Welcome to fee Managenment API'));


// app.use(app.router);
// routes.initialize(app);

app.use('/', routes);
app.post('/',function(req,res){
   return res.status(200).send("invalid");
});
var server = app.listen(port, () => {
    logger.info(`App running on port ${port}.`);
})


//response time out(5 minutes -->> 300 seconds -->> 300000 milliseconds)
server.timeout = 300000;
