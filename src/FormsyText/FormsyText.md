A simple TextField example
```jsx
<FormsyText
  name='foo'
/>
```

A controlled TextField example
```jsx
initialState = { value: 'foo' };
<div>
  <FormsyText
    name='foo'
    onChange={(event, value) => { setState({ value })}}
    value={state.value} />
  <br />
  <RaisedButton label='bar' onClick={() => setState({value: 'bar'})} />
</div>
```

An uncontrolled TextField with a default value
```jsx
<FormsyText
  name='foo'
  defaultValue={'foo'}
/>
```

A required TextField example
```jsx
<FormsyText
  name='foo'
  required
  requiredError='Field is required.'
/>
```

TextField onChange example
```jsx
initialState = { value: 'foo' };
<div>
  <FormsyText
    name='foo'
    value={state.value}
    onChange={(event, value) => { setState({value}) }}
  />
  <br />
  <div>Hello <strong>{state.value}!</strong></div>
</div>
```

**updateImmediately**

By default, if the TextField has validations the value of the TextField will only be updated once the user has left the input or the user has entered a valid value.  You can use the updateImmediately prop to update the value of the TextField as the user is typing.  For more information see the documentation of the updateImmediately prop.
```jsx
<div>
  <p>Each input has the <strong>isInt</strong> validation.</p>
  <FormsyText
    name='foo'
    hintText='Without updateImmediately'
    floatingLabelText='foo'
    floatingLabelFixed
    validations='isInt'
    validationError='Input is not a number'
  />
  <br />
  <FormsyText
    name='bar'
    hintText='With updateImmediately'
    floatingLabelText='bar'
    floatingLabelFixed
    validations='isInt'
    validationError='Input is not a number'
    updateImmediately
  />
</div>
```
