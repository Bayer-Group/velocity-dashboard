React = require 'react'
{expect, assert} = require 'chai'
{shallow, mount} = require 'enzyme'
proxyquire = require 'proxyquire'
{defaults} = require '../public/scripts/dashboard/Dashboard'
sinon = require 'sinon'

lessVariables =
    baseWidgetWidth_num: 100
    widgetMargin_num: 100
    '@noCallThru': true

colWidth = defaults.widgetWidth + defaults.margin
rowHeight = defaults.widgetHeight + defaults.margin

proxyquire('../public/scripts/dashboard/Layout', { './lessVariableLoader!../../styles/dashboard.less': lessVariables })
proxyquire('../public/scripts/dashboard/Dashboard', { './lessVariableLoader!../../styles/dashboard.less': lessVariables })

onConfigChange = {}

describe 'dashboard', ->

    beforeEach ->
        global.getComputedStyle = ->
            getPropertyCSSValue: ->
        onConfigChange = sinon.stub()

    it "displays components in the correct order (assuming they all fit)", ->
        {widgets: [widget1, widget2, widget3]} = createDash(columns: 3, widgets: ['narrow1', 'narrow2', 'narrow1'])
        positionOf(widget1).should.eql [0, 0]
        positionOf(widget2).should.eql [colWidth, 0]
        positionOf(widget3).should.eql [colWidth * 2, 0]

    it "skips spaces if component doesn't fit", ->
        {widgets: [widget1, widget2, widget3]} = createDash(columns: 3, widgets: ['narrow1', 'wide1', 'wide1'])
        positionOf(widget1).should.eql [0, 0]
        positionOf(widget2).should.eql [0, rowHeight]
        positionOf(widget3).should.eql [0, rowHeight * 2]

    it "fills in empty spaces with smaller components", ->
        {widgets: [widget1, widget2, widget3]} = createDash(columns: 3, widgets: ['narrow1', 'wide1', 'narrow1'])
        positionOf(widget1).should.eql [0, 0]
        positionOf(widget2).should.eql [0, rowHeight]
        positionOf(widget3).should.eql [colWidth, 0]

    it "shows add panel when in edit mode", ->
        {dash} = createDash(columns: 3, widgets: ['narrow1', 'wide1', 'wide1'])
        expect(dash.find('.add-widget-panel').length).to.eql 0
        dash.find('.fa-cogs').simulate('click')
        expect(dash.find('.add-widget-panel').length).to.eql 1

    it "allows the user to edit a widget's configuration", ->
        {dash} = createDash(columns: 3, widgets: ['narrow1', 'wide1', 'wide1'])
        dash.find('.fa-cogs').simulate('click')
        dash.find('.widget-preview').first().simulate('click')
        expect(onConfigChange.calledOnce).to.eql true
        args = onConfigChange.firstCall.args
        expect(args[0].length).to.eql 4
        expect(args[0][3].widgetId).to.eql 'narrow1'

    it "allows the user to hide a component", ->
        {dash} = createDash(columns: 3, widgets: ['narrow1', 'wide1', 'wide1'])
        dash.find('.fa-cogs').simulate('click')
        dash.find('.hide-widget-button').first().simulate('click')
        expect(onConfigChange.calledOnce).to.eql true
        args = onConfigChange.firstCall.args
        expect(args[0].length).to.eql 2

    it "reorders at smaller resolutions", ->
        {dash, widgets: [widget1, widget2, widget3]} = createDash(columns: 3, widgets: ['narrow1', 'narrow1', 'narrow1'])
        dash.setState componentWidth: 400
        positionOf(widget1).should.eql [0, 0]
        positionOf(widget2).should.eql [0, rowHeight]
        positionOf(widget3).should.eql [0, rowHeight * 2]

    createDash = ({columns, widgets}) ->
        config = [
            {widgetId: widgets[0], instanceId: 'a'}
            {widgetId: widgets[1], instanceId: 'b'}
            {widgetId: widgets[2], instanceId: 'c'}
        ]
        {Dashboard, Widget} = require '../public/scripts/dashboard/'
        dash = mount(
            <Dashboard title='Dashboard Title' config={config} onConfigChange={onConfigChange} maxColumns={columns}>
                <Widget width='1' height='1' id='narrow1' contentComp={-><div>narrow1</div>} />
                <Widget width='1' height='1' id='narrow2' contentComp={-><div>narrow2</div>} />
                <Widget width='3' height='1' id='wide1' contentComp={-><div>wide1</div>} />
            </Dashboard>
        )
        dash.setState componentWidth: 1000
        #console.info dash.html()
        widgets = dash.find('.widget')
        {dash, widgets: [widgets.at(0), widgets.at(1), widgets.at(2)]}

    positionOf = (widget) ->
        [widget.props().style.left, widget.props().style.top]

