The following section contains for complex examples that you might find in the real world.

### General user information form

This example uses uncontrolled form components.

```
<div>
  <FormsyText
    name='name'
    floatingLabelText='Name'
    required
    requiredError='Field is required'
    validations={{
      isSpecialWords: true,
      maxLength: 100
    }}
    validationErrors={{
      isSpecialWords: 'Invalid name',
      maxLength: 'Name cannot exceed 100 characters'
    }}
  />

  <FormsyText
    name='email'
    floatingLabelText='Email'
    required
    requiredError='Field is required'
    validations='isEmail'
    validationError='Invalid email'
  />

  <FormsyDate
    name='dob'
    floatingLabelText='Date of birth'
    required
    requiredError='Field is required'
  />

  <h5>Gender</h5>
  <FormsyRadioGroup name='gender' required>
    <FormsyRadio value='male' label='Male' />
    <FormsyRadio value='female' label='Female' />
  </FormsyRadioGroup>

  <h5>Terms of Use</h5>
  <FormsyCheckbox
    name='terms'
    label='I have read and accept the Terms of Use'
    validations='isTrue'
  />
</div>
```

### Default Data

This example uses uncontrolled form components with default values passed from state.

```
initialState={
  user: {
    name: 'John Doe',
    email: 'john@doe.com',
    dob: new Date(2000, 1, 1),
    gender: 'male'
  }
};
<div>
  <FormsyText
    name='name'
    floatingLabelText='Name'
    defaultValue={state.user.name}
    required
    requiredError='Field is required'
    validations={{
      isSpecialWords: true,
      maxLength: 100
    }}
    validationErrors={{
      isSpecialWords: 'Invalid name',
      maxLength: 'Name cannot exceed 100 characters'
    }}
  />

  <FormsyText
    name='email'
    floatingLabelText='Email'
    defaultValue={state.user.email}
    required
    requiredError='Field is required'
    validations='isEmail'
    validationError='Invalid email'
  />

  <FormsyDate
    name='dob'
    defaultDate={state.user.dob}
    floatingLabelText='Date of birth'
    required
    requiredError='Field is required'
  />

  <h5>Gender</h5>
  <FormsyRadioGroup name='gender' required defaultSelected={state.user.gender}>
    <FormsyRadio value='male' label='Male' />
    <FormsyRadio value='female' label='Female' />
  </FormsyRadioGroup>

  <h5>Terms of Use</h5>
  <FormsyCheckbox
    name='terms'
    label='I have read and accept the Terms of Use'
    validations='isTrue'
  />
</div>
```

### Controlled Default Data

This example uses controlled form components with default values passed from state.  The `stateProvince` field is only enabled once a country has been selected.  At the bottom of the example is a table showing this components state.  To see why the `onChange` prop is needed for controlled components try removing the `onChange` prop from the **country** form field.   You will see that the Formsy Form value will still be updated however this forms state variable won't be.

```
initialState={
  user: {
    name: 'John Doe',
    email: 'john@doe.com',
    country: '',
    stateProvince: '',
    dob: new Date(2000, 1, 1),
    gender: 'male'
  }
};
<div>
  <FormsyText
    name='name'
    floatingLabelText='Name'
    value={state.user.name}
    required
    requiredError='Field is required'
    onChange={(e, v) => {
      const { user } = state;
      user.name = v;
      setState({ user });
    }}
    validations={{
      isSpecialWords: true,
      maxLength: 100
    }}
    validationErrors={{
      isSpecialWords: 'Invalid name',
      maxLength: 'Name cannot exceed 100 characters'
    }}
  />

  <FormsyText
    name='email'
    floatingLabelText='Email'
    value={state.user.email}
    required
    requiredError='Field is required'
    onChange={(e, v) => {
      const { user } = state;
      user.email = v;
      setState({ user });
    }}
    validations='isEmail'
    validationError='Invalid email'
  />

  <FormsySelect
    name='country'
    floatingLabelText='Country'
    value={state.user.country}
    onChange={(e, k, v) => {
      const { user } = state;
      user.country = v;
      setState({ user });
    }}
    required
    requiredError='Field is required'>
    <MenuItem value={null} primaryText='' />
    <MenuItem value='Canada' primaryText='Canada' />
    <MenuItem value='United States' primaryText='United States' />
  </FormsySelect>

  <FormsyText
    name='stateProvince'
    floatingLabelText='State / Province'
    value={state.user.stateProvince}
    required
    requiredError='Field is required'
    disabled={!state.user.country}
    onChange={(e, v) => {
      const { user } = state;
      user.stateProvince = v;
      setState({ user });
    }}
  />

  <FormsyDate
    name='dob'
    value={state.user.dob}
    floatingLabelText='Date of birth'
    required
    requiredError='Field is required'
    onChange={(e, v) => {
      const { user } = state;
      user.dob = v;
      setState({ user });
    }}
  />

  <h5>Gender</h5>
  <FormsyRadioGroup
    name='gender'
    required
    valueSelected={state.user.gender}
    onChange={(e, v) => {
      const { user } = state;
      user.gender = v;
      setState({ user });
    }}>
    <FormsyRadio value='male' label='Male' />
    <FormsyRadio value='female' label='Female' />
  </FormsyRadioGroup>

  <h5>Terms of Use</h5>
  <FormsyCheckbox
    name='terms'
    label='I have read and accept the Terms of Use'
    validations='isTrue'
  />
  <br />
  <hr />
  <br />
  <span>Form state</span>
  <PropsTable model={state.user} />
</div>
```
