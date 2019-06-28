import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import HomeContainer from './containers/HomeContainer.js';
import CustomersContainer from './containers/CustomersContainer.js';
import CustomerContainer from './containers/CustomerContainer.js';

/*
<Switch>
            <Route
              path="/customers/new"
              component={this.renderCustomerNewContainer}
            />
            <Route
              path="/customers/:dni"
              component={this.renderCustomerListContainer}
            />
            <Route
              path="/customers"
              component={this.renderCustomerContainer}
            />
            <Route path="/" component={this.renderHome} />
          </Switch>
*/

class App extends Component {
  renderHome = () => <HomeContainer></HomeContainer>;

  renderCustomerContainer = () => <h1>Customer Container</h1>;

  renderCustomerListContainer = () => < CustomersContainer></CustomersContainer>;

  renderCustomerNewContainer = () => <h1>Customer New Container</h1>;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.renderHome} />
          <Route
            exact
            path="/customers"
            component={this.renderCustomerListContainer}
          />
          <Switch>
            <Route
              path="/customers/new"
              component={this.renderCustomerNewContainer}
            />
            <Route
              path="/customers/:dni"
              render={props => <CustomerContainer dni={props.match.params.dni}/>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
