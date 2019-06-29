import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import AppFrame from "./../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";

class NewCustomerContainer extends Component {
  handleSubmit = () => {};

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
        onSubmitSuccess={this.handleOnSumitSucess}
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

NewCustomerContainer.propTypes = {};

export default withRouter(connect(null, null)(NewCustomerContainer));
