An uncontrolled Checkbox example
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
  <button onClick={() => setState({value: !state.value})}>Toggle Checkbox</button>
</div>
```

A defaultChecked Checkbox example
```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
  defaultChecked={true}
/>
```

A required Checkbox example
```jsx
<div>
  <FormsyCheckbox
    name='foo'
    label='foo *'
    required='isFalse'
  />
  <br />
  <div>* Required field</div>
</div>
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
  <button disabled={!state.value}>Hello</button>
</div>
```
