import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import SelectField from 'material-ui/SelectField';

class FormsySelect extends Formsy.Mixin {
  handleChange (event, key, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value, key);
  }

  render () {
    const {
      onChange,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <SelectField
        {...props}
        errorText={this.getErrorMessage()}
        onChange={(e, k, v) => { this.handleChange(e, k, v); }}
        value={this.getValue()}>
        {this.props.children}
      </SelectField>
    );
  }
}

FormsySelect.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default FormsySelect;
