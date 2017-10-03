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
    value={state.value} />
  <br />
  <RaisedButton label='bar' onClick={() => setState({value: 'bar'})} />
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
