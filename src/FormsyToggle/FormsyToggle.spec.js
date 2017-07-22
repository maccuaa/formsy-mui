import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react-2';

import Toggle from 'material-ui/Toggle';
import FormsyToggle from './FormsyToggle';

import test from 'tape';
import Sinon from 'sinon';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyToggle renders a material-ui Toggle', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyToggle name='test' />
    </Form>
  );

  assert.equals(wrapper.find(Toggle).length, 1);

  assert.end();
});

test('FormsyToggle sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyToggle name='test' toggled />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyToggle = wrapper.find(FormsyToggle).node;

  const input = wrapper.find('input').node;

  // Make sure the formsyToggle component has the right value
  assert.true(formsyToggle.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  // Make sure the DOM has the right value
  assert.true(input.checked);

  assert.end();
});

test('FormsyToggle change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyToggle name='test' toggled={false} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyToggle = wrapper.find(FormsyToggle).node;

  const input = wrapper.find('input');

  input.node.checked = true;

  input.simulate('change');

  // Make sure the formsyToggle component has the right value
  assert.true(formsyToggle.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  assert.end();
});

test('FormsyToggle resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyToggle name='test' toggled={false} />
    </Form>
  );

  const formsyToggle = wrapper.find(FormsyToggle).node;

  const input = wrapper.find('input');

  assert.equals(input.node.checked, false);

  input.node.checked = true;

  input.simulate('change');

  assert.true(formsyToggle.getValue());

  formsyToggle.resetValue();

  assert.false(formsyToggle.getValue());

  assert.false(input.node.checked);

  assert.end();
});

test('FormsyToggle onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyToggle name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change');

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});

test('FormsyToggle updates value as a controlled component', (assert) => {
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
          <FormsyToggle name='test' toggled={this.state.value} />
        </Form>
      );
    }
  }

  const wrapper = mountWithContext(<MyComponent />);

  const myComponent = wrapper.find(MyComponent).node;

  const formsyForm = wrapper.find(Form).node;

  const formsyToggle = wrapper.find(FormsyToggle).node;

  const input = wrapper.find('input');

  assert.true(formsyToggle.getValue());

  assert.true(formsyForm.getCurrentValues().test);

  assert.true(input.node.checked);

  myComponent.changeValue();

  assert.false(formsyToggle.getValue());

  assert.false(formsyForm.getCurrentValues().test);

  assert.false(input.node.checked);

  assert.end();
});