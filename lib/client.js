;(function() { 

	var 
		EventEmitter = require('events').EventEmitter
		, util = require('util')
		, request = require('request')
	;

	var Client = function Client(opts) {

		EventEmitter.call(this, opts);

	};

	util.inherits(Client, EventEmitter);

	Client.prototype.clientID = function clientID(id) {

		if(id) {

			this.clientID = id;
		}
		else {

			return this.clientID || undefined;
		}
	};

	module.exports = Client;

})();
