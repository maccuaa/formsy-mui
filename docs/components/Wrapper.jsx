import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'formsy-react-2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Wrapper extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Form>
          {this.props.children}
        </Form>
      </MuiThemeProvider>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.element
};

export default Wrapper;
