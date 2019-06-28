import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppFrame from "./../components/AppFrame";
import { getCustomersByDni } from "./../selectors/customers";
import { Route } from "react-router-dom";
import CustomerEdit from "./../components/CustomerEdit";
import CustomerData from "./../components/CustomerData";
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
  renderBody = () => (
    <Route
      path="/customers/:dni/edit"
      children={({ match }) => {
        //es un alias
        const CustomerControl = match ? CustomerEdit : CustomerData;
        return <CustomerControl {...this.props.customer} />;
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
  customer: PropTypes.object.isRequired
};
const mapStateToProps = (state, props) => ({
  customer: getCustomersByDni(state, props)
});
export default connect(
  mapStateToProps,
  null
)(CustomerContainer);
