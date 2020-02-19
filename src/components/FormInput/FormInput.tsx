import React from 'react';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';

import { Palette } from '../../utils/theme';

import { FormField, FormFieldShape } from '../../types/form.type';

interface IProps {
  field: FormField;
  value: string;
  onChange: (value: string, field: FormField) => void;
}

const FormInput = ({ value, field, onChange }: IProps) => {
  const handleChange = (v: string) => onChange(v, field);

  let fieldComponent = null;

  switch (field.shape) {
    case FormFieldShape.text:
      fieldComponent = (
        <TextInput
          style={styles.textInput}
          value={value}
          underlineColorAndroid="transparent"
          onChangeText={handleChange}
        />
      );
      break;
    case FormFieldShape.textarea:
      fieldComponent = (
        <TextInput
          multiline
          style={styles.textareaInput}
          value={value}
          underlineColorAndroid="transparent"
          onChangeText={handleChange}
        />
      );
      break;
    case FormFieldShape.select:
      fieldComponent = (
        <Picker
          selectedValue={value}
          style={styles.pickerInput}
          onValueChange={handleChange}>
          {(field.options || []).map(option => (
            <Picker.Item
              label={option.label}
              value={option.value}
              key={option.value}
            />
          ))}
        </Picker>
      );
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
};

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
