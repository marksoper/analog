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
		  var resstr = '';
			for (attr in res) {
				resstr = resstr + "\n" + attr + " ::: " + res[attr];
			}
      res.send(501, {}, { "test_data": "test_content" });
    });
  });

  return router;
};