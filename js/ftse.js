'use strict';

class Jobs extends React.Component {
  
  render() {
	const jobs = this.props.jobs;
    console.log(jobs);
    const formattedJobs = jobs.map((job) =>
      <ul key={job.id}>
        <div className="company">{job.title.$t}</div>
        <div className={job.content.$t.indexOf('-') == -1 ? 'normal' : 'negative'}>{job.content.$t.substring(6, job.content.$t.length)}</div>
      </ul>
    );
    return(
      <div>{formattedJobs}</div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state={
      jobs:[]
    }
  var myUrl = "https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json";
  fetch(myUrl)
    .then((response) => response.json())
    .then((json) => this.setState({jobs: json.feed.entry}));
  }
  
  render() {
    return (
    <div className="app">
      <div className="header">
        <h1 id="header-title">FTSE 100 Index</h1>
      </div>
      <div className="content">
        <Jobs jobs={this.state.jobs}/>
      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

