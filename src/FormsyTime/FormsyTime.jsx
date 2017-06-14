import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';

class FormsyTime extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {value, defaultTime} = props;
    const time = value || defaultTime;

    this.state = Object.assign(this.state, {
      _value: time,
      _pristineValue: time
    });
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
  defaultTime: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date)
};

export default FormsyTime;
