import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Form} from 'formsy-react-2';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Checkbox from 'material-ui/Checkbox';
import FormsyCheckbox from './FormsyCheckbox';

import test from 'tape';
import Sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

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
      <FormsyCheckbox name='test' checked />
    </Form>
  );

  const formsyForm = wrapper.find(Form).instance();

  const formsyCheckbox = wrapper.find(FormsyCheckbox).instance();

  const input = wrapper.find('input').instance();

  // Make sure the formsyCheckbox component has the right value
  assert.true(formsyCheckbox.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  // Make sure the DOM has the right value
  assert.true(input.checked);

  assert.end();
});

test('FormsyCheckbox change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' checked={false} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).instance();

  const formsyCheckbox = wrapper.find(FormsyCheckbox).instance();

  const input = wrapper.find('input');

  input.instance().checked = true;

  input.simulate('change');

  // Make sure the formsyCheckbox component has the right value
  assert.true(formsyCheckbox.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  assert.end();
});

test('FormsyCheckbox resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' checked={false} />
    </Form>
  );

  const formsyCheckbox = wrapper.find(FormsyCheckbox).instance();

  const input = wrapper.find('input');

  assert.false(input.instance().checked);

  input.instance().checked = true;

  input.simulate('change');

  assert.true(formsyCheckbox.getValue());

  formsyCheckbox.resetValue();

  assert.false(formsyCheckbox.getValue());

  assert.false(input.instance().checked);

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

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyCheckbox updates value as a controlled component', (assert) => {
  class MyComponent extends React.PureComponent {
    constructor (props) {
      super(props);
      this.state = {
        value: true
      };
    }

    changeValue () {
      this.setState({value: false});
    }

    render () {
      return (
        <Form>
          <FormsyCheckbox name='test' checked={this.state.value} />
        </Form>
      );
    }
  }

  const wrapper = mountWithContext(<MyComponent />);

  const myComponent = wrapper.find(MyComponent).instance();

  const formsyForm = wrapper.find(Form).instance();

  const formsyCheckbox = wrapper.find(FormsyCheckbox).instance();

  const input = wrapper.find('input');

  assert.true(formsyCheckbox.getValue());

  assert.true(formsyForm.getCurrentValues().test);

  assert.true(input.instance().checked);

  myComponent.changeValue();

  assert.false(formsyCheckbox.getValue());

  assert.false(formsyForm.getCurrentValues().test);

  assert.false(input.instance().checked);

  assert.end();
});

test('FormsyCheckbox defaultChecked sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' defaultChecked />
    </Form>
  );

  const formsyForm = wrapper.find(Form).instance();

  const formsyCheckbox = wrapper.find(FormsyCheckbox).instance();

  const input = wrapper.find('input').instance();

  // Make sure the formsyCheckbox component has the right value
  assert.true(formsyCheckbox.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  // Make sure the DOM has the right value
  assert.true(input.checked);

  assert.end();
});

test('FormsyCheckbox is disabled when form is disabled', (assert) => {
  const wrapper = mountWithContext(
    <Form disabled>
      <FormsyCheckbox name='test' checked />
    </Form>
  );

  const formsyForm = wrapper.find(Form).instance();

  const checkbox = wrapper.find(Checkbox).instance();

  const input = wrapper.find('input').instance();

  // Make sure the Formsy Form component is disabled
  assert.true(formsyForm.isFormDisabled());

  // Make sure the Checkbox is disabled
  assert.true(checkbox.props.disabled);

  // Make sure the DOM has the right value
  assert.true(input.disabled);

  assert.end();
});
