'use strict';

class Shares extends React.Component {
  
  render() {
	const shares = this.props.shares;
    console.log(shares);
    const formattedShares = shares.map((share) =>
      <ul key={share.id}>
        <div className="company">{share.title.$t}</div>
        <div className={share.content.$t.indexOf('-') == -1 ? 'normal' : 'negative'}>{share.content.$t.substring(6, share.content.$t.length)}</div>
      </ul>
    );
    return(
      <div>{formattedShares}</div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state={
      shares:[]
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      5000
    );

  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    var myUrl = "https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json";
    fetch(myUrl)
     .then((response) => response.json())
     .then((json) => this.setState({shares: json.feed.entry}));
  }
  
  render() {
    return (
    <div className="app">
      <div className="header">
        <h1 id="header-title">FTSE 100 Index</h1>
      </div>
      <div className="content">
        <Shares shares={this.state.shares}/>
      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
