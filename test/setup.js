const chai = require("chai")
global.should = chai.should()
chai.use(require("chai-as-promised"))
chai.use(require("sinon-chai"))
global.sinon = require("sinon")
const {configure} = require('enzyme')
const Adapter = require('enzyme-react-adapter-future')

configure({adapter: new Adapter()})

// mocha re-executes every time so we need to create this lazily
if (!global.document) {
    const { jsdom } = require("jsdom")
    global.document = jsdom("<html><head></head><body></body></html>")
    global.window = document.defaultView
    global.navigator = window.navigator
}
