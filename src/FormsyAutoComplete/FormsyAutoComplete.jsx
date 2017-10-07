import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Formsy from 'formsy-react-2';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * FormsyAutoComplete is a wrapper around Material UI's [AutoComplete](http://www.material-ui.com/#/components/auto-complete) component.
 * 
 * @deprecated The AutoComplete component is [not](https://github.com/callemall/material-ui/pull/7477) being ported to Material UI v1.
 * As such this component is now being deprecated and will be completely removed when Material UI v1 is released.
 */
class FormsyAutoComplete extends Formsy.Mixin {
  constructor (props) {
    super(props);
    this.state = Object.assign(this.state, {
      _value: props.searchText,
      _pristineValue: props.searchText
    });

    // eslint-disable-next-line no-console
    console.warn('FormsyAutoComplete is deprecated and will be compeletely removed in a future release.  Consider switching to a different component.');
  }

  handleBlur (event) {
    this.setValue(event.target.value);
  }

  handleUpdateInput (value, dataSource, params) {
    this.setValue(value);
    if (this.props.onUpdateInput) this.props.onUpdateInput(value, dataSource, params);
    if (this.props.onChange) this.props.onChange(value, -1);
  }

  handleKeyDown (event) {
    if (keycode(event) === 'enter') this.setValue(event.target.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  }

  handleNewRequest (value, index) {
    this.setValue(value);
    if (this.props.onNewRequest) this.props.onNewRequest(value, index);
    if (this.props.onChange) this.props.onChange(value, index);
  }

  render () {
    const {
      onUpdateInput,
      searchText,
      ...rest
    } = this.removeFormsyProps(this.props);

    const props = Object.assign({disabled: this.isFormDisabled()}, rest);

    return (
      <AutoComplete
        {...props}
        errorText={this.getErrorMessage()}
        onBlur={(e) => { this.handleBlur(e); }}
        onUpdateInput={(v, d, p) => { this.handleUpdateInput(v, d, p); }}
        onKeyDown={(e) => { this.handleKeyDown(e); }}
        onNewRequest={(v, i) => { this.handleNewRequest(v, i); }}
        searchText={this.getValue()}
      />
    );
  }
}

FormsyAutoComplete.propTypes = {
  /**
   * Call back function that is fired when the value AutoComplete component changes.
   * @type {[type]}
   * @param {String} value The AutoComplete `searchText` value.
   * @param {Number} index The index in `dataSource` of the list item selected, or -1 otherwise.
   */
  onChange: PropTypes.func
};

export default FormsyAutoComplete;
