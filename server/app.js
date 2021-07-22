
const express = require('express')
const routes = require('./router/router')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');
const app = express()
const port = '8000'
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

  app.use(cors());
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});
app.use('/', routes)

app.listen(port, ()=> console.log('port is running successfully'))

module.exports = app;