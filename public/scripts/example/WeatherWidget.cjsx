React = require 'react'
_ = require 'underscore'

hardCodedWeather =
    stl:
        name: 'St Louis'
        weather: 'wi-day-lightning'
    orl:
        name: 'Orlando'
        weather: 'wi-day-cloudy'
    lax:
        name: 'Los Angeles'
        weather: 'wi-day-sunny'

module.exports =

    Content: (props) ->
        weather = hardCodedWeather[props.config.location or 'stl']
        <div className='weather-example'>
            <div className='city'>{weather.name}</div>
            <i className={"wi #{weather.weather}"}></i>
        </div>

    Config: ({instanceId, config, onConfigChange}) ->
        selectionChanged = (e) ->
            onConfigChange instanceId, {location: e.target.value}

        <div className='weather-example-config'>
            <div className='city'>Choose City</div>
            <select className='form-control' onChange={selectionChanged} value={config.location}>
                {
                    _(hardCodedWeather).keys().map (code) ->
                        <option key={code} value={code}>{hardCodedWeather[code].name}</option>
                }
            </select>
        </div>

    Preview: (props) ->
        <div className='weather-example preview'>
            <div className='city'>Some City</div>
            <i className='wi wi-day-lightning'/>
        </div>
