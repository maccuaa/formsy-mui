import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import Formsy, {Form} from 'formsy-react-2';

import test from 'tape';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FormsySelect from './FormsySelect';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

Formsy.addValidationRule('alwaysFalse', () => { return false; }, true);
Formsy.addValidationRule('alwaysTrue', () => { return true; }, true);

test('FormsySelect renders a material-ui SelectField', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' />
    </Form>
  );

  assert.equals(wrapper.find(SelectField).length, 1);

  assert.end();
});

test('FormsySelect value prop sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' value={'foo'}>
        <MenuItem value='foo' />
      </FormsySelect>
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const expected = 'foo';

  assert.equals(formsyForm.getCurrentValues().test, expected);

  assert.end();
});

test('FormsySelect validation Errors are displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' validations='alwaysFalse' validationError='foo' value={'bar'} />
    </Form>
  );

  const formsySelect = wrapper.find(FormsySelect).node;

  const textField = wrapper.find(TextField).node;

  assert.equals(formsySelect.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.false(formsySelect.isValid());

  assert.end();
});

test('FormsySelect validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' validations='alwaysTrue' validationError='foo' value={'bar'} />
    </Form>
  );

  const formsySelect = wrapper.find(FormsySelect).node;

  assert.equals(formsySelect.getErrorMessage(), null);

  assert.true(formsySelect.isValid());

  assert.end();
});

test('FormsySelect resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' value='foo' />
    </Form>
  );

  const formsySelect = wrapper.find(FormsySelect).node;

  assert.equals(formsySelect.getValue(), 'foo');

  formsySelect.setValue('bar');

  assert.equals(formsySelect.getValue(), 'bar');

  formsySelect.resetValue();

  assert.equals(formsySelect.getValue(), 'foo');

  assert.end();
});

test('FormsySelect respects disabled prop of Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsySelect name='test' />
    </Form>
  );

  assert.true(wrapper.find(TextField).node.props.disabled);

  assert.end();
});

test('FormsySelect disabled prop propagetes to Material UI Select Field', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' disabled />
    </Form>
  );

  assert.true(wrapper.find(FormsySelect).node.props.disabled);

  assert.true(wrapper.find(SelectField).node.props.disabled);

  assert.true(wrapper.find(TextField).node.props.disabled);

  assert.end();
});

test('FormsySelect allows overriding Formsy Form disabled prop', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsySelect name='test' disabled={false} />
    </Form>
  );

  assert.true(wrapper.node.props.disabled);

  assert.false(wrapper.find(FormsySelect).node.props.disabled);

  assert.false(wrapper.find(SelectField).node.props.disabled);

  assert.false(wrapper.find(TextField).node.propsdisabled);

  assert.end();
});

test('FormsySelect required prop invalidates form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' required />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsySelect = wrapper.find(FormsySelect).node;

  const textField = wrapper.find(TextField).node;

  assert.false(formsyForm.state.isValid);

  assert.true(formsySelect.isRequired());

  assert.true(formsySelect.showRequired());

  assert.false(formsySelect.isValidValue());

  assert.true(textField.props.required);

  assert.end();
});

test('FormsySelect requiredError message is displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsySelect name='test' required requiredError='foo' />
    </Form>
  );

  const formsySelect = wrapper.find(FormsySelect).node;

  const textField = wrapper.find(TextField).node;

  // Required error will not be displayed until the form is submitted
  assert.equals(formsySelect.getErrorMessage(), null);

  wrapper.simulate('submit');

  assert.equals(formsySelect.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.end();
});

test('FormsySelect updates value as a controlled component', (assert) => {
  class MyComponent extends React.PureComponent {
    constructor (props) {
      super(props);
      this.state = {
        value: 'foo'
      };
    }

    changeValue () {
      this.setState({value: 'bar'});
    }

    render () {
      return (
        <Form>
          <FormsySelect name='test' value={this.state.value}>
            <MenuItem value='foo' />
            <MenuItem value='bar' />
          </FormsySelect>
        </Form>
      );
    }
  }

  const wrapper = mountWithContext(<MyComponent />);

  const formsyForm = wrapper.find(Form).node;

  const formsySelect = wrapper.find(FormsySelect).node;

  const myComponent = wrapper.find(MyComponent).node;

  assert.equals(formsyForm.getCurrentValues().test, 'foo');

  assert.equals(formsySelect.getValue(), 'foo');

  myComponent.changeValue();

  assert.equals(formsyForm.getCurrentValues().test, 'bar');

  assert.equals(formsySelect.getValue(), 'bar');

  assert.end();
});
