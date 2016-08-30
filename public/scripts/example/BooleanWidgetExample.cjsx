React = require 'react'
_ = require 'underscore'
chartColors = require('./ChartStyles').colors

module.exports =
    Content: ->
        <div>
            <div className='widgetTitle'>System Status</div>
            <div className='widgetBody'>
                <i className="fa fa-thumbs-up"></i>
            </div>
        </div>
    Preview: ->
        <div>
            <div className='widgetTitle'>System Status</div>
            <div className='widgetBody'>
                <i className="fa fa-thumbs-up preview"></i>
            </div>
        </div>

