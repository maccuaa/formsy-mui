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
  <RaisedButton label='Today' onClick={() => setState({value: new Date()})} />
</div>
```

An uncontrolled Date with a default value
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

Date onChange example
```jsx
initialState = { value: new Date(2017, 1, 1) };
<div>
  <FormsyDate
    name='foo'
    value={state.value}
    onChange={(event, value) => { setState({value}) }}
  />
  <br />
  <div>Foo is <strong>{state.value.toDateString()}</strong></div>
</div>
```
