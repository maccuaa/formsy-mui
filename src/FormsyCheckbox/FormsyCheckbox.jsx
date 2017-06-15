import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import Checkbox from 'material-ui/Checkbox';

class FormsyCheckbox extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {checked, defaultChecked} = props;
    const value = checked || defaultChecked || false;

    this.state = Object.assign(this.state, {
      _value: value,
      _pristineValue: value
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
  onChange: PropTypes.func
};

export default FormsyCheckbox;
