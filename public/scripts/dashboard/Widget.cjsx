React = require 'react'
{drop, target, collectDropTarget, ItemTypes, widgetSource, collectDragable} = require './dnd'
{DropTarget, DragSource} = require 'react-dnd'

Widget = React.createClass

    displayName: 'Widget'

    propTypes:
        contentComp: React.PropTypes.func
        configComp: React.PropTypes.func
        previewComp: React.PropTypes.func

    getInitialState: ->
        editMode: false

    toggleEditMode: ->
        @setState editMode: !@state.editMode

    componentWillReceiveProps: (nextProps) ->
        if !nextProps.dashEditable and @state.editMode
            @setState editMode: false

    hide: ->

    render: ->
        {instanceId, height, width, col, row, dashEditable, draggable, config, onConfigChange, onHide, contentComp, configComp, sizeConfig, columnCount} = @props
        {connectDragSource, isDragging, connectDropTarget, isOver} = @props
        width = config?.width or width or 1
        height = config?.height or height or 1
        {editMode} = @state
        {widgetHeight, widgetWidth, widgetMargin, titleHeight} = sizeConfig

        styles =
            height: height * (widgetHeight + widgetMargin) - widgetMargin
            width: if columnCount is 1 then '100%' else width * (widgetWidth + widgetMargin) - widgetMargin
            left: Math.max(0, col * (widgetWidth + widgetMargin))
            top: row * (widgetHeight + widgetMargin)

        classes = ['widget']
        classes.push 'draggable' if draggable
        classes.push 'drag-over' if isOver

        rendered =
            <div className={classes.join(' ')} style={styles}>
                {
                    if isOver
                        <div className='drop-prompt' style={height: widgetHeight}/>
                }
                <div className='widget-inner'>
                    {
                        if draggable
                            <div className='dragbar'></div>
                    }
                    {
                        if dashEditable and !draggable
                            if editMode
                                <a className="edit-widget-button close-button" onClick={@toggleEditMode}>done</a>
                            else
                                <span>
                                    {<i className="fa fa-cog edit-widget-button" onClick={@toggleEditMode}></i> if configComp}
                                    <i className="fa fa-times hide-widget-button" onClick={onHide}></i>
                                </span>
                    }
                    {
                        comp = if dashEditable and editMode
                            if configComp
                                <div>
                                    <div className='config-comp'>{React.createElement(configComp, {instanceId, config, onConfigChange})}</div>
                                    <i className="fa fa-lg fa-cog background-watermark"></i>
                                </div>
                            else
                                <div/>
                        else
                            if contentComp then React.createElement(contentComp, {instanceId, config}) else <div/>
                    }
                </div>
            </div>

        if draggable
            connectDragSource(connectDropTarget(rendered))
        else
            rendered

module.exports = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable)(DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(Widget))