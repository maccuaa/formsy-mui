import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import Toggle from 'material-ui/Toggle';

/**
 * FormsyToggle is a wrapper around Material UI's [Toggle](http://www.material-ui.com/#/components/toggle) component.
 */
class FormsyToggle extends Formsy.Mixin {
  constructor (props) {
    super(props);

    const {toggled, defaultToggled} = props;
    const isToggled = toggled || defaultToggled || false;

    this.state = Object.assign(this.state, {
      _value: isToggled,
      _pristineValue: isToggled
    });
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.toggled !== nextProps.toggled) {
      this.setValue(nextProps.toggled);
    }
  }

  handleToggle (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    const {
      toggled,
      defaultToggled,
      onToggle,
      onChange,
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
  /**
   * The default state of the toggle component.
   * **Warning:** This cannot be used in conjunction with `toggled`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * More info: https://fb.me/react-controlled-components
   * @type {[type]}
   */
  defaultToggled: PropTypes.bool,

  /**
   * Callback function that is fired when the toggle is toggled.
   * @type {[type]}
   * @param {Object} event `change` event targeting the underlying toggle `input`.
   * @param {Boolean} value The `toggled` value of the underlying toggle `input`.
   */
  onChange: PropTypes.func,

  /**
   * Toggle is toggled if true.
   * @type {[type]}
   */
  toggled: PropTypes.bool
};

export default FormsyToggle;
