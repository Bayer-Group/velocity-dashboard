const React = require("react")
const chartColors = require("./ChartStyles").colors

module.exports = {
    Content: () => (
        <div>
            <div className="widgetTitle">System Status</div>
            <div className="widgetBody">
                <i className="fa fa-thumbs-up" />
            </div>
        </div>
    ),
    Preview: () => (
        <div>
            <div className="widgetTitle">System Status</div>
            <div className="widgetBody">
                <i className="fa fa-thumbs-up preview" />
            </div>
        </div>
    )
}
