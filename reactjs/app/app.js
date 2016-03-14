var VM = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
});

var ListVMs = React.createClass({
    render: function() {
        var vms = this.props.data.map(function(vm) {
            return (
                <VM name={vm.name} key={vm.name} />
            );
        });
        console.log(vms);
        return ( 
            <div>
            {vms}
            </div>
        );
    }
});

var data = [
  { name: "VM1" },
  { name: "VM2" }
]

var App = React.createClass({
    render: function() {
        return (
            <div>
                Hello World
                <ListVMs data={data} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('content')
);

