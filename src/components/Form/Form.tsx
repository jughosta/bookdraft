import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import { FormField, FormValues } from '../../types/form.type';

interface IProps {
  fields: FormField[];
  onSubmit: (values: FormValues) => Promise<void>;
}

interface IState {
  values: FormValues;
}

class Form extends React.Component<IProps, IState> {
  state = {
    values: this.props.fields.reduce<FormValues>((values, field) => {
      values[field.name] = field.defaultValue;
      return values;
    }, {}),
  };

  handleChange = (value: string, field: FormField) => {
    const { values } = this.state;

    if (values[field.name] !== value) {
      this.setState((state: IState) => {
        const newValues: FormValues = { ...state.values };
        newValues[field.name] = value;

        return {
          values: newValues,
        };
      });
    }
  };

  handleSubmit = async () => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    // TODO: add validation and show errors
    await onSubmit(values);
  };

  render() {
    const { fields } = this.props;
    const { values } = this.state;

    return (
      <View style={styles.container}>
        {fields.map(field => (
          <View
            style={styles.field}
            key={`${field.name}-${values[field.name]}`}>
            <FormInput
              field={field}
              value={values[field.name]}
              onChange={this.handleChange}
            />
          </View>
        ))}
        <View style={styles.action}>
          <Button title="Submit" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

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
