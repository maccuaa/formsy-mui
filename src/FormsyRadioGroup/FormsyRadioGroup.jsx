import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

/**
 * FormsyDate is a wrapper around Material UI's [Radio Button Group](http://www.material-ui.com/#/components/radio-button) component.
 */
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
  /**
   * The value property of the radio button that will be selected by default.
   * This takes precedence over the checked property of the RadioButton elements.
   * @type {[type]}
   */
  defaultSelected: PropTypes.any,

  /**
   * Callback function that is fired when a radio button has been checked.
   * @type {[type]}
   * @param {Object} event `change` event targeting the selected radio button.
   * @param {Boolean} value The `value` of the selected radio button.
   */
  onChange: PropTypes.func,

  /**
   * The value of the currently selected radio button.
   * @type {[type]}
   */
  valueSelected: PropTypes.any
};

export default FormsyRadioGroup;
