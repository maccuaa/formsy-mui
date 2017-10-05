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
