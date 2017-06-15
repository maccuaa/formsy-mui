import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import Checkbox from 'material-ui/Checkbox';

class FormsyCheckbox extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {checked, defaultChecked, value} = props;
    const isChecked = checked || defaultChecked || value || false;

    this.state = Object.assign(this.state, {
      _value: isChecked,
      _pristineValue: isChecked
    });
  }

  handleCheck (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      checked,
      defaultChecked,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <Checkbox
        {...props}
        checked={this.getValue()}
        onCheck={(e, v) => { this.handleCheck(e, v); }}
      />
    );
  }
}

FormsyCheckbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.bool
};

export default FormsyCheckbox;
