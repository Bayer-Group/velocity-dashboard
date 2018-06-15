require("es6-promise").polyfill()
const React = require("react")
const ReactDOM = require("react-dom")

const DashboardExample = require("./DashboardExample")

ReactDOM.render(
    <div className="app-navbar">MyApp</div>,
    document.querySelector(".nav")
)
ReactDOM.render(<DashboardExample />, document.querySelector(".contents"))
