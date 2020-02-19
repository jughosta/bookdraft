import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import { FormSubmittingStatus } from '../../utils/form';

import { FormField, FormValues } from '../../types/form.type';

interface IProps {
  fields: FormField[];
  onSubmit: (values: FormValues) => Promise<void>;
}

function getInitialValues(fields: FormField[]): FormValues {
  return fields.reduce<FormValues>((values, field) => {
    values[field.name] = field.defaultValue;
    return values;
  }, {});
}

const Form = ({ fields, onSubmit }: IProps) => {
  const [values, setValues] = useState(getInitialValues(fields));
  const [status, setStatus] = useState(FormSubmittingStatus.initial);

  const handleChange = (value: string, field: FormField) => {
    if (values[field.name] !== value) {
      setValues({
        ...values,
        [field.name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    setStatus(FormSubmittingStatus.processing);

    try {
      await onSubmit(values);

      setStatus(FormSubmittingStatus.succeeded);
    } catch (error) {
      setStatus(FormSubmittingStatus.failed);
    }
  };

  const isSubmitting = status === FormSubmittingStatus.processing;

  return (
    <View style={styles.container}>
      {fields.map(field => (
        <View style={styles.field} key={field.name}>
          <FormInput
            field={field}
            value={values[field.name]}
            onChange={handleChange}
          />
        </View>
      ))}
      <View style={styles.action}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit'}
          disabled={isSubmitting || Object.keys(values).some(k => !values[k])}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  field: {
    marginBottom: 24,
  },
  action: {
    alignItems: 'flex-start',
  },
});

export default Form;
