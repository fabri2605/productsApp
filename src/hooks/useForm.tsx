import React, {useState} from 'react';

export const useForm = <T extends Object>(initialState: T) => {
  const [form, setForm] = useState(initialState);

  const action = <K extends Object>(key: keyof typeof form, value: K) => {
    setForm({...form, [key]: value});
  };

  const setFormValues = (obj : T) => {
    setForm(obj);
  };

  return {...form, action, form, setFormValues};
};
