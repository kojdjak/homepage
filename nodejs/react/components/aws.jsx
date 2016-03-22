var React = require('react');
var aws = require('../../aws/aws');

var Aws = React.createClass({
    render: function() {
        return (
            <div>list of all AWS VMs.</div>
            );
    }
});

module.exports.Aws = Aws;
