module.exports = {
    ItemTypes: {
        WIDGET: "widget"
    },
    widgetSource: {
        beginDrag: (props) => {
            return {
                id: props.instanceId
            }
        }
    },
    collectDragable: (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        }
    },
    target: {
        drop: (props, monitor) => {
            return props.onDrop(monitor.getItem().id, props.instanceId)
        }
    },
    collectDropTarget: (connect, monitor) => {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        }
    }
}
