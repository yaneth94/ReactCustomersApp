import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitial } from "./../helpers/setPropsAsInitial";
import CustomersActions from "./CustomersActions";
import { Prompt } from "react-router-dom";
//validate={[isRequired,isNumber]}
//const isRequired = value => !value && "Este campo es requerido";
//const isNumber = value => isNaN(Number(value)) && "El campo debe ser un número";
/** Validación a nivel de field
 * <Field
            name="age"
            component={myField}
            type="number"
            validate={isNumber}
            label="Age: "
          />
 */
/*
const myField = ({ input, meta, type, label, name }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input {...input} type={!type ? "text" : type} />
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </div>
); */

const validate = values => {
  const error = {};

  if (!values.name) {
    error.name = "El campo nombre es requerido";
  }
  if (!values.dni) {
    error.dni = "El campo dni es requerido";
  }
  if (!values.age) {
    error.age = "El campo Age es requerido";
  }
  if (isNaN(Number(values.dni))) {
    error.dni = "El campo debe ser un número";
  }
  if (isNaN(Number(values.age))) {
    error.dni = "El campo debe ser un número";
  }
  return error;
};


const toNumber = value => value && Number(value);

const toUpper = value => value && value.toUpperCase();

const toLower = value => value && value.toLowerCase();
// validación en normalize del lado del cliente informar del error
// forzar a quelos valores sean validos y los que se espera
const onlyGrow = (value, previosValue, values) =>
  value &&
  (!previosValue ? value : value > previosValue ? value : previosValue);

class CustomerEdit extends Component {
  componentDidMount() {
    if (this.txt) {
      this.txt.focus();
    }
  }

  renderField = ({ input, meta, type, label, name, withFocus }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...input}
        type={!type ? "text" : type}
        ref={
          withFocus &&
          (txt => {
            this.txt = txt;
          })
        }
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
  render() {
    const {
      handleSubmit,
      submitting,
      onBack,
      pristine,
      submitSucceeded
    } = this.props;
    return (
      <div>
        <h2>Edición del cliente</h2>
        <form onSubmit={handleSubmit}>
          <Field
            withFocus
            name="name"
            component={this.renderField}
            label="Nombre"
            parse={toUpper}
            format={toLower}
          />
          <Field name="dni" component={this.renderField} label="Dni"  type="number"/>
          <Field
            name="age"
            component={this.renderField}
            type="number"
            label="Edad"
            parse={toNumber}
            normalize={onlyGrow}
          />
          <CustomersActions>
            <button type="submit" disabled={pristine || submitting}>
              Aceptar
            </button>
            <button type="button" disabled={submitting} onClick={onBack}>
              Cancelar
            </button>
          </CustomersActions>
          <Prompt
            when={!pristine && !submitSucceeded}
            message="Se perderán los datos si continúa"
          />
        </form>
      </div>
    );
  }
}

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired
};

const CustomerEditForm = reduxForm({ form: "CustomerEdit", validate })(
  CustomerEdit
);

export default setPropsAsInitial(CustomerEditForm);
