import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import AutoComplete from 'material-ui/AutoComplete';

class FormsyAutoComplete extends Formsy.Mixin {
  componentWillMount () {
    super.componentWillMount();
    this.setValue(this.props.value || '');
  }

  handleBlur (event) {
    this.setValue(event.target.value);
    if (this.props.onBlur) this.props.onBlur(event);
  }

  handleUpdateInput (value, dataSource, params) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(value, dataSource, params);
  }

  handleKeyDown (event) {
    if (keycode(event) === 'enter') this.setValue(event.target.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.target.value);
  }

  render () {
    /*
      AutoComplete Props that are ignored and not passed to Material UI:
      - onUpdateInput
      - searchText
      They are replaced with:
      - onChange
      - value
    */
    const {
      onUpdateInput,
      searchText,
      value,
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
        searchText={this.getValue()}
      />
    );
  }
}

FormsyAutoComplete.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.any
};

export default FormsyAutoComplete;
