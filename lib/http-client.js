;(function() {

	var 
		EventEmitter = require('events').EventEmitter
		, request = require('request')
		, Client = require('./client')
		, qs = require('querystring')
		, crypto = require('crypto')
		, util = require('util')
		, url = require('url')
	;

	var httpVerbs = [

		"GET"
		, "PUT"
		, "POST"
		, "DELETE"
		, "HEAD"
	];

	var HTTPClient = function HTTPClient(opts) {

		Client.call(this, opts);

		this.options = (typeof opts === 'object' ? opts : {});
		if((typeof opts == 'string') && (opts.split('.').length > 1)) {

			this.options.host = opts;
		};
		this.options.clientID = 
			this.options.clientID || 
			'riakstar-' + crypto.randomBytes(4).toString('hex')
		;
		this.options.host = parseHostString(this.options.host);

	};

	util.inherits(HTTPClient, EventEmitter);

	/**
	* Build a URI for a bucket (and key if provided)
	*/
	var buildURI = function buildURI(bucket, key) {

		var ret = [ 

			this.options.host
			, 'riak'
			, qs.escape(bucket)
		];
		ret.push(key ? qs.escape(key) : null);

		return ret.join('/');
	};

	/**
	* Build headers for an HTTP request
	*/

	var buildHeaders = function buildHeaders(headers) {

		// don't worry about content-type, request should do that
		if(!headers) {

			var headers = {};
			headers['X-Riak-ClientId'] = this.options.clientID;
		}

		return headers;
	};

	/**
	* Parse the host provided in options and return
	* a properly formatted uri
	*/
	var parseHostString = function parseHostString(host) {

		var 
			parsed = url.parse(host || '') || undefined
			, ret = {}
		;

		ret.protocol = parsed.protocol || 'http';
		ret.hostname = parsed.host || '127.0.0.1' 
		ret.port = parsed.port || '8098';

		return url.format(ret);
	};

	// TODO : Refactor this with some sort of base request method

	HTTPClient.prototype.get = function get(bucket, key, cb) {

		request({

			method : 'GET'
			, uri : buildURI.call(this, bucket, key)
			, headers : buildHeaders.call(this)
		}, function(err, res, body) {

			fn(cb)(err, body, res); 
		});
	};

	HTTPClient.prototype.save = function save(bucket, key, data, meta, cb) {

		// TODO : Proper meta object parsing
		
		request({

			method : 'PUT'
			, uri : buildURI.call(this, bucket, key)
			, headers : buildHeaders.call(this)
			, json : data
		}, function(err, res, body) {

			fn(cb)(err, res);
		});
	};

	HTTPClient.prototype.remove = function remove(bucket, key, cb) {

		request({

			method : 'DELETE'
			, uri : buildURI.call(this, bucket, key)
			, headers : buildHeaders.call(this)
		}, function(err, res) {

			fn(cb)(err, res);
		});
	};

	module.exports = HTTPClient;

})();
