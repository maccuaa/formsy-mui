import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import DatePicker from 'material-ui/DatePicker';

class FormsyDate extends Formsy.Mixin {
  componentWillMount () {
    super.componentWillMount();
    this.setValue(this.props.value || '');
  }

  handleChange (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    /*
      DatePicker Props that are ignored and not passed to Material UI:
      - defaultDate
    */
    const {
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
  onChange: PropTypes.func,
  value: PropTypes.object
};

export default FormsyDate;
