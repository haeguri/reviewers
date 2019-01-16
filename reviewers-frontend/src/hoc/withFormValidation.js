import React, { Component } from 'react';

const withFormValidation = (WrappedFormComponent) => {
  return class extends Component {
    invalidFields = new Set();
    state = {
      errors: {}
    }

    isValidForm = () => {
      const { invalidFields } = this;

      if (invalidFields.size > 0) {
        invalidFields.clear();
        return false;
      }

      this.setState({errors: {}})
      return true;
    }

    validateForm = (targets) => {
      const errors = targets.reduce((err, curr) => {
        const { field, tests } = curr;
  
        const idx = tests.findIndex(t => !t[0]);

        if (idx !== -1) {
          err[field] = tests[idx][1];
        }

        return err;
      }, {});

      this.invalidFields = new Set(Object.keys(errors).filter(k => errors[k] !== null));

      this.setState((state) => {
        return { 
          errors
        }
      });
    }
    
    render = () => {
      const { validateForm, isValidForm, state: { errors } } = this;
      return (
        <WrappedFormComponent 
          validateForm={validateForm}
          isValidForm={isValidForm}
          errors={errors}
          {...this.props}
        />
      )
    }
  }
}

export default withFormValidation;