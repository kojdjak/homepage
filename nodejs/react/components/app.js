var React = require('react');

var Page = React.createClass({
    render:function() {
        return (
            <html>
                <head>
                </head>
                <body>
                    <Main /> 
                </body>
            </html>
            );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div id="main">Hello World from server side React </div>
            );
    }
});

module.exports.App = Page;
