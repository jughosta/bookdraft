import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import { FormSubmittingStatus } from '../../utils/form';

import { FormField, FormValues } from '../../types/form.type';

interface IProps {
  fields: FormField[];
  onSubmit: (values: FormValues) => Promise<void>;
}

interface IState {
  values: FormValues;
  status: FormSubmittingStatus;
}

class Form extends React.Component<IProps, IState> {
  state = {
    values: this.props.fields.reduce<FormValues>((values, field) => {
      values[field.name] = field.defaultValue;
      return values;
    }, {}),
    status: FormSubmittingStatus.initial,
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

    this.setState({
      status: FormSubmittingStatus.processing,
    });

    try {
      await onSubmit(values);

      this.setState({
        status: FormSubmittingStatus.succeeded,
      });
    } catch (error) {
      this.setState({
        status: FormSubmittingStatus.failed,
      });
    }
  };

  render() {
    const { fields } = this.props;
    const { values, status } = this.state;
    const isSubmitting = status === FormSubmittingStatus.processing;

    return (
      <View style={styles.container}>
        {fields.map(field => (
          <View style={styles.field} key={field.name}>
            <FormInput
              field={field}
              value={values[field.name]}
              onChange={this.handleChange}
            />
          </View>
        ))}
        <View style={styles.action}>
          <Button
            title={isSubmitting ? 'Submitting...' : 'Submit'}
            disabled={isSubmitting || Object.keys(values).some(k => !values[k])}
            onPress={this.handleSubmit}
          />
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
