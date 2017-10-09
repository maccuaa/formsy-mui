import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import Formsy, {Form} from 'formsy-react-2';

import test from 'tape';
import Sinon from 'sinon';

import DatePicker from 'material-ui/DatePicker';
import FormsyDate from './FormsyDate';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

Formsy.addValidationRule('alwaysFalse', () => { return false; }, true);
Formsy.addValidationRule('alwaysTrue', () => { return true; }, true);
const expected = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

test('FormsyDate renders a material-ui DatePicker', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' />
    </Form>
  );

  assert.equals(wrapper.find(DatePicker).length, 1);

  assert.end();
});

test('FormsyDate value prop sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' value={expected} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  assert.equals(formsyForm.getCurrentValues().test, expected);

  const inputValue = wrapper.find('input').node.value;

  // Material-UI will format the date to ISO 8601 (YYYY-MM-DD) format.
  assert.true(new RegExp(/(\d{4})-(\d{2})-(\d{2})/.test(inputValue)));

  assert.end();
});

test('FormsyDate validation Errors are displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' validations='alwaysFalse' validationError='foo' value={new Date()} />
    </Form>
  );

  const formsyDate = wrapper.find(FormsyDate).node;

  const textField = wrapper.find('TextField').node;

  assert.equals(formsyDate.getErrorMessage(), 'foo');

  assert.equals(textField.state.errorText, 'foo');

  assert.false(formsyDate.isValid());

  assert.end();
});

test('FormsyDate validation Errors are not displayed', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' validations='alwaysTrue' validationError='foo' value={new Date()} />
    </Form>
  );

  const formsyDate = wrapper.find(FormsyDate).node;

  assert.equals(formsyDate.getErrorMessage(), null);

  assert.true(formsyDate.isValid());

  assert.end();
});

test('FormsyDate onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change', {target: {value: new Date()}});

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyDate resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyDate name='test' value={expected} />
    </Form>
  );

  const newDate = new Date();

  const formsyDate = wrapper.find(FormsyDate).node;

  assert.equals(formsyDate.getValue(), expected);

  wrapper.find('input').simulate('change', {target: {value: newDate}});

  assert.equals(formsyDate.getValue(), newDate);

  formsyDate.resetValue();

  assert.equals(formsyDate.getValue(), expected);

  assert.end();
});

test('FormsyDate updates value as a controlled component', (assert) => {
  const d1 = new Date(2017, 1, 1);
  const d2 = new Date(2018, 1, 1);

  class MyComponent extends React.PureComponent {
    constructor (props) {
      super(props);
      this.state = {
        value: d1
      };
    }

    changeValue () {
      this.setState({value: d2});
    }

    render () {
      return (
        <Form>
          <FormsyDate name='test' value={this.state.value} />
        </Form>
      );
    }
  }

  const wrapper = mountWithContext(<MyComponent />);

  const myComponent = wrapper.find(MyComponent).node;

  const formsyForm = wrapper.find(Form).node;

  const formsyDate = wrapper.find(FormsyDate).node;

  assert.equals(formsyDate.getValue(), d1);

  assert.equals(formsyForm.getCurrentValues().test, d1);

  myComponent.changeValue();

  assert.equals(formsyDate.getValue(), d2);

  assert.equals(formsyForm.getCurrentValues().test, d2);

  assert.end();
});
