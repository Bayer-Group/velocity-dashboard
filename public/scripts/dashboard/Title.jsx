const React = require("react")

const Title = ({ children, height }) => (
    <div className="title" style={{ height }}>
        {children}
    </div>
)

Title.displayName = "Title"

module.exports = Title
