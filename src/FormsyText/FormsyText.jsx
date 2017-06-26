import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import TextField from 'material-ui/TextField';
import debounce from 'lodash.debounce';

class FormsyText extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const value = 'value' in props ? props.value : props.defaultValue;

    this.state = Object.assign(this.state, {
      _value: value,
      _pristineValue: value
    });
  }

  handleBlur (event) {
    this.changeValue && this.changeValue.cancel();
    delete this.changeValue;
    this.setValue(event.target.value);
    if (this.props.onBlur) this.props.onBlur(event);
  }

  handleChange (event, value) {
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = debounce(this.setValue, 400);
      }
      this.changeValue(value);
    } else if (this.isValidValue(value)) {
      this.setValue(value);
    }

    this.setState({_value: value});
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      defaultValue,
      updateImmediately,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <TextField
        {...props}
        errorText={this.getErrorMessage()}
        onBlur={(e) => { this.handleBlur(e); }}
        onChange={(e, v) => { this.handleChange(e, v); }}
        value={this.getValue()}
      />
    );
  }
}

FormsyText.propTypes = {
  defaultValue: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  updateImmediately: PropTypes.bool,
  value: PropTypes.any
};

FormsyText.defaultProps = {
  updateImmediately: false
};

export default FormsyText;
