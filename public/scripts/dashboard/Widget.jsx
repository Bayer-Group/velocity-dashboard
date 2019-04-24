const React = require("react")
const { drop, target, collectDropTarget, ItemTypes, widgetSource, collectDragable } = require("./dnd")
const { DropTarget, DragSource } = require("react-dnd")
const _ = require('lodash')

class Widget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            currentError: null
        }
    }

    displayName() {
        return "Widget"
    }

    static propTypes() {
        return {
            contentComp: React.PropTypes.func,
            configComp: React.PropTypes.func,
            previewComp: React.PropTypes.func
        }
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.dashEditable && this.state.editMode) {
            this.setState({ editMode: false })
        }
    }

    hide() {}

    renderEditButton() {
        const { dashEditable, draggable, configComp, onHide, doneButtonClass } = this.props
        if (dashEditable && !draggable) {
            if (this.state.editMode) {
                return (
                    <a className={`edit-widget-button close-button ${doneButtonClass}`} onClick={this.toggleEditMode}>
                        done
                    </a>
                )
            }
            return (
                <div className="edit-overlay">
                    {configComp ? <i className="fa fa-cog edit-widget-button" onClick={this.toggleEditMode} /> : null}
                    <i className="fa fa-times hide-widget-button" onClick={onHide} />
                </div>
            )
        }
    }

    componentDidCatch(error, info) {
        this.setState({currentError: error})
        console.error(error, info)
    }

    renderComponent() {
        const { config, instanceId, onConfigChange, dashEditable, configComp, contentComp } = this.props
        if (this.state.currentError) {
            return this.props.ErrorComponent ? <this.props.ErrorComponent error={this.state.currentError}/> :
                <div>Error</div>
        }
        if (dashEditable && this.state.editMode) {
            if (configComp) {
                return (
                    <div>
                        <div className="config-comp">
                            {React.createElement(configComp, {
                                instanceId,
                                config,
                                onConfigChange
                            })}
                        </div>
                        <i className="fa fa-lg fa-cog background-watermark" />
                    </div>
                )
            } else {
                return <div />
            }
        } else {
            if (contentComp) {
                return React.createElement(contentComp, { instanceId, config })
            } else {
                return <div />
            }
        }
    }
    render() {
        let {
            height,
            width,
            col,
            row,
            draggable,
            config,
            sizeConfig,
            columnCount,
            connectDragSource,
            connectDropTarget,
            isOver,
            doneButtonClass
        } = this.props
        width = _.get(config, "width", width) || 1
        height = _.get(config, "height", height) || 1
        const { widgetHeight, widgetWidth, widgetMargin } = sizeConfig

        const styles = {
            height: height * (widgetHeight + widgetMargin) - widgetMargin,
            width: columnCount === 1 ? "100%" : width * (widgetWidth + widgetMargin) - widgetMargin,
            left: Math.max(0, col * (widgetWidth + widgetMargin)),
            top: row * (widgetHeight + widgetMargin)
        }

        const classes = ["widget"]
        if (draggable) classes.push("draggable")

        if (isOver) classes.push("drag-over")

        const rendered = (
            <div className={classes.join(" ")} style={styles}>
                {isOver ? <div className="drop-prompt" style={{ height: widgetHeight }} /> : null}
                <div className="widget-inner">
                    {draggable ? <div className="dragbar" /> : null}
                    {this.renderEditButton()}
                    {this.renderComponent()}
                </div>
            </div>
        )

        return draggable ? connectDragSource(connectDropTarget(rendered)) : rendered
    }
}

module.exports = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable)(
    DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(Widget)
)
