import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { insertCustomer } from "./../actions/insertCustomer";
import AppFrame from "./../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import { SubmissionError } from "redux-form";

class NewCustomerContainer extends Component {
  handleSubmit = values => {
    return this.props.insertCustomer(values).then(r => {
      if (r.error) {
        throw new SubmissionError(r.payload);
      }
    });
  };

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  renderBody = () => {
    return (
      <CustomerEdit
        onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}
      />
    );
  };
  render() {
    return (
      <div>
        <AppFrame header={`Creación del Cliente`} body={this.renderBody()} />
      </div>
    );
  }
}

NewCustomerContainer.propTypes = {
  insertCustomer: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { insertCustomer }
  )(NewCustomerContainer)
);
