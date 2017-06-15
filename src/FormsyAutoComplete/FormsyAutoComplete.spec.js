import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react-2';

import test from 'tape';
import Sinon from 'sinon';

import AutoComplete from 'material-ui/AutoComplete';
import FormsyAutoComplete from './FormsyAutoComplete';

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

test('FormsyAutoComplete searchText prop sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} searchText='foo' />
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
      <FormsyAutoComplete name='test' dataSource={[]} validations='maxLength:2' validationError='foo' searchText='bar' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  const textField = wrapper.find('TextField').node;

  assert.equals(formsyAutoComplete.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.false(formsyAutoComplete.isValid());

  assert.end();
});

test('FormsyAutoComplete validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} validations='maxLength:3' validationError='foo' searchText='bar' />
    </Form>
  );

  const formsyAutoComplete = wrapper.find(FormsyAutoComplete).node;

  assert.equals(formsyAutoComplete.getErrorMessage(), null);

  assert.true(formsyAutoComplete.isValid());

  assert.end();
});

test('FormsyAutoComplete resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} searchText='foo' />
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
      <FormsyAutoComplete name='test' dataSource={[]} searchText='foo' />
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

  assert.true(onBlurSpy.calledOnce);

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

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyAutoComplete onKeyDown prop is called', (assert) => {
  const onKeyDownSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} onKeyDown={onKeyDownSpy} searchText='foo' />
    </Form>
  );

  assert.equals(wrapper.find('input').node.value, 'foo');

  wrapper.find('input').simulate('keydown', {keyCode: 13, target: {value: 'bar'}});

  assert.equals(wrapper.find('input').node.value, 'bar');

  assert.true(onKeyDownSpy.calledOnce);

  assert.end();
});

test('FormsyAutoComplete respects disabled prop of Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyAutoComplete name='test' dataSource={[]} />
    </Form>
  );

  assert.true(wrapper.find('input').node.disabled);

  assert.end();
});

test('FormsyAutoComplete disabled prop propagetes to Material UI AutoComplete', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyAutoComplete name='test' dataSource={[]} searchText='foo' disabled />
    </Form>
  );

  assert.true(wrapper.find(FormsyAutoComplete).node.props.disabled);

  assert.true(wrapper.find(AutoComplete).node.props.disabled);

  assert.true(wrapper.find('input').node.disabled);

  assert.end();
});

test('FormsyAutoComplete allows overriding Formsy Form disabled prop', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyAutoComplete name='test' dataSource={[]} searchText='foo' disabled={false} />
    </Form>
  );

  assert.true(wrapper.node.props.disabled);

  assert.false(wrapper.find(FormsyAutoComplete).node.props.disabled);

  assert.false(wrapper.find(AutoComplete).node.props.disabled);

  assert.false(wrapper.find('input').node.disabled);

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

  assert.false(formsyForm.state.isValid);

  assert.true(formsyAutoComplete.isRequired());

  assert.true(formsyAutoComplete.showRequired());

  assert.false(formsyAutoComplete.isValidValue());

  assert.true(input.required);

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
