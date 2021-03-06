var router = require("express").Router();
var jwt = require("jsonwebtoken");
var request = require("request");
const basepath = "https://api.foursquare.com/v2";
const message_error = "Opps, there was an error. Try again.";

// Search places nearby with Lat and Lon
router.get('/nearby', function(req, res){
	request({
		url: basepath + '/venues/explore',
		method: 'GET',
		qs: {
			client_id: process.env.FQ_CLIENT_ID,
			client_secret: process.env.FQ_SECRET,
			ll: req.query.ll,
		    query: req.query.query,
			limit: 15,
			v: '20170801'
		}
		}, function(err_f, res_f, body_f) {
			if (err_f) {
				res.json({success: false, message: message_error})
			} else {
				try {
					response_json = {};
					json = JSON.parse(body_f);
					response_json["success"] = true;
					response_json["venues"] = json.response.groups[0].items;
					res.json(response_json);
				} catch(error) {
					res.json({success: false, message: message_error})
				}
			}
		});
});


// Search places by query and location
router.get('/search', function(req, res){
	request({
		url: basepath + '/venues/explore',
		method: 'GET',
		qs: {
			client_id: process.env.FQ_CLIENT_ID,
			client_secret: process.env.FQ_SECRET,
		    query: req.query.query,
			near: req.query.near,
			limit: 15,
			v: '20170801'
		}
		}, function(err_f, res_f, body_f) {
			if (err_f) {
				res.json({success: false, message: message_error})
			} else {
				try {
					response_json = {};
					json = JSON.parse(body_f);
					response_json["success"] = true;
					response_json["venues"] = json.response.groups[0].items;
					res.json(response_json);
				} catch(error) {
					res.json({success: false, message: message_error})
				}
			}
		});
});


// Search place by id
router.get('/search/:venueId', function(req, res){
	request({
		url: basepath + '/venues/' + req.params.venueId,
		method: 'GET',
		qs: {
			client_id: process.env.FQ_CLIENT_ID,
			client_secret: process.env.FQ_SECRET,
			limit: 1,
			v: '20170801'
		}
		}, function(err_f, res_f, body_f) {
			if (err_f) {
				res.json({success: false, message: message_error})
			} else {
				try {
					response_json = {};
					json = JSON.parse(body_f);
					response_json["success"] = true;
					response_json["venue"] = json.response.venue;
					res.json(response_json);
				} catch(error) {
					res.json({success: false, message: message_error})
				}
			}
		});
});

// Search category
router.get('/category/:categoryId', function(req, res){
	request({
		url: basepath + '/venues/search',
		method: 'GET',
		qs: {
			client_id: process.env.FQ_CLIENT_ID,
			client_secret: process.env.FQ_SECRET,
			categoryId: req.params.categoryId,
			limit: 15,
			ll: req.query.ll,
			v: '20170801'
		}
		}, function(err_f, res_f, body_f) {
			if (err_f) {
				res.json({success: false, message: message_error})
			} else {
				try {
					response_json = {};
					json = JSON.parse(body_f);
					response_json["success"] = true;
				console.log(json)
					response_json["venues"] = json.response.venues;
				res.json(response_json);
				} catch(error) {
					res.json({success: false, message: message_error})
				}
			}
		});
});

module.exports = router;
