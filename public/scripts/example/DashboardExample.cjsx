React = require 'react'
{Dashboard, Widget, Config, Content} = require '../dashboard'
weatherWidget = require './weatherWidget'
_ = require 'underscore'
pieChart = require './PieChartExample'
barChart = require './BarChartExample'
activityWidget = require './ActivityExample'
booleanWidget = require './BooleanWidgetExample'

module.exports = React.createClass

    displayName: 'ExampleDashboard'

    getInitialState: ->
        config: [
            {
                widgetId: 'weather'
                instanceId: '1'
                config: location: 'orl'
            }
            {widgetId: 'a', instanceId: '2'}
            {
                widgetId: 'weather'
                instanceId: '3'
                config: location: 'stl'
            }
            {widgetId: 'g', instanceId: '9'}
            {widgetId: 'b', instanceId: '4'}
            {widgetId: 'c', instanceId: '5'}
            {widgetId: 'd', instanceId: '6'}
            {widgetId: 'e', instanceId: '7'}
        ]

    configChange: (newConfig) ->
        @setState config: newConfig

    render: ->
        <Dashboard className='example-dash' title='Dashboard Title' config={@state.config} onConfigChange={@configChange} widgetHeight={250} widgetWidth={250} widgetMargin={15} titleHeight={50} maxColumns={5}>
            <Widget id='a'
                contentComp={-> <div className='days-since-last'><div className='days'>13</div><div className='text'>days since last accident</div></div>}
                previewComp={-> <div className='days-since-last preview'><div className='days'>100</div><div className='text'>days since last accident</div></div>}/>
            <Widget id='weather' contentComp={weatherWidget.Content} configComp={weatherWidget.Config} previewComp={weatherWidget.Preview} />
            <Widget id='b' contentComp={pieChart.Content} previewComp={pieChart.Preview} />
            <Widget width="2" id='c' contentComp={barChart.Content} />
            <Widget id='d' contentComp={booleanWidget.Content} previewComp={booleanWidget.Preview} />
            <Widget width="2" id='e' />
            <Widget id='f' />
            <Widget height="2" id='g' contentComp={activityWidget.Content}/>
            <Widget id='j' />
            <Widget width="2" id='i' />
        </Dashboard>