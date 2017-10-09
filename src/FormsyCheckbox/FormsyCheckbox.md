A simple Checkbox example
```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
/>
```

A controlled Checkbox example
```jsx
initialState = { value: false };
<div>
  <FormsyCheckbox
    name='foo'
    label='foo'
    checked={state.value} />
  <br />
  <RaisedButton label='Toggle Checkbox' onClick={() => setState({value: !state.value})} />
</div>
```

An uncontrolled Checkbox with a default value
```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
  defaultChecked={true}
/>
```

A required Checkbox example
```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
  required='isFalse'
/>
```

Checkbox onChange example
```jsx
initialState = { value: false };
<div>
  <FormsyCheckbox
    name='foo'
    label='foo'
    defaultChecked={state.value}
    onChange={(event, value) => setState({value})}
  />
  <br />
  <div>Checkbox is {state.value ? 'checked! :)' : 'not checked :('}</div>
</div>
```

Disabled Checkbox example
```jsx
<span>
  <FormsyCheckbox
    name='foo'
    label='foo'
    disabled
  />
  <FormsyCheckbox
    name='bar'
    label='bar'
    defaultChecked
    disabled
  />
</span>
```
