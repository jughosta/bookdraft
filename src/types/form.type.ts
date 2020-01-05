export enum FormFieldShape {
  text = 'text',
  textarea = 'textarea',
  select = 'select',
}

export type FormField = {
  name: string;
  label: string;
  shape: FormFieldShape;
  defaultValue: string;
};

export type FormValues = {
  [k: string]: string;
};
