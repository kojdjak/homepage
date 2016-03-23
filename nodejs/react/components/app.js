'use strit';

var app = app || {};

var React = require('react');
//var Aws = require('./aws.js');
var AwsList = React.createFactory(require('./aws.jsx').Aws);

var Page = React.createClass({
    render:function() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css" />
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
            <div id="main">
                <h1>Homepage</h1>
                <AwsList />
            </div>
            );
    }
});

module.exports.App = Page;
