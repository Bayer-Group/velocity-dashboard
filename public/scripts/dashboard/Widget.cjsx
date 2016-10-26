React = require 'react'

module.exports = React.createClass

    displayName: 'Widget'

    propTypes:
        contentComp: React.PropTypes.func
        configComp: React.PropTypes.func
        previewComp: React.PropTypes.func

    getInitialState: ->
        editMode: false

    toggleEditMode: ->
        @setState editMode: !@state.editMode

    hide: ->

    render: ->
        {instanceId, height, width, col, row, dashEditable, config, onConfigChange, onHide, contentComp, configComp, sizeConfig, columnCount} = @props
        width = config?.width or width or 1
        height = config?.height or height or 1
        {editMode} = @state
        {widgetHeight, widgetWidth, widgetMargin, titleHeight} = sizeConfig

        styles =
            height: height * (widgetHeight + widgetMargin) - widgetMargin
            width: if columnCount is 1 then '100%' else width * (widgetWidth + widgetMargin) - widgetMargin
            left: Math.max(0, col * (widgetWidth + widgetMargin))
            top: row * (widgetHeight + widgetMargin)

        <div className="widget" style={styles}>
            {
                if dashEditable
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
                            <i className="fa fa-lg fa-cog background-watermark"></i>
                            {React.createElement(configComp, {instanceId, config, onConfigChange})}
                        </div>
                    else
                        <div/>
                else
                    if contentComp then React.createElement(contentComp, {instanceId, config}) else <div/>
            }
        </div>