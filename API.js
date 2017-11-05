var express = require('express');
var router_API = express.Router([options]);
var options;

router_API.get('/route1', function(req, res) {
    res.send('OMG... Google Cloud Kinda Rules'); 
});

module.exports = router_API;