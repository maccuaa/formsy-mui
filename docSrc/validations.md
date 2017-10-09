The following section contains validation examples using the validation rules from the [formsy-react-2](https://github.com/maccuaa/formsy-react-2) library and the components found in this libary.

---

### isExisty

The form value is not `null` or `undefined`.

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
  updateImmediately
  defaultValue=''
/>
```

### isUndefined

The form value is `undefined`.

```jsx
<div>
  <FormsyText
    name='foo'
    hintText='undefined'
    validations='isUndefined'
    validationError='Invalid input'
  />
  <FormsyText
    name='bar'
    hintText='null'
    validations='isUndefined'
    validationError='Invalid input'
    defaultValue={null}
  />
</div>
```

### isEmptyString

The form value is an empty string `""`.

```jsx
<FormsyText
  name='foo'
  defaultValue=''
  hintText='empty string'
  validations='isEmptyString'
  validationError='Invalid input'
/>
```

### isEmail

The form value is a valid email.

```jsx
<FormsyText
  name='email'
  floatingLabelText='Email'
  validations='isEmail'
  validationError='Invalid email'
  required
  updateImmediately
/>
```

### isUrl

The form value is a valid URL.

```jsx
<FormsyText
  name='url'
  floatingLabelText='URL'
  validations='isUrl'
  validationError='Invalid URL'
  required
  updateImmediately
/>
```

### isTrue

The form value is `true`.

```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
  validations='isTrue'
/>
```

### isFalse

The form value is `false`.

```jsx
<FormsyCheckbox
  name='foo'
  label='foo'
  defaultChecked
  validations='isFalse'
/>
```

### isNumeric

The form value is a number.

```jsx
<FormsyText
  name='foo'
  validations='isNumeric'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isAlpha

The form value can only contain letters.

```jsx
<FormsyText
  name='foo'
  validations='isAlpha'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isAlphanumeric

The form value can only contain alphanumeric characters (letters and numbers).

```jsx
<FormsyText
  name='foo'
  validations='isAlphanumeric'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isInt

The form value must be an integer.

```jsx
<FormsyText
  name='foo'
  validations='isInt'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isFloat

The form value must be a float.

```jsx
<FormsyText
  name='foo'
  validations='isFloat'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isWords

The form value must contain words.

```jsx
<FormsyText
  name='foo'
  validations='isWords'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isSpecialWords

The form value must contain words and can include special characters from À ([\u00C0](https://unicode-table.com/en/#00C0)) to ſ ([\u017F](https://unicode-table.com/en/#017F)).

```jsx
<FormsyText
  name='foo'
  validations='isSpecialWords'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### isLength

The length of the form value must equal a certain length.

```jsx
<FormsyText
  name='foo'
  floatingLabelText='Must be 5 characters'
  validations='isLength:5'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### equals

The form value must equal a certain value.

```jsx
<FormsyText
  name='foo'
  floatingLabelText='Must be "bar"'
  validations='equals:bar'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### equalsField

The form value must equal another field.

```jsx
<div>
  <FormsyText
    name='password1'
    type='password'
    floatingLabelText='Password'
    required
    updateImmediately
  />
  <FormsyText
    name='password2'
    type='password'
    floatingLabelText='Confirm Password'
    validations='equalsField:password1'
    validationError='Passwords do not match'
    required
    updateImmediately
  />
</div>
```

### maxLength

The form value can be at most a certain length.

```jsx
<FormsyText
  name='foo'
  floatingLabelText='Max 5 characters'
  validations='maxLength:5'
  validationError='Invalid input'
  required
  updateImmediately
/>
```

### minLength

The form value must be at least a certain length.

```jsx
<FormsyText
  name='foo'
  floatingLabelText='Min 5 characters'
  validations='minLength:5'
  validationError='Invalid input'
  required
  updateImmediately
/>
```
