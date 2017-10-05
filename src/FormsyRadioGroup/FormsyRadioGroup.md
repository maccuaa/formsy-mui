A simple Radio Button Group example
```jsx
<FormsyRadioGroup name='test'>
  <FormsyRadio value='foo' label='foo' />
  <FormsyRadio value='bar' label='bar' />
</FormsyRadioGroup>
```

A controlled Radio Button Group example
```jsx
initialState = { value: 'bar' };
<div>
  <FormsyRadioGroup name='test' valueSelected={state.value}>
    <FormsyRadio value='foo' label='foo' />
    <FormsyRadio value='bar' label='bar' />
  </FormsyRadioGroup>
  <br />
  <RaisedButton label='Toggle Radio Button' onClick={() => setState({value: state.value === 'foo' ? 'bar' : 'foo'})} />
</div>
```

An uncontrolled Radio Button Group with a default value
```jsx
<FormsyRadioGroup name='test' defaultSelected={'bar'}>
  <FormsyRadio value='foo' label='foo' />
  <FormsyRadio value='bar' label='bar' />
</FormsyRadioGroup>
```

A required Radio Button Group example
```jsx
<FormsyRadioGroup name='test' required>
  <FormsyRadio value='foo' label='foo' />
  <FormsyRadio value='bar' label='bar' />
</FormsyRadioGroup>
```

Radio Button Group onChange example
```jsx
initialState = { value: 'foo' };
<div>
  <FormsyRadioGroup name='test' defaultSelected={state.value} onChange={(event, value) => { setState({value}) }}>
    <FormsyRadio value='foo' label='foo' />
    <FormsyRadio value='bar' label='bar' />
  </FormsyRadioGroup>
  <br />
  <div>Hello <strong>{state.value}!</strong></div>
</div>
```

Disabled Radio Button Group example
```jsx
<FormsyRadioGroup name='test' defaultSelected={'foo'}>
  <FormsyRadio value='foo' label='foo' disabled />
  <FormsyRadio value='bar' label='bar' disabled />
</FormsyRadioGroup>
```
