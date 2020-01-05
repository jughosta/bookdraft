import React from 'react';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';

import { Palette } from '../../utils/theme';

import { FormField, FormFieldShape } from '../../types/form.type';

interface IProps {
  field: FormField;
  value: string;
  onChange: (value: string, field: FormField) => void;
}

class FormInput extends React.Component<IProps> {
  handleChange = (value: string) => {
    const { field, onChange } = this.props;

    onChange(value, field);
  };

  renderFieldText() {
    const { value } = this.props;

    return (
      <TextInput
        style={styles.textInput}
        value={value}
        underlineColorAndroid="transparent"
        onChangeText={this.handleChange}
      />
    );
  }

  renderFieldTextarea() {
    const { value } = this.props;

    return (
      <TextInput
        multiline
        style={styles.textareaInput}
        value={value}
        underlineColorAndroid="transparent"
        onChangeText={this.handleChange}
      />
    );
  }

  renderFieldSelect() {
    const { value, field } = this.props;

    return (
      <Picker
        selectedValue={value}
        style={styles.pickerInput}
        onValueChange={this.handleChange}>
        {(field.options || []).map(option => (
          <Picker.Item
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </Picker>
    );
  }

  render() {
    const { field } = this.props;

    let fieldComponent = null;

    switch (field.shape) {
      case FormFieldShape.text:
        fieldComponent = this.renderFieldText();
        break;
      case FormFieldShape.textarea:
        fieldComponent = this.renderFieldTextarea();
        break;
      case FormFieldShape.select:
        fieldComponent = this.renderFieldSelect();
        break;
      default:
        break;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{field.label}</Text>
        <View style={styles.content}>{fieldComponent}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  label: {
    fontWeight: '600',
    color: Palette.gray.v700,
  },
  content: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
    color: Palette.gray.v900,
    backgroundColor: Palette.white,
    borderColor: Palette.gray.v400,
    borderWidth: 2,
  },
  textInput: {
    borderWidth: 0,
  },
  textareaInput: {
    borderWidth: 0,
    height: 300,
  },
  pickerInput: {},
});

export default FormInput;
