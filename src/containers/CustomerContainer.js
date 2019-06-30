import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppFrame from "./../components/AppFrame";
import { getCustomersByDni } from "./../selectors/customers";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { fetchCustomers } from "./../actions/fetchCustomers";
import { updateCustomer } from "./../actions/updateCustomer";
import { deleteCustomer } from "./../actions/deleteCustomer";
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
  handleOnDelete = (id) => {
    console.log("handleOnDelete");
    this.props.deleteCustomer(id).then(v => {
      this.props.history.goBack();
    });
  };
  renderCustomerControl = (isEdit, isDelete) => {
    if (this.props.customer) {
      const CustomerControl = isEdit ? CustomerEdit : CustomerData;
      return (
        <CustomerControl
          {...this.props.customer}
          onSubmit={this.handleSubmit}
          onSubmitSuccess={this.handleOnSubmitSuccess}
          onBack={this.handleOnBack}
          isDeleteAllow={!!isDelete}
          onDelete={this.handleOnDelete}
        />
      );
    }

    return null;
  };
  renderBody = () => (
    <Route
      path="/customers/:dni/edit"
      children={({ match: isEdit }) => (
        <Route
          path="/customers/:dni/del"
          children={({ match: isDelete }) =>
            this.renderCustomerControl(isEdit, isDelete)
          }
        />
      )}
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
  updateCustomers: PropTypes.func,
  deleteCustomer:PropTypes.func,
};
const mapStateToProps = (state, props) => ({
  customer: getCustomersByDni(state, props)
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchCustomers,
      updateCustomer,
      deleteCustomer
    }
  )(CustomerContainer)
);
