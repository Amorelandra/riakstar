var 
	HTTPClient = require('./http-client')
;

module.exports = {

	getClient : function getClient(opts) {

		return new HTTPClient(opts);
	}
}