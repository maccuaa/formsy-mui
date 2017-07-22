import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

class FormsyRadioGroup extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const selected = 'valueSelected' in props ? props.valueSelected : props.defaultSelected;

    this.state = Object.assign(this.state, {
      _value: selected,
      _pristineValue: selected
    });
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.valueSelected !== nextProps.valueSelected) {
      this.setValue(nextProps.valueSelected);
    }
  }

  handleChange (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      valueSelected,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <RadioButtonGroup
        {...props}
        valueSelected={this.getValue()}
        onChange={(e, v) => { this.handleChange(e, v); }}>
        {this.props.children}
      </RadioButtonGroup>
    );
  }
}

FormsyRadioGroup.propTypes = {
  defaultSelected: PropTypes.any,
  onChange: PropTypes.func,
  valueSelected: PropTypes.any
};

export default FormsyRadioGroup;
