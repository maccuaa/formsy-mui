A simple Date example
```jsx
<FormsyDate
  name='foo'
  floatingLabelText='foo'
/>
```

A controlled Date example
```jsx
initialState = { value: new Date(2017, 1, 1) };
<div>
  <FormsyDate
    name='foo'
    value={state.value} />
  <br />
  <button onClick={() => setState({value: new Date()})}>Today</button>
</div>
```

An uncontrolled Date example
```jsx
<FormsyDate
  name='foo'
  defaultDate={new Date(2017, 1, 1)}
/>  
```

A required Date example
```jsx
<FormsyDate
  name='foo'
  floatingLabelText='Foo'
  required
  requiredError='Field is required.'
/>
```

A required Date example
```jsx
<FormsyDate
  name='foo'
  floatingLabelText='Foo'
  required='isDefaultRequiredValue'
  validationError='Field is required.'
  requiredError='Field is required.'
/>
```
