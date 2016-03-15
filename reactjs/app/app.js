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
        console.log(typeof this.props.data);
            var vms = this.props.data.map(function(vm) {
            return (
                <VM name={vm.name} key={vm.name} />
            );
        });
        return ( 
            <div>
            {vms}
            </div>
        
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentWillUnmount: function() {
              this.serverRequest.abort();
                },
    render: function() {
        return (
            <div>
                VMs at amazon:
                <ListVMs data={this.state.data}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App url="/homepage/aws/aws3"/>,
    document.getElementById('content')
);

