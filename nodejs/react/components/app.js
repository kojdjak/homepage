var React = require('react');

var ReactApp = React.createClass({
    render: function() {
        return (
            <div>Hello World from server side React </div>
            );
    }
});

module.exports.ReactApp = ReactApp;
