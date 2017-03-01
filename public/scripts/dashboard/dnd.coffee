module.exports =
    ItemTypes:
        WIDGET: 'widget'
    widgetSource:
        beginDrag: (props) ->
            {id: props.instanceId}
    collectDragable: (connect, monitor) ->
        connectDragSource: connect.dragSource()
        isDragging: monitor.isDragging()
    target:
        drop: (props, monitor) ->
            props.onDrop(monitor.getItem().id, props.instanceId)
    collectDropTarget: (connect, monitor) ->
        connectDropTarget: connect.dropTarget()
        isOver: monitor.isOver()
