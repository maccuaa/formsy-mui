import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import TextField from 'material-ui/TextField';
import debounce from 'lodash.debounce';

/**
 * FormsyText is a wrapper around Material UI's [Text Field](http://www.material-ui.com/#/components/text-field) component.
 */
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
  /**
   * The text string to use for the default value.
   * **Warning:** This cannot be used in conjunction with `value`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * If `value` is provided it will override this prop.
   * @type {[type]}
   */
  defaultValue: PropTypes.any,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * Callback function that is fired when the textfield's value changes.
   * @param {Object} event `change` Change event targeting the text field.
   * @param {String} value The new value of the text field.
   */
  onChange: PropTypes.func,

  /**
   * If true, the value of the TextField will be updated immediately on keypress.
   * This also means the TextField will be validated as the user is still typing.
   * If false, the value is only updated onBlur in order to improve performance
   * and to avoid displaying an error message to the user as they are typing.
   * Defaults to false.
   *
   * @type {[type]}
   */
  updateImmediately: PropTypes.bool,

  /**
   * The value of the text field.
   * @type {[type]}
   */
  value: PropTypes.any
};

FormsyText.defaultProps = {
  updateImmediately: false
};

export default FormsyText;
