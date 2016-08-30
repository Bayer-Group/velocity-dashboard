React = require 'react'
chartColors = require('./ChartStyles').colors

module.exports =
    Content: ->
        <div>
            <div className='widgetTitle'>Activity Feed</div>
            <div className='widgetBody activity-feed'>
                <ul>

                    <li>
                        <div>
                            <div className='time'>8 min ago</div>
                            <div className='user'>John Smith</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300004</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>10 min ago</div>
                            <div className='user'>Frank Castle</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300003</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>14 min ago</div>
                            <div className='user'>John Smith</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300036</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>20 min ago</div>
                            <div className='user'>Billy Batson</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300054</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>1 hour ago</div>
                            <div className='user'>Luke Cage</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300097</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>3 hours ago</div>
                            <div className='user'>Billy Batson</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300054</a></div>
                    </li>

                    <li>
                        <div>
                            <div className='time'>6 hours ago</div>
                            <div className='user'>Luke Cage</div>
                        </div>
                        <div className='activity'>Received Shipment - <a href='#'>SH12300097</a></div>
                    </li>

                </ul>
            </div>
        </div>

