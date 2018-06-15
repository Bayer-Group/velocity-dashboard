const React = require("react")
const _ = require("lodash")

const hardCodedWeather = {
    stl: {
        name: "St Louis",
        weather: "wi-day-lightning"
    },
    orl: {
        name: "Orlando",
        weather: "wi-day-cloudy"
    },
    lax: {
        name: "Los Angeles",
        weather: "wi-day-sunny"
    }
}

module.exports = {
    Content: (props) => {
        const weather = hardCodedWeather[props.config.location || "stl"]
        return (
            <div className="weather-example">
                <div className="city">{weather.name}</div>
                <i className={`wi ${weather.weather}`} />
            </div>
        )
    },
    Config: ({ instanceId, config, onConfigChange }) => {
        const selectionChanged = (e) => {
            return onConfigChange(instanceId, { location: e.target.value })
        }

        return (
            <div className="weather-example-config">
                <div className="city">Choose City</div>
                <select className="form-control" onChange={selectionChanged} value={config.location}>
                    {_.keys(hardCodedWeather).map((code) => (
                        <option key={code} value={code}>
                            {hardCodedWeather[code].name}
                        </option>
                    ))}
                </select>
            </div>
        )
    },
    Preview: (props) => (
        <div className="weather-example preview">
            <div className="city">Some City</div>
            <i className="wi wi-day-lightning" />
        </div>
    )
}
