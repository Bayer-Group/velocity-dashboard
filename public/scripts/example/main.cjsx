require('es6-promise').polyfill()
React = require 'react'
ReactDOM = require 'react-dom'
moment = require 'moment'
packageJson = require '../../../package.json'
DashboardExample = require './DashboardExample'

ReactDOM.render <div className='app-navbar'>MyApp</div>, document.querySelector('.nav')
ReactDOM.render <DashboardExample/>, document.querySelector('.contents')
