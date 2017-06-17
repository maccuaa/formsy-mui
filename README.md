# Formsy MUI

[![npm](https://img.shields.io/npm/v/formsy-mui.svg)](https://www.npmjs.com/package/formsy-mui)
[![npm](https://img.shields.io/npm/dw/formsy-mui.svg)](https://www.npmjs.com/package/formsy-mui)
[![license](https://img.shields.io/github/license/st-andrew/formsy-mui.svg)](https://github.com/st-andrew/formsy-mui)

---
A [Formsy](https://github.com/st-andrew/formsy-react-2) wrapper for [Material-UI](https://github.com/callemall/material-ui) components

### Installation

To get started with Formsy MUI, you can simply install it with npm:

```bash
npm i --save formsy-mui
```

or with yarn

```bash
yarn add formsy-mui
```

Formsy MUI is currently compatible with React 15.5x. For React 15.4.x and below it is recommended that you install [formsy-material-ui](https://github.com/mbrookes/formsy-material-ui) and [formsy-react](https://github.com/christianalfoni/formsy-react) instead.

### Basic Usage

```jsx
import React from 'react';
import Formsy from 'formsy-react-2';
import FormsyText from 'formsy-mui/FormsyText';

class MyForm extends React.Component {
  state = {
    formIsValid: false
  }

  enableSubmit() {
    this.setState({formIsValid: true});
  }

  disableSubmit() {
    this.setState({formIsValid: false});
  }

  submit(model) {
    console.log(model);
    // model = {
    //   foo: 'foo@foo.com',
    //   bar: 10
    // }
  }

  // This code results in a form with Material UI text field and a submit button 
  // that will run the `submit` method when the submit button is clicked with a 
  // valid email. The submit button is disabled as long as the foo input is empty 
  // and the value is not an email. On validation error it will show the error message.

  render() {
    <Formsy.Form onValidSubmit={this.submit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>
      <FormsyText name='foo' validations='isEmail' validationError='This is not a valid email' required />
      <button type="submit" disabled={!this.state.formIsValid}>Submit</button>
    </Formsy.Form>
  }
}
```
