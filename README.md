
**analog - Instrumentation of the Node.js request object for analytics**

Makes it easy to collect data optimized for site analytics using whatever existing logging system you have.

**Usage**

''' js
var instrument = new (analog.Analog)();
var interaction_metadata = instrument.transform(request, response, response_body);
'''

The above results in a flat dictionary of request data like the one below:

{
request.socket.bufferSize=0,
request.socket.fd=8,
request.socket.type=tcp4,
request.socket.allowHalfOpen=true,
request.socket.destroyed=false,
request.socket.readable=true,
request.socket.writable=true,
request.socket.remoteAddress=64.119.130.114,
request.socket.remotePort=57001,
request.socket._idleTimeout=120000,
request.socket._idleStart=Thu Jun 02 2011 20:34:03 GMT+0000 (UTC),
request.connection.bufferSize=0,
request.connection.fd=8,
request.connection.type=tcp4,
request.connection.allowHalfOpen=true,
request.connection.destroyed=false,
request.connection.readable=true,
request.connection.writable=true,
request.connection.remoteAddress=64.119.130.114,
request.connection.remotePort=57001,
request.connection._idleTimeout=120000,
request.connection._idleStart=Thu Jun 02 2011 20:34:03 GMT+0000 (UTC),
request.httpVersion=1.1,
request.complete=true,
request.headers.host=some-dev-server.com:8000,
request.headers.connection=keep-alive,
request.headers.accept=*/*,
request.headers.user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.68 Safari/534.24,
request.headers.accept-encoding=gzip,deflate,sdch,
request.headers.accept-language=en-US,en;q=0.8,
request.headers.accept-charset=ISO-8859-1,utf-8;q=0.7,*;q=0.3,
request.headers.cookie=*******,
request.readable=true,
request.url=/,
request.method=GET,
request.client.bufferSize=0,
request.client.fd=8,
request.client.type=tcp4,
request.client.allowHalfOpen=true,
request.client.destroyed=false,
request.client.readable=true,
request.client.writable=true,
request.client.remoteAddress=64.119.130.114,
request.client.remotePort=57001,
request.client._idleTimeout=120000,
request.client._idleStart=Thu Jun 02 2011 20:34:03 GMT+0000 (UTC),
request.httpVersionMajor=1,
request.httpVersionMinor=1,
request.upgrade=false
}