const React = require("react")
const { Chart } = require("react-google-charts")
const chartColors = require("./ChartStyles").colors

const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350]
]

const pieOptions = {
    legend: "none",
    chartArea: { width: "90%", height: "75%" },
    colors: chartColors,
    backgroundColor: "transparent",
    hAxis: {
        textPosition: "out"
    },
    vAxis: {
        textPosition: "none"
    }
}

module.exports = {
    Content: () => (
        <div>
            <div className="widgetTitle">Numbers by Date</div>
            <div className="widgetBody">
                <Chart
                    className="chart"
                    chartType="ColumnChart"
                    data={data}
                    options={pieOptions}
                    graph_id="BarChart"
                    width={"100%"}
                    height={"100%"}
                />
            </div>
        </div>
    )
}
