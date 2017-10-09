A simple Toggle example
```jsx
<FormsyToggle
  name='foo'
  label='foo'
/>
```

A controlled Toggle example
```jsx
initialState = { value: false };
<div>
  <FormsyToggle
    name='foo'
    label='foo'
    toggled={state.value} />
  <br />
  <RaisedButton label='Toggle Toggle' onClick={() => setState({value: !state.value})} />
</div>
```

An uncontrolled Toggle with a default value
```jsx
<FormsyToggle
  name='foo'
  label='foo'
  defaultToggled={true}
/>
```

A required Toggle example
```jsx
<FormsyToggle
  name='foo'
  label='foo'
  required='isFalse'
/>
```

Toggle onChange example
```jsx
initialState = { value: false };
<div>
  <FormsyToggle
    name='foo'
    label='foo'
    defaultToggled={state.value}
    onChange={(event, value) => setState({value})}
  />
  <br />
  <div>Toggle is {state.value ? 'toggled! :)' : 'not toggled :('}</div>
</div>
```

Disabled Toggle example
```jsx
<span>
  <FormsyToggle
    name='foo'
    label='foo'
    disabled
  />
  <FormsyToggle
    name='bar'
    label='bar'
    defaultToggled
    disabled
  />
</span>
``` 
