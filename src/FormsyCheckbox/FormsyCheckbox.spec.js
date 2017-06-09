import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react';

import Checkbox from 'material-ui/Checkbox';
import FormsyCheckbox from './FormsyCheckbox';

import test from 'tape';
import Sinon from 'sinon';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyCheckbox renders a material-ui Checkbox', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' />
    </Form>
  );

  assert.equals(wrapper.find(Checkbox).length, 1);

  assert.end();
});

test('FormsyCheckbox sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' value />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input').node;

  const expected = true;

  // Make sure the formsyCheckbox component has the right value
  assert.equals(formsyCheckbox.getValue(), expected);

  // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, expected);

  // Make sure the DOM has the right value
  assert.equals(input.checked, expected);

  assert.end();
});

test('FormsyCheckbox change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' value={false} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input');

  const expected = true;

  input.node.checked = expected;

  input.simulate('change');

  // Make sure the formsyCheckbox component has the right value
  assert.equals(formsyCheckbox.getValue(), expected);

  // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, expected);

  // Make sure the DOM has the right value
  assert.equals(input.node.checked, expected);

  assert.end();
});

test('FormsyCheckbox resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' value={false} />
    </Form>
  );

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input');

  assert.equals(input.node.checked, false);

  input.node.checked = true;

  input.simulate('change');

  assert.equals(formsyCheckbox.getValue(), true);

  formsyCheckbox.resetValue();

  assert.equals(formsyCheckbox.getValue(), false);

  assert.equals(input.node.checked, false);

  assert.end();
});

test('FormsyCheckbox onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change');

  assert.equals(onChangeSpy.calledOnce, true);

  assert.end();
});
