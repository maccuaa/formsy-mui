import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'formsy-react-2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormState from './FormState';
import RaisedButton from 'material-ui/RaisedButton';
import PropsTable from './PropsTable';

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
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  resetForm () {
    this.form.reset();
  }

  submitForm () {
    this.form.submit();
  }

  render () {
    const { formIsValid, model } = this.state;

    const styles = {
      container: {
        display: 'flex',
        flex: '1 1 auto'
      },
      item: {
        width: '50%',
        padding: '16px',
        border: 'solid 1px #ccc',
        display: 'flex',
        alignItems: 'center'
      },
      rightPaneContainer: {
        display: 'flex',
        flex: '1 1 auto',
        flexWrap: 'wrap'
      },
      rightPaneItemHalf: {
        padding: '8px',
        width: '50%'
      },
      rightPaneItemFill: {
        padding: '8px',
        width: '100%'
      },
      button: {
        margin: '0 4px'
      }
    };

    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <div style={styles.item}>
            <Form
              onChange={this.onChange}
              onValid={this.onFormIsValid}
              onInvalid={this.onFormIsInvalid}
              ref={(e) => { this.form = e; }}>
              {this.props.children}
            </Form>
          </div>
          <div style={styles.item}>
            <div style={styles.rightPaneContainer}>
              <div style={styles.rightPaneItemFill}>
                <PropsTable model={model} />
              </div>
              <div style={styles.rightPaneItemFill}>
                <FormState state={formIsValid} />
              </div>
              <div style={styles.rightPaneItemFill}>
                <RaisedButton secondary style={styles.button} label='Reset' onClick={this.resetForm} />
                <RaisedButton primary style={styles.button} label='Submit' type='submit' onClick={this.submitForm} />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.element
};

export default Wrapper;
