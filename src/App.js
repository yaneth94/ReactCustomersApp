import React, { Component }  from "react";
import {  BrowserRouter as Router,Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  renderHome = () => <h1>Home</h1>;

  renderCustomerContainer = () => <h1>Customer Container</h1>;

  renderCustomerListContainer = () => <h1>Customers List Container</h1>;

  renderCustomerNewContainer = () => <h1>Customer New Container</h1>;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.renderHome} />
          <Route exact path="/customers" component={this.renderCustomerContainer} />
          <Route exact path="/customers/:dni" component={this.renderCustomerListContainer} />
          <Route exact path="/customers/new" component={this.renderCustomerNewContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
