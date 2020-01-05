export enum FormFieldShape {
  text = 'text',
  textarea = 'textarea',
  select = 'select',
}

export type FormFieldOption = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  shape: FormFieldShape;
  defaultValue: string;
  options?: FormFieldOption[];
};

export type FormValues = {
  [k: string]: string;
};
