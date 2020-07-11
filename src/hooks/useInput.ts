import { useState } from 'react';

export default <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  return {
    bindProps: {
      onChange: (event: any) => setValue(event.target.value),
      value,
    },
    reset: (value?: T) => setValue(value !== undefined ? value : initialValue),
    setValue,
    value,
  };
};
