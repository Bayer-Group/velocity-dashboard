const React = require("react")

const Title = require("./Title")
const Layout = require("./Layout")
const _ = require("lodash")
const { CSSTransitionGroup } = require("react-transition-group")
const AddWidgetPanel = require("./AddWidgetPanel")
const { DragDropContext } = require("react-dnd")
const HTML5Backend = require("react-dnd-html5-backend").default
const windowSize = require("react-window-size").default

const defaults = {
    widgetWidth: 250,
    widgetHeight: 250,
    margin: 15
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            moveMode: false
        }
    }

    displayName() {
        return "Dashboard"
    }

    // # optimize re-render to exclude width changes unless they affect column count
    shouldComponentUpdate(nextProps, nextState) {
        this.layout.reset(nextProps.componentWidthForTesting || nextState.componentWidth)
        const cc1 = this.layout.columnCount()
        this.layout.reset(this.state.componentWidth)

        const cc2 = this.layout.columnCount()
        return (
            nextProps !== this.props ||
            nextState.editMode !== this.state.editMode ||
            nextState.moveMode !== this.state.moveMode ||
            cc1 !== cc2
        )
    }

    childComponentsForConfig(components, config, editMode, moveMode, sizeConfig, columnCount,doneButtonClass) {
        const componentsById = getComponentsById(components)
        const instances = config.map((widget) => {
            if (componentsById[widget.widgetId]) {
                const withPositions = this.layout.setWidgetPosition(componentsById[widget.widgetId], widget.config)
                return React.cloneElement(withPositions, {
                    dashEditable: editMode,
                    draggable: moveMode,
                    key: widget.instanceId,
                    onConfigChange: this.configChange,
                    onHide: () => {
                        return this.hideWidget(widget.instanceId)
                    },
                    config: widget.config,
                    instanceId: widget.instanceId,
                    sizeConfig,
                    columnCount,
                    ErrorComponent: this.props.ErrorComponent,
                    onDrop: this.moveWidget,
                    doneButtonClass
                })
            }
        })

        return _.compact(instances)
    }

    toggleEditMode() {
        const newEditMode = !this.state.editMode
        this.setState({ editMode: newEditMode })
        if (!newEditMode) {
            this.setState({ moveMode: false })
        }
    }

    toggleMoveMode() {
        this.setState({ moveMode: !this.state.moveMode })
    }

    hideWidget(instanceId) {
        const allConfigs = [].concat(this.props.config)

        const index = _.findIndex(allConfigs, (config) => config.instanceId === instanceId)

        allConfigs.splice(index, 1)

        return this.props.onConfigChange(allConfigs)
    }

    configChange(instanceId, newConfig) {
        let allConfigs = [].concat(this.props.config)

        const index = _.findIndex(allConfigs, (config) => config.instanceId === instanceId)

        allConfigs[index] = {
            widgetId: allConfigs[index].widgetId,
            instanceId: instanceId,
            config: newConfig
        }

        return this.props.onConfigChange(allConfigs)
    }

    addWidget(id) {
        const config = [].concat(this.props.config)
        config.push({
            widgetId: id,
            instanceId: Math.floor(Math.random() * 100000),
            config: {}
        })
        return this.props.onConfigChange(config)
    }

    moveWidget(draggingWidgetId, targetWidgetId) {
        let config = [].concat(this.props.config)
        let targetIndex = _.findIndex(config, (widget) => widget.instanceId === targetWidgetId)
        const sourceIndex = _.findIndex(config, (widget) => widget.instanceId === draggingWidgetId)
        if (sourceIndex < targetIndex) {
            targetIndex--
        }

        config.splice(targetIndex, 0, config.splice(sourceIndex, 1)[0])
        return this.props.onConfigChange(config)
    }

    renderAddWidgets() {
        if (this.state.editMode && !this.state.moveMode) {
            const addPanelChildren = this.props.children.map((child) => {
                const preview = child.props.previewComp ? (
                    React.createElement(child.props.previewComp)
                ) : (
                    <div className="default-preview" key={child.props.id}>
                        No Preview
                    </div>
                )
                return (
                    <div className="widget-preview" key={child.props.id} onClick={() => this.addWidget(child.props.id)}>
                        <div className="no-click">{preview}</div>
                    </div>
                )
            })

            return <AddWidgetPanel>{addPanelChildren}</AddWidgetPanel>
        }
    }
    handleResize() {
        this.setState({
            componentWidth: window.innerWidth
        })
    }

    componentDidMount() {
        this.handleResize()
        window.addEventListener("resize", this.handleResize)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize)
    }

    render() {
        let {
            children,
            title,
            className,
            config,
            widgetHeight = defaults.widgetHeight,
            widgetWidth = defaults.widgetWidth,
            widgetMargin = defaults.margin,
            titleHeight = 50,
            maxColumns = 5,
            doneButtonClass=''
        } = this.props

        let { editMode, moveMode, componentWidth } = this.state

        children = [].concat(children)

        let sizeConfig = { widgetHeight, widgetWidth, widgetMargin, titleHeight, maxColumns }

        this.layout = new Layout(sizeConfig)
        this.layout.reset(this.props.componentWidthForTesting || componentWidth)

        let childrenForCurrentConfig = this.childComponentsForConfig(
            children,
            config,
            editMode,
            moveMode,
            sizeConfig,
            this.layout.columnCount(),
            doneButtonClass
        )

        let contentWidth = this.layout.columnCount() * (widgetWidth + widgetMargin) - widgetMargin

        if (this.layout.columnCount() === 1) {
            contentWidth = "90%"
        }

        return (
            <div className={`dashboard ${className} ${editMode && !moveMode ? "editing" : ""}`}>
                <Title height={titleHeight}>
                    {title}
                </Title>
                <div className={`edit-button ${editMode ? "editing" : ""}`} onClick={this.toggleEditMode}>
                    <i className="fa fa-cogs" />
                </div>
                {editMode ? (
                    <div className={`move-button ${moveMode ? "moving" : ""}`} onClick={this.toggleMoveMode}>
                        <i className="fa fa-arrows" />
                    </div>
                ) : null}
                <div className="dashboard-container">
                    <div
                        className={`dashboard-content columns-${this.layout.columnCount()}`}
                        style={{ width: contentWidth }}>
                        {childrenForCurrentConfig}
                    </div>
                </div>
                <CSSTransitionGroup
                    transitionName="widget-panel"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {this.renderAddWidgets()}
                </CSSTransitionGroup>
            </div>
        )
    }
}

module.exports = DragDropContext(HTML5Backend)(windowSize(Dashboard))
module.exports.defaults = defaults

const getComponentsById = (components) => {
    const byId = {}
    components.forEach((comp) => (byId[comp.props.id] = comp))
    return byId
}
