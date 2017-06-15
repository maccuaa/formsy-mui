import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import Toggle from 'material-ui/Toggle';

class FormsyToggle extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {toggled, defaultToggled} = props;
    const value = toggled || defaultToggled || false;

    this.state = Object.assign(this.state, {
      _value: value,
      _pristineValue: value
    });
  }

  handleToggle (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      toggled,
      defaultToggled,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <Toggle
        {...props}
        toggled={this.getValue()}
        onToggle={(e, v) => { this.handleToggle(e, v); }}
      />
    );
  }
}

FormsyToggle.propTypes = {
  defaultToggled: PropTypes.bool,
  onChange: PropTypes.func,
  toggled: PropTypes.bool
};

export default FormsyToggle;
