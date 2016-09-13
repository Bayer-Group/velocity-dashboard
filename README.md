# Velocity Dashboard

Velocity Dashboard is a React component for presenting interactive dashboard components.  

<img src="https://monsantoco.github.io/velocity-dashboard/dashboard.png" width="50%" height="50%"/>

### Features

* Responsive design 
* User can add/remove instances 
* Allows multiple instances of each widget
* Widgets define relative height & width in the grid
* Configurable column and row height
* Easily re-styled

### Links

* [Interactive Demo](https://monsantoco.github.io/velocity-dashboard/dist/example.html)
* [Developers Notes](DEVELOPERS.md)

## Usage

### Prerequisites

The default style assumes font-awesome is installed.

Include the velocity-dashboard css in your page.

### Dashboard

For best results, use CSS to give the Dashboard a definable size (either via absolute positioning or by setting height/width).

```cjsx
getInitialState: ->
    config: [
        {
            widgetId: 'weather'
            instanceId: '1'
            config: location: 'orl'
        }
    ]

render: ->
    <Dashboard className='example-dash' title='Dashboard Title' 
            config={@state.config} onConfigChange={@configChange}>
        <Widget id='weather' contentComp={weatherWidget.Content} 
            configComp={weatherWidget.Config} previewComp={weatherWidget.Preview} />
        ...
    </Dashboard>
```

#### Properties

| property         | default | description  |
| ---------------- |:---:| -----|
| title            | -   | if provided, a title bar will be rendered at the top with the given text |
| config           | -   | (required) contains the widget instances and the configuration for the instances.  For the sake of usability, a reasonable initial value should be provided.  If not, the user will not have any widgets in the dashboard until they add them.  This data structure is what you would save in the user's preferences. |
| onConfigChange   | -   | fires when the user updates the widgets on the screen (by adding/removing them or by configuring one) |
| widgetHeight     | 250 | height of a single row in pixels |
| widgetWidth      | 250 | width of a single column in pixels |
| widgetMargin     | 15  | gap between widgets in pixels |
| titleHeight      | 50  | height of the title |
| maxColumns       | 5   | when displayed on a high-resolution (wide) screen, limit the number of columns to this value (for usability/ascetics) |
    
#### config

| property         | description  |
| ---------------- | ----- |
| widgetId            | (required) Reefers to the Widget's `id`.  |
| instanceId  | (required) Uniquely identifies the instance and is used as a React key. |
| config | Passed to the component as configuration |    
    
### Widget

Each Widget is simply three components representing the three states of a component and some configuration details:

```cjsx
<Widget id='days-since-accident'
    contentComp={-> <div className='days-since-last'><div className='days'>13</div><div className='text'>days since last accident</div></div>}
    previewComp={-> <div className='days-since-last preview'><div className='days'>100</div><div className='text'>days since last accident</div></div>}/>
```

#### Properties

| property         | default | description  |
| ---------------- |:---:| -----|
| id               | -   | Unique identifier for this widget.  Used to in the Dashboard state (referred to as `widgetId`). | 
| width            | 1   | The number of columns this Widget will span |
| height           | 1   | The number of rows this Widget will span |
| contentComp      | -   | The widget as normally displayed on the dashboard |
| previewComp      | -   | (optional) The widget as displayed in the 'add widget' panel (usually a simplified version which doesn't depend on external data).  While optional, the default is simply a 'No Preview' message.  A previewComp is recommended for all Widgets. |
| configComp      | -   | (optional) The configuration screen |
