A regular uncontrolled Checkbox
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
