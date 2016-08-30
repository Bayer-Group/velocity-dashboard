React = require 'react'

Content = ({children}) ->
    <div className='content'>{children}</div>

Content.displayName = 'Content'

module.exports = Content