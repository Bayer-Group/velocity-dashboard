React = require 'react'
Title = require './Title'
Layout = require './Layout'
componentWidthMixin = require 'react-component-width-mixin'
_ = require 'underscore'
ReactCSSTransitionGroup = require 'react-addons-css-transition-group'
AddWidgetPanel = require './AddWidgetPanel'

defaults =
    widgetWidth: 250
    widgetHeight: 250
    margin: 15

module.exports = React.createClass

    displayName: 'Dashboard'

    mixins: [componentWidthMixin]

    # optimize re-render to exclude width changes unless they affect column count
    shouldComponentUpdate: (nextProps, nextState) ->
        @layout.reset(nextState.componentWidth)
        cc1 = @layout.columnCount()
        @layout.reset(@state.componentWidth)
        cc2 = @layout.columnCount()
        nextProps != @props or nextState.editMode != @state.editMode or cc1 != cc2

    getInitialState: ->
        editMode: false

    childComponentsForConfig: (components, config, editMode, sizeConfig, columnCount) ->
        componentsById = getComponentsById(components)
        instances = config.map (widget) =>
            if componentsById[widget.widgetId]
                withPositions = @layout.setWidgetPosition(componentsById[widget.widgetId], widget.config)
                React.cloneElement withPositions,
                    dashEditable: editMode
                    key: widget.instanceId
                    onConfigChange: @configChange
                    onHide: => @hideWidget(widget.instanceId)
                    config: widget.config
                    instanceId: widget.instanceId
                    sizeConfig: sizeConfig
                    columnCount: columnCount
        _(instances).compact()

    toggleEditMode: ->
        @setState editMode: !@state.editMode

    hideWidget: (instanceId) ->
        allConfigs = [].concat @props.config

        index = _(allConfigs).findIndex (config) ->
            config.instanceId is instanceId

        allConfigs.splice(index, 1)

        @props.onConfigChange allConfigs

    configChange: (instanceId, newConfig) ->
        allConfigs = [].concat @props.config

        index = _(allConfigs).findIndex (config) ->
            config.instanceId is instanceId

        allConfigs[index] =
            widgetId: allConfigs[index].widgetId
            instanceId: instanceId
            config: newConfig

        @props.onConfigChange allConfigs

    addWidget: (id) ->
        config = [].concat @props.config
        config.push
            widgetId: id
            instanceId: Math.floor(Math.random() * 100000)
            config: {}
        @props.onConfigChange config


    render: ->
        {children, title, className, config, widgetHeight = defaults.widgetHeight, widgetWidth = defaults.widgetWidth, widgetMargin = defaults.margin, titleHeight = 50, maxColumns = 5} = @props
        {editMode, componentWidth} = @state
        children = [].concat(children)
        sizeConfig = {widgetHeight, widgetWidth, widgetMargin, titleHeight, maxColumns}

        @layout = layout = new Layout(sizeConfig)
        layout.reset(componentWidth)
        childrenForCurrentConfig = @childComponentsForConfig(children, config, editMode, sizeConfig, layout.columnCount())

        contentWidth = layout.columnCount() * (widgetWidth + widgetMargin) - widgetMargin
        if layout.columnCount() is 1
            contentWidth = '90%'

        <div className={"dashboard #{className} #{if editMode then 'editing' else ''}"}>
            <Title height={titleHeight}>{title}</Title>
            <div className="edit-button #{if editMode then 'editing' else ''}" onClick={@toggleEditMode}>
                <i className="fa fa-cogs" />
            </div>
            <div className='dashboard-container' style={top: titleHeight}>
                <div className={"dashboard-content columns-#{layout.columnCount()}"} style={width: contentWidth}>
                    {childrenForCurrentConfig}
                </div>
            </div>
            <ReactCSSTransitionGroup transitionName="widget-panel" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionEnter={true} transitionLeave={true}>
            {
                if editMode
                    addPanelChildren = children.map (child) =>
                        preview = if child.props.previewComp then React.createElement(child.props.previewComp) else <div className='default-preview' key={child.props.id}>No Preview</div>
                        <div className='widget-preview' key={child.props.id} onClick={=>@addWidget(child.props.id)}>{preview}</div>
                    <AddWidgetPanel>{addPanelChildren}</AddWidgetPanel>
            }
            </ReactCSSTransitionGroup>
        </div>

module.exports.defaults = defaults

getComponentsById = (components) ->
    byId = {}
    components.forEach (comp) ->
        byId[comp.props.id] = comp
    byId
