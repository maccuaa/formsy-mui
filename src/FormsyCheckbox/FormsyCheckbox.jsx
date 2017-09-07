import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import Checkbox from 'material-ui/Checkbox';

/**
 * FormsyCheckbox is a wrapper around Material UI's [Checkbox](http://www.material-ui.com/#/components/checkbox) component.
 */
class FormsyCheckbox extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const { checked, defaultChecked } = props;
    const isChecked = checked || defaultChecked || false;

    this.state = Object.assign(this.state, {
      _value: isChecked,
      _pristineValue: isChecked
    });
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.checked !== nextProps.checked) {
      this.setValue(nextProps.checked);
    }
  }

  handleCheck (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      checked,
      defaultChecked,
      onCheck,
      onChange,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({ disabled: this.isFormDisabled() }, rest);

    const value = this.getValue();

    return (
      <Checkbox
        {...props}
        checked={value}
        onCheck={(e, v) => { this.handleCheck(e, v); }}
      />
    );
  }
}

FormsyCheckbox.propTypes = {
  /**
   * Checkbox is checked if true.
   * @type {bool}
   */
  checked: PropTypes.bool,

  /**
   * The default state of our checkbox component.
   * **Warning:** This cannot be used in conjunction with `checked`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * More info: https://fb.me/react-controlled-components
   * @type {bool}
   */
  defaultChecked: PropTypes.bool,

  /**
   * Callback function that is fired when the checkbox is checked.
   * @type {[type]}
   * @param {Object} event `change` event targeting the underlying checkbox `input`.
   * @param {Boolean} value The `checked` value of the underlying checkbox `input`.
   */
  onChange: PropTypes.func
};

export default FormsyCheckbox;
