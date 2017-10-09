A simple Time example
```jsx
<FormsyTime
  name='foo'
  floatingLabelText='foo'
/>
```

A controlled Time example
```jsx
initialState = { value: new Date(2017, 1, 1) };
<div>
  <FormsyTime
    name='foo'
    value={state.value} />
  <br />
  <RaisedButton label='Today' onClick={() => setState({value: new Date()})} />
</div>
```

An uncontrolled Time with a default value
```jsx
<FormsyTime
  name='foo'
  defaultTime={new Date(2017, 1, 1, 17, 30, 45)}
/>  
```

A required Time example
```jsx
<FormsyTime
  name='foo'
  floatingLabelText='Foo'
  required
  requiredError='Field is required.'
/>
```

Time onChange example
```jsx
initialState = { value: new Date(2017, 1, 1) };
<div>
  <FormsyTime
    name='foo'
    value={state.value}
    onChange={(event, value) => { setState({value}) }}
  />
  <br />
  <div>Foo is <strong>{state.value.toTimeString()}</strong></div>
</div>
```
