import React from 'react';
import PropTypes from 'prop-types';

import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';

const styles = {
  rowHeight: {
    height: '32px'
  }
};

const PropsTable = (props) => {
  const { model } = props;
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow style={styles.rowHeight}>
          <TableHeaderColumn style={styles.rowHeight}>Key</TableHeaderColumn>
          <TableHeaderColumn style={styles.rowHeight}>Value</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {Object.entries(model).map((entry, index) => (
          <TableRow style={styles.rowHeight} key={index}>
            <TableRowColumn style={styles.rowHeight}>{entry[0]}</TableRowColumn>
            <TableRowColumn style={styles.rowHeight}>{String(entry[1])}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

PropsTable.propTypes = {
  model: PropTypes.object.isRequired
};

export default PropsTable;
