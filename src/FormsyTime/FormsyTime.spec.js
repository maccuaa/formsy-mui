import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import Formsy, {Form} from 'formsy-react-2';

import test from 'tape';
import Sinon from 'sinon';

import TimePicker from 'material-ui/TimePicker';
import FormsyTime from './FormsyTime';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

Formsy.addValidationRule('alwaysFalse', () => { return false; }, true);
Formsy.addValidationRule('alwaysTrue', () => { return true; }, true);
const expected = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

test('FormsyTime renders a material-ui TimePicker', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' />
    </Form>
  );

  assert.equals(wrapper.find(TimePicker).length, 1);

  assert.end();
});

test('FormsyTime value prop sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' value={expected} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  assert.equals(formsyForm.getCurrentValues().test, expected);

  const inputValue = wrapper.find('input').node.value;

  // Material-UI will format the date to ISO 8601 (YYYY-MM-DD) format.
  assert.true(new RegExp(/(\d{4})-(\d{2})-(\d{2})/.test(inputValue)));

  assert.end();
});

test('FormsyTime validation Errors are displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' validations='alwaysFalse' validationError='foo' value={new Date()} />
    </Form>
  );

  const formsyTime = wrapper.find(FormsyTime).node;

  const textField = wrapper.find('TextField').node;

  assert.equals(formsyTime.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.false(formsyTime.isValid());

  assert.end();
});

test('FormsyTime validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' validations='alwaysTrue' validationError='foo' value={new Date()} />
    </Form>
  );

  const formsyTime = wrapper.find(FormsyTime).node;

  assert.equals(formsyTime.getErrorMessage(), null);

  assert.true(formsyTime.isValid());

  assert.end();
});

test('FormsyTime onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change', {target: {value: new Date()}});

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyTime resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyTime name='test' value={expected} />
    </Form>
  );

  const newDate = new Date();

  const formsyTime = wrapper.find(FormsyTime).node;

  assert.equals(formsyTime.getValue(), expected);

  wrapper.find('input').simulate('change', {target: {value: newDate}});

  assert.equals(formsyTime.getValue(), newDate);

  formsyTime.resetValue();

  assert.equals(formsyTime.getValue(), expected);

  assert.end();
});
