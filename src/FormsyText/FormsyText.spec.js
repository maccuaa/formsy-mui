import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react-2';

import test from 'tape';
import Sinon from 'sinon';

import TextField from 'material-ui/TextField';
import FormsyText from './FormsyText';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyText renders a material-ui TextField', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' />
    </Form>
  );

  assert.equals(wrapper.find(TextField).length, 1);

  assert.end();
});

test('FormsyText change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyTextField = wrapper.find(FormsyText).node;

  const expected = 'foo';

  wrapper.find('input').simulate('change', {target: {value: expected}});

  // Make sure the FormsyText component has the right value
  assert.equals(formsyTextField.getValue(), expected);

  // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, expected);

  // Make sure the DOM has the right value
  assert.equals(wrapper.find('input').node.value, expected);

  assert.end();
});

test('FormsyText value prop sends value to Formsy Form', (assert) => {
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
          <FormsyText name='test' value={this.state.value} />
        </Form>
      );
    }
  }
  const wrapper = mountWithContext(<MyComponent />);

  const formsyForm = wrapper.find(Form).node;

  const myComponent = wrapper.find(MyComponent).node;

  assert.equals(formsyForm.getCurrentValues().test, 'foo');

  assert.equals(wrapper.find('input').node.value, 'foo');

  myComponent.changeValue();

  assert.equals(formsyForm.getCurrentValues().test, 'bar');

  assert.end();
});

test('FormsyText validation Errors are displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' validations='maxLength:2' validationError='foo' value='bar' />
    </Form>
  );

  const formsyTextField = wrapper.find(FormsyText).node;

  const textField = wrapper.find(TextField).node;

  assert.equals(formsyTextField.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.false(formsyTextField.isValid());

  assert.end();
});

test('FormsyText validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' validations='maxLength:3' validationError='foo' value='bar' />
    </Form>
  );

  const formsyTextField = wrapper.find(FormsyText).node;

  assert.equals(formsyTextField.getErrorMessage(), null);

  assert.true(formsyTextField.isValid());

  assert.end();
});

test('FormsyText resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' value='foo' />
    </Form>
  );

  const formsyTextField = wrapper.find(FormsyText).node;

  assert.equals(formsyTextField.getValue(), 'foo');

  wrapper.find('input').simulate('change', {target: {value: 'bar'}});

  assert.equals(formsyTextField.getValue(), 'bar');

  formsyTextField.resetValue();

  assert.equals(formsyTextField.getValue(), 'foo');

  assert.end();
});

test('FormsyText Blur event updates the value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' value='foo' />
    </Form>
  );

  const formsyTextField = wrapper.find(FormsyText).node;

  assert.equals(formsyTextField.getValue(), 'foo');

  wrapper.find('input').simulate('blur', {target: {value: 'bar'}});

  assert.equals(formsyTextField.getValue(), 'bar');

  assert.end();
});

test('FormsyText onBlur prop is called', (assert) => {
  const onBlurSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' onBlur={onBlurSpy} />
    </Form>
  );

  wrapper.find('input').simulate('blur');

  assert.true(onBlurSpy.calledOnce);

  assert.end();
});

test('FormsyText onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change', {target: {value: 'bar'}});

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyText respects disabled prop of Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyText name='test' />
    </Form>
  );

  assert.true(wrapper.find('input').node.disabled);

  assert.end();
});

test('FormsyText disabled prop propagetes to Material UI TextField', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' value='foo' disabled />
    </Form>
  );

  assert.true(wrapper.find(FormsyText).node.props.disabled);

  assert.true(wrapper.find(TextField).node.props.disabled);

  assert.true(wrapper.find('input').node.disabled);

  assert.end();
});

test('FormsyText allows overriding Formsy Form disabled prop', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyText name='test' value='foo' disabled={false} />
    </Form>
  );

  assert.true(wrapper.node.props.disabled);

  assert.false(wrapper.find(FormsyText).node.props.disabled);

  assert.false(wrapper.find(TextField).node.props.disabled);

  assert.false(wrapper.find('input').node.disabled);

  assert.end();
});

test('FormsyText required prop invalidates form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' required />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyTextField = wrapper.find(FormsyText).node;

  const input = wrapper.find('input').node;

  assert.false(formsyForm.state.isValid);

  assert.true(formsyTextField.isRequired());

  assert.true(formsyTextField.showRequired());

  assert.false(formsyTextField.isValidValue());

  assert.true(input.required);

  assert.end();
});

test('FormsyText requiredError message is displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' required requiredError='foo' />
    </Form>
  );

  const formsyTextField = wrapper.find(FormsyText).node;

  const textField = wrapper.find(TextField).node;

  // Required error will not be displayed until the form is submitted
  assert.equals(formsyTextField.getErrorMessage(), null);

  wrapper.simulate('submit');

  assert.equals(formsyTextField.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.end();
});

test('FormsyText only show error message on blur', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' validations='maxLength:9' validationError='foo' />
    </Form>
  );

  const formsyText = wrapper.find(FormsyText).node;

  const input = wrapper.find('input');

  const text = '1234567890';

  // Simulate rapid typing
  text.split('').forEach((acc, letter) => {
    input.simulate('change', {target: {value: acc}});
  });

  assert.equals(formsyText.getErrorMessage(), null);

  input.simulate('blur', {target: {value: text}});

  assert.equals(formsyText.getErrorMessage(), 'foo');

  assert.end();
});

test('FormsyText updateImmediately shows error after debounce limit', async (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='test' updateImmediately validations='maxLength:9' validationError='foo' />
    </Form>
  );

  const formsyText = wrapper.find(FormsyText).node;

  const input = wrapper.find('input');

  const text = '1234567890';

  // Simulate rapid typing
  text.split('').reduce((acc, letter) => {
    input.simulate('change', {target: {value: acc}});
    return acc.concat(letter);
  }, '0');

  assert.equals(formsyText.getErrorMessage(), null);

  let wait = ms => new Promise(resolve => setTimeout(resolve, ms)); // eslint-disable-line promise/avoid-new

  await wait(500);

  assert.equals(formsyText.getErrorMessage(), 'foo');

  assert.end();
});

test('FormsyText falsey values are correctly set', (assert) => {
  const zero = 0;
  const notTrue = false;
  const nill = null;
  const notdefined = undefined;

  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='zero' value={zero} />
      <FormsyText name='notTrue' value={notTrue} />
      <FormsyText name='nill' value={nill} />
      <FormsyText name='notdefined' value={notdefined} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formValues = formsyForm.getCurrentValues();

  assert.equals(formValues.zero, zero);

  assert.equals(formValues.notTrue, notTrue);

  assert.equals(formValues.nill, nill);

  assert.equals(formValues.notdefined, notdefined);

  assert.end();
});

test('FormsyText falsey defaultValues are correctly set', (assert) => {
  const zero = 0;
  const notTrue = false;
  const nill = null;
  const notdefined = undefined;

  const wrapper = mountWithContext(
    <Form>
      <FormsyText name='zero' defaultValue={zero} />
      <FormsyText name='notTrue' defaultValue={notTrue} />
      <FormsyText name='nill' defaultValue={nill} />
      <FormsyText name='notdefined' defaultValue={notdefined} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formValues = formsyForm.getCurrentValues();

  assert.equals(formValues.zero, zero);

  assert.equals(formValues.notTrue, notTrue);

  assert.equals(formValues.nill, nill);

  assert.equals(formValues.notdefined, notdefined);

  assert.end();
});
