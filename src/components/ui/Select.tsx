import Select, { components } from 'react-select';
import type { FC } from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const CustomSelect: FC<SelectProps> = ({ options, value, onChange, placeholder = 'Select type' }) => {
  return (
    <div className="mb-4 flex justify-end">
      <Select
        isMulti
        options={options}
        value={options.filter(option => value.includes(option.value))}
        onChange={(selectedOptions) => {
          if (selectedOptions) {
            onChange(selectedOptions.map(option => option.value));
          } else {
            onChange([]);
          }
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            cursor: 'pointer',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#6366f1' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            '&:hover': {
              backgroundColor: state.isSelected ? '#4f46e5' : '#f3f4f6',
            },
            cursor: 'pointer',
          }),
        }}
        components={{ Option: components.Option }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomSelect;
