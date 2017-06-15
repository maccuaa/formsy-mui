import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import DatePicker from 'material-ui/DatePicker';

class FormsyDate extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {value, defaultDate} = props;
    const date = value || defaultDate;

    this.state = Object.assign(this.state, {
      _value: date,
      _pristineValue: date
    });
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
  defaultDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date)
};

export default FormsyDate;
