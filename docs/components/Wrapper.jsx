import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'formsy-react-2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Wrapper extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      formIsValid: false,
      model: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onFormIsValid = this.onFormIsValid.bind(this);
    this.onFormIsInvalid = this.onFormIsInvalid.bind(this);
  }

  componentDidMount () {
    this.setState({ model: this.form.getModel() });
  }

  onChange (model) {
    this.setState({ model });
  }

  onFormIsValid () {
    this.setState({ formIsValid: true });
  }

  onFormIsInvalid () {
    this.setState({ formIsValid: false });
  }

  render () {
    const { formIsValid, model } = this.state;

    return (
      <MuiThemeProvider>
        <Form
          onChange={this.onChange}
          onValid={this.onFormIsValid}
          onInvalid={this.onFormIsInvalid}
          ref={(e) => { this.form = e; }}>
          {this.props.children}
          <br />
          <div>
            {JSON.stringify(model)}
          </div>
          <div>
            Form is {formIsValid ? 'valid' : 'invalid'}
          </div>
        </Form>
      </MuiThemeProvider>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.element
};

export default Wrapper;
