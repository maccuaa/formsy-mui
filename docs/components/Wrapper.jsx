import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'formsy-react-2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Wrapper extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      model: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount () {
    this.setState({ model: this.form.getModel() });
  }

  onChange (model) {
    this.setState({ model });
  }

  render () {
    const { model } = this.state;

    return (
      <MuiThemeProvider>
        <Form onChange={this.onChange} ref={(e) => { this.form = e; }}>
          {this.props.children}
          <br />
          <div>
            {JSON.stringify(model)}
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
