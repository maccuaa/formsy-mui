import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';
import SelectField from 'material-ui/SelectField';

/**
 * FormsySelect is a wrapper around Material UI's [Select Field](http://www.material-ui.com/#/components/select-field) component.
 */
class FormsySelect extends Formsy.Mixin {
  handleChange (event, key, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, key, value);
  }

  render () {
    const {
      onChange,
      value,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <SelectField
        {...props}
        errorText={this.getErrorMessage()}
        onChange={(e, k, v) => { this.handleChange(e, k, v); }}
        value={this.getValue()}>
        {this.props.children}
      </SelectField>
    );
  }
}

FormsySelect.propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Callback function fired when a menu item is selected.
   * @type {[type]}
   * @param {Object} event Change event targeting the menu item that was selected.
   * @param {Number} key The index of the selected menu item, or undefined if `multiple`` is true.
   * @param {Boolean} value If multiple is true, the menu's value array with either
   *                        the menu item's value added (if it wasn't already selected) or omitted
   *                        (if it was already selected). Otherwise, the value of the menu item.
   */
  onChange: PropTypes.func,

  /**
   * If multiple is true, an array of the values of the selected menu items. Otherwise, the value
   * of the selected menu item. If provided, the menu will be a controlled component.
   * @type {[type]}
   */
  value: PropTypes.any
};

export default FormsySelect;
