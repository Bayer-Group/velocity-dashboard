React = require 'react'
{Chart} = require 'react-google-charts'
_ = require 'underscore'
chartColors = require('./ChartStyles').colors

pieData = [
    ['Task', 'Hours per Day']
    ['Work', 8]
    ['Eat', 2.5]
    ['Sleep', 8]
    ['Commute', 1.5]
    ['Television', 1.5]
]
pieOptions = {
    pieHole: 0.4
    legend:'none'
    pieSliceText: 'label'
    chartArea: {width: '90%', height: '90%'}
    colors: chartColors
    backgroundColor: 'transparent'
}

module.exports =
    Content: ->
        <div>
            <div className='widgetTitle'>My Average Day</div>
            <div className='widgetBody'>
                <Chart className='chart' chartType="PieChart" data={pieData} options={pieOptions} graph_id="PieChart" width={"100%"} height={"calc(100% - 5px)"} />
            </div>
        </div>
    Preview: ->
        <div>
            <div className='widgetTitle'>My Average Day</div>
            <div className='widgetBody'>
                <Chart className='chart' chartType="PieChart" data={pieData} options={_(enableInteractivity:false).extend(pieOptions)} graph_id="PieChartPreview" width={"100%"} height={"calc(100% - 5px)"} />
            </div>
        </div>

