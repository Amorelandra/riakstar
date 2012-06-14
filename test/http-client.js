var 
	vows = require('vows')
	, assert = require('assert')
	, rs = require('../lib')
	, crypto = require('crypto')
	, events = require('events')
	, randomHex = function(bytes) {

		return crypto.randomBytes(bytes).toString('hex')
	}
	, bucket = randomHex(4)
	, key = randomHex(8)
	, data = {

		key : randomHex(2)
	}
	, clientID
;

vows.describe('HTTP Client').addBatch({

	'Create client' : {

		'with no parameters' : {

			topic : function() { 

				return rs.getClient();
			}
			, 'default configuration' : {

				'clientID is valid string' : function(topic) {

					assert.isString(topic.options.clientID);
				}
				, 'clientID matches default pattern' : function(topic) {

					assert.match(topic.options.clientID
					, /^riakstar-[a-z0-9]{8}$/);

					clientID = topic.options.clientID;
				}
				, 'host URI matches default' : function(topic) {

					assert.equal(topic.options.host
						, 'http://127.0.0.1:8098');
				}

			}
		}
	}
	, 'Save object' : {

		topic : function() {

			var 
				client = rs.getClient()
			;

			client.save(bucket, key, data, {}, this.callback);
		}
		, 'successfully called' : function(err, res) {

			assert.isNull(err);
			assert.isObject(res);
		}
		, 'database stored' : function(err, res) {

			assert.include([200, 204], res.statusCode);
		}
		, 'client ID present in request' : function(err, res) {

			assert.isString(res.request.headers['X-Riak-ClientId']);
		}
		, 'Get object' : {

			topic : function() {

				var 
					client = rs.getClient()
				;

				client.get(bucket, key, this.callback);
			}
			, 'successfully called' : function(err, dat, res) {

				assert.isNull(err);
				assert.isObject(res);
			}
			, 'returned json' : function(err, dat, res) {

				assert.equal(res.headers['content-type'], 'application/json');
			}
			, 'matches saved object' : function(err, dat, res) {

				assert.deepEqual(data, JSON.parse(dat));

			}
			, 'Delete object' : {

				topic : function() {

					var
						client = rs.getClient()
					;

					client.remove(bucket, key, this.callback);
				}
				, 'successfully called' : function(err, res) {

					assert.isNull(err);
					assert.isObject(res);
				}
			}
 		}
	}
}).export(module);