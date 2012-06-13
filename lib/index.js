;(function() { 

	var 
		HTTPClient = require('./http-client')
	;

	fn = function callbackWrapper(cb) {
		
		return typeof cb === "function" ? 
			cb : 
			function() { }
		;
	};


	module.exports = {

		getClient : function getClient(opts) {

			return new HTTPClient(opts);
		}
	}
	
})();
