const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

var caseReport = require('./routes/caseReport'); 
var reportsList = require('./routes/reportsList'); 
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/caseReport', caseReport.list);
app.get('/caseReport/add', caseReport.add);
app.post('/caseReport/add', caseReport.save);
app.get('/caseReport/delete/:id', caseReport.delete);
app.get('/caseReport/edit/:id', caseReport.edit);
app.post('/caseReport/edit/:id', caseReport.update);
app.get('/reportsList', reportsList.list);
app.get('/reportsList/chartTest', reportsList.chartTest);

app.listen(8080, function () {
    console.log('Server is running.. on Port: ${port}');
});