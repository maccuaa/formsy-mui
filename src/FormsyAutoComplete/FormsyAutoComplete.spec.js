import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react';

import AutoComplete from 'material-ui/AutoComplete';
import FormsyAutoComplete from './FormsyAutoComplete';

import test from 'tape';
import Sinon from 'sinon';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyAutoComplete renders a material-ui AutoComplete', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} />
    </Form>
  );

  assert.equals(wrapper.find(AutoComplete).length, 1);

  assert.end();
});

test('FormsyAutoComplete change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  const expected = 'foo';

  wrapper.find('input').simulate('change', {target: {value: expected}});

  // Make sure the FormsyAutoComplete component has the right value
  assert.equals(formsyAutoComplete.getValue(), expected);

  // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, expected);

  // Make sure the DOM has the right value
  assert.equals(wrapper.find('input').node.value, expected);

  assert.end();
});

test('FormsyAutoComplete value prop sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} value='foo' />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const expected = 'foo';

  assert.equals(formsyForm.getCurrentValues().test, expected);

  assert.equals(wrapper.find('input').node.value, expected);

  assert.end();
});

test('FormsyAutoComplete validation Errors are displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} validations='maxLength:2' validationError='foo' value='bar' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  const textField = wrapper.find('TextField').node;

  assert.equals(formsyAutoComplete.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.equals(formsyAutoComplete.isValid(), false);

  assert.end();
});

test('FormsyAutoComplete validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} validations='maxLength:3' validationError='foo' value='bar' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  assert.equals(formsyAutoComplete.getErrorMessage(), null);

  assert.equals(formsyAutoComplete.isValid(), true);

  assert.end();
});

test('FormsyAutoComplete resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} value='foo' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  assert.equals(formsyAutoComplete.getValue(), 'foo');

  wrapper.find('input').simulate('change', {target: {value: 'bar'}});

  assert.equals(formsyAutoComplete.getValue(), 'bar');

  formsyAutoComplete.resetValue();

  assert.equals(formsyAutoComplete.getValue(), 'foo');

  assert.end();
});

test('FormsyAutoComplete Blur event updates the value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} value='foo' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  assert.equals(formsyAutoComplete.getValue(), 'foo');

  wrapper.find('input').simulate('blur', {target: {value: 'bar'}});

  assert.equals(formsyAutoComplete.getValue(), 'bar');

  assert.end();
});

test('FormsyAutoComplete onBlur prop is called', (assert) => {
  const onBlurSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} onBlur={onBlurSpy} />
    </Form>
  );

  wrapper.find('input').simulate('blur');

  assert.equals(onBlurSpy.calledOnce, true);

  assert.end();
});

test('FormsyAutoComplete onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change', {target: {value: 'bar'}});

  assert.equals(onChangeSpy.calledOnce, true);

  assert.end();
});

test('FormsyAutoComplete onKeyDown prop is called', (assert) => {
  const onKeyDownSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} onKeyDown={onKeyDownSpy} value='foo' />
    </Form>
  );

  assert.equals(wrapper.find('input').node.value, 'foo');

  wrapper.find('input').simulate('keydown', {keyCode: 13, target: {value: 'bar'}});

  assert.equals(wrapper.find('input').node.value, 'bar');

  assert.equals(onKeyDownSpy.calledOnce, true);

  assert.end();
});

test('FormsyAutoComplete respects disabled prop of Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyAutoComplete name='test' dataSource={[]} />
    </Form>
  );

  assert.equals(wrapper.find('input').node.disabled, true);

  assert.end();
});

test('FormsyAutoComplete disabled prop propagetes to Material UI AutoComplete', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} value='foo' disabled />
    </Form>
  );

  assert.equals(wrapper.find(FormsyAutoComplete).node.props.disabled, true);

  assert.equals(wrapper.find(AutoComplete).node.props.disabled, true);

  assert.equals(wrapper.find('input').node.disabled, true);

  assert.end();
});

test('FormsyAutoComplete allows overriding Formsy Form disabled prop', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyAutoComplete name='test' dataSource={[]} value='foo' disabled={false} />
    </Form>
  );

  assert.equals(wrapper.node.props.disabled, true);

  assert.equals(wrapper.find(FormsyAutoComplete).node.props.disabled, false);

  assert.equals(wrapper.find(AutoComplete).node.props.disabled, false);

  assert.equals(wrapper.find('input').node.disabled, false);

  assert.end();
});

test('FormsyAutoComplete required prop invalidates form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} required />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  const input = wrapper.find('input').node;

  assert.equals(formsyForm.state.isValid, false);

  assert.equals(formsyAutoComplete.isRequired(), true);

  assert.equals(formsyAutoComplete.showRequired(), true);

  assert.equals(formsyAutoComplete.isValidValue(), false);

  assert.equals(input.required, true);

  assert.end();
});

test('FormsyAutoComplete requiredError message is displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} required requiredError='foo' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  const textField = wrapper.find('TextField').node;

  // Required error will not be displayed until the form is submitted
  assert.equals(formsyAutoComplete.getErrorMessage(), null);

  wrapper.simulate('submit');

  assert.equals(formsyAutoComplete.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.end();
});
