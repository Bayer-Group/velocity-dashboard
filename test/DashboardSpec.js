const React = require("react")
const { expect } = require("chai")
const { mount } = require("enzyme")
const proxyquire = require("proxyquire")
const { defaults } = require("../public/scripts/dashboard/Dashboard")

const lessVariables = {
    baseWidgetWidth_num: 100,
    widgetMargin_num: 100,
    "@noCallThru": true
}

const colWidth = defaults.widgetWidth + defaults.margin
const rowHeight = defaults.widgetHeight + defaults.margin

proxyquire("../public/scripts/dashboard/Layout", { "./lessVariableLoader!../../styles/dashboard.less": lessVariables })
proxyquire("../public/scripts/dashboard/Dashboard", {
    "./lessVariableLoader!../../styles/dashboard.less": lessVariables
})

describe("dashboard", function() {
    let positionOf,
        onConfigChange = {}
    beforeEach(function() {
        global.getComputedStyle = function() {
            return {
                getPropertyCSSValue: function() {}
            }
        }
        return (onConfigChange = sinon.stub())
    })
    it("displays components in the correct order (assuming they all fit)", function() {
        const {
            widgets: [widget1, widget2, widget3]
        } = createDash({ columns: 3, widgets: ["narrow1", "narrow2", "narrow1"] })

        positionOf(widget1).should.eql([0, 0])
        positionOf(widget2).should.eql([colWidth, 0])
        return positionOf(widget3).should.eql([colWidth * 2, 0])
    })
    it("skips spaces if component doesn't fit", function() {
        const {
            widgets: [widget1, widget2, widget3]
        } = createDash({ columns: 3, widgets: ["narrow1", "wide1", "wide1"] })

        positionOf(widget1).should.eql([0, 0])
        positionOf(widget2).should.eql([0, rowHeight])
        return positionOf(widget3).should.eql([0, rowHeight * 2])
    })
    it("fills in empty spaces with smaller components", function() {
        const {
            widgets: [widget1, widget2, widget3]
        } = createDash({ columns: 3, widgets: ["narrow1", "wide1", "narrow1"] })

        positionOf(widget1).should.eql([0, 0])
        positionOf(widget2).should.eql([0, rowHeight])
        return positionOf(widget3).should.eql([colWidth, 0])
    })
    it("shows add panel when in edit mode", function() {
        const { dash } = createDash({
            columns: 3,
            widgets: ["narrow1", "wide1", "wide1"]
        })
        expect(dash.find(".add-widget-panel").length).to.eql(0)
        dash.find(".fa-cogs").simulate("click")
        return expect(dash.find(".add-widget-panel").length).to.eql(1)
    })
    it("allows the user to edit a widget's configuration", function() {
        const { dash } = createDash({
            columns: 3,
            widgets: ["narrow1", "wide1", "wide1"]
        })
        dash.find(".fa-cogs").simulate("click")
        dash.find(".widget-preview")
            .first()
            .simulate("click")
        expect(onConfigChange.calledOnce).to.eql(true)
        const args = onConfigChange.firstCall.args
        expect(args[0].length).to.eql(4)
        return expect(args[0][3].widgetId).to.eql("narrow1")
    })
    it("allows the user to hide a component", function() {
        const { dash } = createDash({
            columns: 3,
            widgets: ["narrow1", "wide1", "wide1"]
        })
        dash.find(".fa-cogs").simulate("click")
        dash.find(".hide-widget-button")
            .first()
            .simulate("click")
        expect(onConfigChange.calledOnce).to.eql(true)
        const args = onConfigChange.firstCall.args
        return expect(args[0].length).to.eql(2)
    })
    it("reorders at smaller resolutions", function() {
        const {
            dash,
            widgets: [widget1, widget2, widget3]
        } = createDash({
            columns: 3,
            widgets: ["narrow1", "narrow1", "narrow1"]
        })
        dash.setProps({
            componentWidthForTesting: 400
        })
        positionOf(widget1).should.eql([0, 0])
        positionOf(widget2).should.eql([0, rowHeight])
        return positionOf(widget3).should.eql([0, rowHeight * 2])
    })
    const createDash = function({ columns, widgets }) {
        const config = [
            {
                widgetId: widgets[0],
                instanceId: "a"
            },
            {
                widgetId: widgets[1],
                instanceId: "b"
            },
            {
                widgetId: widgets[2],
                instanceId: "c"
            }
        ]
        const { Dashboard, Widget } = require("../public/scripts/dashboard/")
        const dash = mount(
            <Dashboard title="Dashboard Title" config={config} onConfigChange={onConfigChange} maxColumns={columns}>
                <Widget
                    width="1"
                    height="1"
                    id="narrow1"
                    contentComp={function() {
                        return <div>narrow1</div>
                    }}
                />
                <Widget
                    width="1"
                    height="1"
                    id="narrow2"
                    contentComp={function() {
                        return <div>narrow2</div>
                    }}
                />
                <Widget
                    width="3"
                    height="1"
                    id="wide1"
                    contentComp={function() {
                        return <div>wide1</div>
                    }}
                />
            </Dashboard>
        )
        dash.setProps({
            componentWidthForTesting: 1000
        })
        //console.info dash.html()
        widgets = dash.find(".widget")
        return {
            dash,
            widgets: [widgets.at(0), widgets.at(1), widgets.at(2)]
        }
    }
    return (positionOf = function(widget) {
        return [widget.props().style.left, widget.props().style.top]
    })
})
