const React = require("react")
const { Dashboard, Widget, Config, Content } = require("../dashboard")
const weatherWidget = require("./weatherWidget")
const pieChart = require("./PieChartExample")
const barChart = require("./BarChartExample")
const activityWidget = require("./ActivityExample")
const booleanWidget = require("./BooleanWidgetExample")

class DashboardExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            config: [
                { widgetId: "weather", instanceId: "1", config: { location: "orl" } },
                { widgetId: "accident", instanceId: "2" },
                { widgetId: "weather", instanceId: "3", config: { location: "stl" } },
                { widgetId: "activityLog", instanceId: "9" },
                { widgetId: "pie", instanceId: "4" },
                { widgetId: "barChart", instanceId: "5" },
                { widgetId: "thumbsUp", instanceId: "6" },
                { widgetId: "nothin", instanceId: "7" }
            ]
        }
    }

    displayName() {
        return "ExampleDashboard"
    }

    configChange(newConfig) {
        this.setState({ config: newConfig })
    }

    render() {
        return (
            <Dashboard
                className="example-dash"
                title="Dashboard Title"
                config={this.state.config}
                onConfigChange={this.configChange}
                widgetHeight={250}
                widgetWidth={250}
                widgetMargin={15}
                titleHeight={50}
                maxColumns={5}
                doneButtonClass='btn btn-primary'>
                <Widget
                    id="accident"
                    contentComp={() => (
                        <div className="days-since-last">
                            <div className="days">13</div>
                            <div className="text">days since last accident</div>
                        </div>
                    )}
                    previewComp={() => (
                        <div className="days-since-last preview">
                            <div className="days">100</div>
                            <div className="text">days since last accident</div>
                        </div>
                    )}
                />
                <Widget
                    id="weather"
                    contentComp={weatherWidget.Content}
                    configComp={weatherWidget.Config}
                    previewComp={weatherWidget.Preview}
                />
                <Widget id="pie" contentComp={pieChart.Content} previewComp={pieChart.Preview} />
                <Widget id="barChart" width="2" contentComp={barChart.Content} />
                <Widget id="thumbsUp" contentComp={booleanWidget.Content} previewComp={booleanWidget.Preview} />
                <Widget id="nothin" width="2" />
                <Widget id="anotherEmpty" />
                <Widget id="activityLog" height="2" contentComp={activityWidget.Content} />
                <Widget id="empty" />
                <Widget id="wideEmpty" width="2" />
            </Dashboard>
        )
    }
}

module.exports = DashboardExample
