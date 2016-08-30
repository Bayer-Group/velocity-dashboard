React = require 'react'

Title = ({children, height}) ->
    <div className='title' style={height: height}>{children}</div>

Title.displayName = 'Title'

module.exports = Title