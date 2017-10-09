import React from 'react';
import PropTypes from 'prop-types';

import ValidIcon from 'material-ui/svg-icons/action/check-circle';
import InvalidIcon from 'material-ui/svg-icons/navigation/cancel';
import {red500, green500} from 'material-ui/styles/colors';

const styles = {
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center'
  },
  item: {
    padding: '0 4px'
  },
  red: {
    color: red500
  },
  green: {
    color: green500
  }
};

const FormState = (props) => {
  const { state } = props;

  const icon = state ? <ValidIcon style={styles.green} /> : <InvalidIcon style={styles.red} />;
  const text = `Form is ${state ? 'valid' : 'invalid'}`;

  return (
    <div style={styles.wrapper}>
      <div style={styles.item}>{icon}</div>
      <div style={styles.item}>{text}</div>
    </div>
  );
};

FormState.propTypes = {
  state: PropTypes.bool.isRequired
};

export default FormState;
