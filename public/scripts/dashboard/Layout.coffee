React = require 'react'

module.exports = class Positioner
    _currentGrid: []
    _columnCount: 4

    constructor: (@sizeConfig) ->

    reset: (dashboardWidth) ->
        maxWidthForColumnCount = (colCount) =>
            ((@sizeConfig.widgetWidth + @sizeConfig.widgetMargin) * colCount) + 100
        @_currentGrid = []
        columnCount = @sizeConfig.maxColumns
        while dashboardWidth < maxWidthForColumnCount(columnCount)
            columnCount--
        @_columnCount = columnCount

    cellIsEmpty: ({row, col}) ->
        !@_currentGrid[row]?[col]

    getAllCellsFor: ({height = 1, width = 1}, row, col) ->
        width = Math.min(parseInt(width), @_columnCount)
        height = parseInt(height)
        outOfBounds = false
        cells = []
        for h in [row..row+height-1]
            for w in [col..col+width-1]
                cells.push {row: h, col: w}
                if w >= @_columnCount
                    outOfBounds = true
        if outOfBounds then return [] else cells

    fitsInGrid: (widget, row, col) ->
        cells = @getAllCellsFor(widget.props, row, col)
        cells.length > 0 and cells.every (cell) =>
            @cellIsEmpty(cell)

    markGridAsUsed: (widget, row, col) ->
        cells = @getAllCellsFor(widget.props, row, col)
        cells.forEach (cell) =>
            @_currentGrid[cell.row] = [] if not @_currentGrid[cell.row]
            @_currentGrid[cell.row][cell.col] = 'x'

    setWidgetPositionInRow: (widget, row) ->
        updatedWidget = null
        for col in [0..@_columnCount-1]
            if @fitsInGrid(widget, row, col)
                @markGridAsUsed(widget, row, col)
                updatedWidget = React.cloneElement widget, {col, row}
                break
        updatedWidget

    setWidgetPosition: (widget) ->
        updatedWidget = null
        row = 0
        while !updatedWidget
            if !@_currentGrid[row]
                !@_currentGrid[row] = []
            updatedWidget = @setWidgetPositionInRow(widget, row)
            row++
        updatedWidget

    columnCount: ->
        @_columnCount

