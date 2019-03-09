const querystring = require('querystring')

querystring.parse('a=1&b=2')
querystring.stringify({a:1,b:2})