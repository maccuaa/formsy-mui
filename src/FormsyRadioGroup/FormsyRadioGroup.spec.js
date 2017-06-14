import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react';

import test from 'tape';
import Sinon from 'sinon';

import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import FormsyRadio from '../FormsyRadio';
import FormsyRadioGroup from './FormsyRadioGroup';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyRadioGroup renders a material-ui RadioButtonGroup', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test' />
    </Form>
  );

  assert.equals(wrapper.find(RadioButtonGroup).length, 1);

  assert.end();
});

test('FormsyRadioGroup sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test' valueSelected='foo'>
        <FormsyRadio value='foo' />
      </FormsyRadioGroup>
    </Form>
  );

  const expected = 'foo';

  const formsyForm = wrapper.find(Form).node;

  const input = wrapper.find('input').node;

    // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, expected);

    // Make sure the DOM has the right value
  assert.true(input.checked);

  assert.end();
});

test('FormsyRadioGroup resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test' valueSelected='foo'>
        <FormsyRadio value='foo' />
        <FormsyRadio value='bar' />
      </FormsyRadioGroup>
    </Form>
  );

  const formsyRadioGroup = wrapper.find(FormsyRadioGroup).node;

  const fooInput = wrapper.find({value: 'foo'});

  const barInput = wrapper.find({value: 'bar'});

  assert.false(barInput.node.checked);

  assert.true(fooInput.node.checked);

  assert.equals(formsyRadioGroup.getValue(), 'foo');

  barInput.node.checked = true;

  barInput.simulate('change');

  assert.equals(formsyRadioGroup.getValue(), 'bar');

  assert.true(barInput.node.checked);

  assert.false(fooInput.node.checked);

  formsyRadioGroup.resetValue();

  assert.equals(formsyRadioGroup.getValue(), 'foo');

  assert.false(barInput.node.checked);

  assert.true(fooInput.node.checked);

  assert.end();
});

test('FormsyRadioGroup onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test' onChange={onChangeSpy}>
        <FormsyRadio value='foo' />
      </FormsyRadioGroup>
    </Form>
  );

  wrapper.find({value: 'foo'}).simulate('change');

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});
