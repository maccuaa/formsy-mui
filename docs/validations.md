The following section contains validation examples using the validation rules from the [formsy-react-2](https://github.com/maccuaa/formsy-react-2) library and the components found in this libary.

---

### isExisty

The form value is not null or undefined.

```jsx
<FormsyText
  name='foo'
  validations='isExisty'
  validationError='Invalid input'
/>
```

### matchRegexp

The form value matches the regular expression.

```jsx
<FormsyText
  name='email'
  floatingLabelText='Email'
  validations={{ matchRegexp: /^.+@.+\..+$/ }}
  validationError='Invalid email'
  required
/>
```
