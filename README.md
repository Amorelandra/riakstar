riakstar
========

##### bad-ass ninja rock star Riak client for Node.js

The web scale database client of the future is here (partially).

## NOT REALLY THAT FUNCTIONAL YET :)

Current Capabilities:

 - `get(bucket, key, callback)`
 - `save(bucket, key, data, meta, callback)`
 - `remove(bucket, key,callback)`

Callbacks receive `err`, `res`, and sometimes `body` (as with get).

_NOTE:_ meta data is not yet properly parsed/stored

### MIT LICENSE

Copyright (C) 2012 Emily Rose

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
