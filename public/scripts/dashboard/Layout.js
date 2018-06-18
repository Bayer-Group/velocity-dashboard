let Positioner;
const React = require('react');

module.exports = (Positioner = (function() {
    Positioner = class Positioner {
        static initClass() {
            this.prototype._currentGrid = [];
            this.prototype._columnCount = 4;
        }

        constructor(sizeConfig) {
            this.sizeConfig = sizeConfig;
        }

        reset(dashboardWidth) {
            const maxWidthForColumnCount = colCount => {
                return ((this.sizeConfig.widgetWidth + this.sizeConfig.widgetMargin) * colCount) + 100;
            };
            this._currentGrid = [];
            let columnCount = this.sizeConfig.maxColumns;
            while (dashboardWidth < maxWidthForColumnCount(columnCount)) {
                columnCount--;
            }
            return this._columnCount = Math.max(1, columnCount);
        }

        cellIsEmpty({row, col}) {
            return !(this._currentGrid[row] != null ? this._currentGrid[row][col] : undefined);
        }

        getAllCellsFor({height, width}, row, col, config) {
            width = Math.min(parseInt((config != null ? config.width : undefined) || width || 1), this._columnCount);
            height = parseInt((config != null ? config.height : undefined) || height || 1);
            let outOfBounds = false;
            const cells = [];
            for (let h = row, end = (row+height)-1, asc = row <= end; asc ? h <= end : h >= end; asc ? h++ : h--) {
                for (let w = col, end1 = (col+width)-1, asc1 = col <= end1; asc1 ? w <= end1 : w >= end1; asc1 ? w++ : w--) {
                    cells.push({row: h, col: w});
                    if (w >= this._columnCount) {
                        outOfBounds = true;
                    }
                }
            }
            if (outOfBounds) { return []; } else { return cells; }
        }

        fitsInGrid(widget, row, col, config) {
            const cells = this.getAllCellsFor(widget.props, row, col, config);
            return (cells.length > 0) && cells.every(cell => {
                return this.cellIsEmpty(cell);
            });
        }

        markGridAsUsed(widget, row, col, config) {
            const cells = this.getAllCellsFor(widget.props, row, col, config);
            return cells.forEach(cell => {
                if (!this._currentGrid[cell.row]) { this._currentGrid[cell.row] = []; }
                return this._currentGrid[cell.row][cell.col] = 'x';
            });
        }

        setWidgetPositionInRow(widget, row, config) {
            let updatedWidget = null;
            for (let col = 0, end = this._columnCount-1, asc = 0 <= end; asc ? col <= end : col >= end; asc ? col++ : col--) {
                if (this.fitsInGrid(widget, row, col, config)) {
                    this.markGridAsUsed(widget, row, col, config);
                    updatedWidget = React.cloneElement(widget, {col, row});
                    break;
                }
            }
            return updatedWidget;
        }

        setWidgetPosition(widget, config) {
            let updatedWidget = null;
            let row = 0;
            while (!updatedWidget) {
                if (!this._currentGrid[row]) {
                    !(this._currentGrid[row] = []);
                }
                updatedWidget = this.setWidgetPositionInRow(widget, row, config);
                row++;
            }
            return updatedWidget;
        }

        columnCount() {
            return this._columnCount;
        }

        rowCount() {
            return this._currentGrid.length;
        }
    };
    Positioner.initClass();
    return Positioner;
})());

