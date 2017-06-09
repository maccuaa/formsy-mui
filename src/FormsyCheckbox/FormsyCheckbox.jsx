import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';

class FormsyCheckbox extends Formsy.Mixin {
  componentWillMount () {
    super.componentWillMount();
    this.setValue(this.props.value || false);
  }

  handleCheck (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render () {
    /*
      Checkbox Props that are ignored and not passed to Material UI:
      - checked
      - defaultChecked
      They are replaced with:
      - value
    */
    const {
      checked,
      defaultChecked,
      value,
      validations,
      validationError,
      validationErrors,
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
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default FormsyCheckbox;
