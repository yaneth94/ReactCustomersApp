import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppFrame from "./../components/AppFrame";
import { getCustomersByDni } from "./../selectors/customers";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { fetchCustomers } from "./../actions/fetchCustomers";
import { updateCustomer } from "./../actions/updateCustomer";
import CustomerEdit from "./../components/CustomerEdit";
import CustomerData from "./../components/CustomerData";
import { SubmissionError } from "redux-form";
/*
<Route
      path="/customers/:dni/edit"
      children={({ match }) =>
        match ? (
          <CustomerEdit {...this.props.customer} />
        ) : (
          <CustomerData {...this.props.customer} />
        )
      }
    />
*/

class CustomerContainer extends Component {
  componentDidMount() {
    if (!this.props.customer) {
      this.props.fetchCustomers();
    }
  }
  handleSubmit = values => {
    console.log(JSON.stringify(values));
    const { id } = values;
    return this.props
      .updateCustomer(id, values)
      .then(r => {
        if (r.error) {
          throw new SubmissionError(r.payload);
        }
      })
      .catch(e => {
        throw new SubmissionError(e);
      });
  };
  HandleOnBack = () => {
    this.props.history.goBack();
  };
  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  };
  renderBody = () => (
    <Route
      path="/customers/:dni/edit"
      children={({ match }) => {
        if (this.props.customer) {
          //es un alias
          const CustomerControl = match ? CustomerEdit : CustomerData;
          return (
            <CustomerControl
              {...this.props.customer}
              onSubmit={this.handleSubmit}
              onSubmitSuccess={this.handleOnSubmitSuccess}
              onBack={this.HandleOnBack}
            />
          );
        }
        return null;
      }}
    />
  );
  //<p>Datos del cliente "{this.props.customer.name}"</p>
  render() {
    return (
      <div>
        <AppFrame
          header={`Cliente ${this.props.dni}`}
          body={this.renderBody()}
        />
      </div>
    );
  }
}

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomers: PropTypes.func.isRequired
};
const mapStateToProps = (state, props) => ({
  customer: getCustomersByDni(state, props)
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchCustomers,
      updateCustomer
    }
  )(CustomerContainer)
);
