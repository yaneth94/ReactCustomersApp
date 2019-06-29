import React from "react";
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

const myField = ({ input, meta, type, label, name }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input {...input} type={!type ? "text" : type} />
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </div>
);

const toNumber = value => value && Number(value);

const toUpper = value => value && value.toUpperCase();

const toLower = value => value && value.toLowerCase();
// validación en normalize del lado del cliente informar del error
// forzar a quelos valores sean validos y los que se espera
const onlyGrow = (value, previosValue, values) =>
  value && (!previosValue ? value :  (value > previosValue ? value : previosValue));

const CustomerEdit = ({
  handleSubmit,
  submitting,
  onBack,
  pristine,
  submitSucceeded
}) => {
  return (
    <div>
      <h2>Edición del Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={myField}
            type="text"
            label="Name: "
            parse={toUpper}
            format={toLower}
          />
        </div>
        <div>
          <Field name="dni" component={myField} type="text" label="Dni: " />
        </div>
        <div>
          <Field
            name="age"
            component={myField}
            type="number"
            label="Age: "
            parse={toNumber}
            normalize={onlyGrow}
          />
        </div>
        <CustomersActions>
          <button type="submit" disabled={ pristine || submitting}>
            Aceptar
          </button>
          <button onClick={onBack} type="button" disabled={submitting}>Cancelar</button>
        </CustomersActions>
        <Prompt
          when={!pristine && !submitSucceeded}
          message="Se perderán los datos si continúa"
        />
      </form>
    </div>
  );
};

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
