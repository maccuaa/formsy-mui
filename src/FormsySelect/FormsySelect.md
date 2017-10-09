A simple uncontrolled Select Field example
```jsx
<FormsySelect name='test'>
  <MenuItem value='foo' primaryText='foo' />
  <MenuItem value='bar' primaryText='bar' />
</FormsySelect>
```

A controlled Select Field example
```jsx
initialState = { value: 'bar' };

onClick = () => {
  if (state.value === 'foo') {
    setState({ value: 'bar' });
  } else {
    setState({ value: 'foo' });
  }
};

<div>
  <FormsySelect name='test' value={state.value}>
    <MenuItem value='foo' primaryText='foo' />
    <MenuItem value='bar' primaryText='bar' />
  </FormsySelect>
  <br />
  <RaisedButton label="Toggle Select Menu" onClick={onClick} />
</div>
```

A required Select Field example
```jsx
<FormsySelect
  name='test'
  value={state.value}
  required
  requiredError='Field is required'>
  <MenuItem value='foo' primaryText='foo' />
  <MenuItem value='bar' primaryText='bar' />
</FormsySelect>
```

Select Field onChange example
```jsx
initialState = { value: 'foo' };

onChange = (event, key, value) => {
  setState({ value });
};

<div>
  <FormsySelect name='test' value={state.value} onChange={onChange}>
    <MenuItem value='foo' primaryText='foo' />
    <MenuItem value='bar' primaryText='bar' />
  </FormsySelect>
  <br />
  <div>Hello <strong>{state.value}!</strong></div>
</div>
```

Disabled SelectField example
```jsx
<FormsySelect name='test' disabled>
  <MenuItem value='foo' primaryText='foo' />
  <MenuItem value='bar' primaryText='bar' />
</FormsySelect>
```
