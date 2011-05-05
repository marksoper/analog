/*
 * Analog - Analytics for Node Logs
 * service.js: Web Server Routing for Analog Site
 * 
 * Copyright(C) 2011 Mark Soper - masoper at gmail                                                                                                 
 * MIT LICENSE
 *
 */

var journey = require('journey');

/**
 * Creates the RESTful router for the analog web service
 */
exports.createRouter = function () {
  var router = new (journey.Router)({
    strict: false,
    strictUrls: false,
    api: 'basic'
  });
  
  router.path('/', function () {
    this.get().bind(function (res) {
      res.send(501, {}, { action: 'list' });
    });
  });

  return router;
};