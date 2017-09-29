import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import DatePicker from 'material-ui/DatePicker';

class FormsyDate extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const date = 'value' in props ? props.value : props.defaultDate;

    this.state = Object.assign(this.state, {
      _value: date,
      _pristineValue: date
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value) {
      if (!this.props.value || !datesEq(this.props.value, nextProps.value)) {
        this.setValue(nextProps.value);
      }
    } else if (nextProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, nextProps.defaultDate)) {
        this.setValue(nextProps.defaultDate);
      }
    }

    function datesEq (date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getDay() === date2.getDay() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes() &&
        date1.getSeconds() === date2.getSeconds();
    }
  }

  handleChange (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      defaultDate,
      onChange,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <DatePicker
        {...props}
        errorText={this.getErrorMessage()}
        onChange={(e, v) => { this.handleChange(e, v); }}
        value={this.getValue()}
      />
    );
  }
}

FormsyDate.propTypes = {
  /**
   * The default date of the Date component.
   * **Warning:** This cannot be used in conjunction with `value`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * If `value` is provided it will override this prop.
   * @type {[type]}
   */
  defaultDate: PropTypes.instanceOf(Date),

  /**
   * Callback function that is fired when the date value changes.
   * @type {[type]}
   * @param {?null} null Since there is no particular event associated with the change, the first argument will always be null.
   * @param {Date} value  The new date value.
   */
  onChange: PropTypes.func,

  /**
   * Sets the date for the Date Picker.
   * @type {[type]}
   */
  value: PropTypes.instanceOf(Date)
};

export default FormsyDate;
