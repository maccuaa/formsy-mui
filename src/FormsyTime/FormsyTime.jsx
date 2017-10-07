import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import TimePicker from 'material-ui/TimePicker';
import { datesEq } from '../utils';

/**
 * FormsyTime is a wrapper around Material UI's [Time Picker](http://www.material-ui.com/#/components/time-picker) component.
 */
class FormsyTime extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const time = 'value' in props ? props.value : props.defaultTime;

    this.state = Object.assign(this.state, {
      _value: time,
      _pristineValue: time
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value) {
      if (!this.props.value || !datesEq(this.props.value, nextProps.value)) {
        this.setValue(nextProps.value);
      }
    } else if (nextProps.defaultTime) {
      if (!datesEq(this.props.defaultTime, nextProps.defaultTime)) {
        this.setValue(nextProps.defaultTime);
      }
    }
  }

  handleChange (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      defaultTime,
      onChange,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <TimePicker
        {...props}
        errorText={this.getErrorMessage()}
        onChange={(e, v) => { this.handleChange(e, v); }}
        value={this.getValue()}
      />
    );
  }
}

FormsyTime.propTypes = {
  /**
   * The default time of the Time component.
   * **Warning:** This cannot be used in conjunction with `value`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * If `value` is provided it will override this prop.
   * @type {[type]}
   */
  defaultTime: PropTypes.instanceOf(Date),

  /**
   * Callback function that is fired when the time value changes.
   * @type {[type]}
   * @param {Null} null Since there is no particular event associated with the change, the first argument will always be null.
   * @param {Date} value  The new time value.
   */
  onChange: PropTypes.func,

  /**
   * Sets the time for the Time Picker.
   * @type {[type]}
   */
  value: PropTypes.instanceOf(Date)
};

export default FormsyTime;
