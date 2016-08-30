chai = require 'chai'
global.should = chai.should()
chai.use require('chai-as-promised')
chai.use require('sinon-chai')
global.sinon = require 'sinon'
require 'sinon-as-promised'

# mocha re-executes every time so we need to create this lazily
if not global.document
    {jsdom} = require 'jsdom'
    global.document = jsdom '<html><head></head><body></body></html>'
    global.window = document.defaultView
    global.navigator = window.navigator