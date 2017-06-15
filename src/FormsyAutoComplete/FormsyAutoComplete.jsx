import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Formsy from 'formsy-react-2';
import AutoComplete from 'material-ui/AutoComplete';

class FormsyAutoComplete extends Formsy.Mixin {
  constructor (props) {
    super(props);
    this.state = Object.assign(this.state, {
      _value: props.searchText,
      _pristineValue: props.searchText
    });
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
      They are replaced with:
      - onChange
    */
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
        searchText={this.getValue()}
      />
    );
  }
}

FormsyAutoComplete.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default FormsyAutoComplete;
