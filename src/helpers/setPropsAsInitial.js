import React, { Component } from "react";
//High Order Component
export const setPropsAsInitial = WrappedComponent =>
  class extends Component {
    render() {
      // eslint-disable-next-line react/react-in-jsx-scope
      return (
        <WrappedComponent
          {...this.props}
          initialValues={this.props}
        />
      );
    }
  };
