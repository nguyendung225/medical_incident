export const autocompleteStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: state.isDisabled ? '#eff2f5' : '#fff',
    borderColor: '#A9A9A9',
    minHeight: '100%',
    height: '100%',
    borderRadius: "3px",
    boxShadow: 'none',
    padding: "0 4px",
    '&:hover': {
      borderColor: '#369DC3',
    },
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0',
  }),

  input: (provided: any) => ({
    ...provided,
    margin: '0px',
  }),

  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
    display: 'none',
  }),

  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: 'calc(100% -2px)',
  }),

  clearIndicator: (provided: any) => ({
    ...provided,
    padding: 0,
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "0 4px 0 0",
  }),
   
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "white" : "#5E6278",
    backgroundColor: state.isFocused ? '#369DC3' : "white",
    '&:hover': {
      background: '#369DC3',
      color: "#fff",
      opacity: 0.8,
    },
    padding: "4px",
    zIndex: state.isSelected ? 9999 : 'auto',
  }),

  multiValue: (provided: any, state: any) => ({
    ...provided,
    height: "20px",
    margin: "0 2px 2px 0",
  }),
  
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center"
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: "9999"
  }),

  menuList: (provided: any, state: any) => ({
    ...provided,
    maxHeight: "147px"
  }),
};

export const variantStandardStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: 'none', 
    borderBottom: state.isFocused ? '2px solid #369DC3' : '1px solid #A9A9A9',
    boxShadow: 'none',
    borderRadius: 0,
    padding:"0px",
    '&:hover': {
      borderBottom: state.isFocused ? '2px solid #369DC3' : '1px solid #A9A9A9',
    },
  }),
}

export const multiValueRemove = {
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    display: 'none',
  }),
};

export const heightSelectMutil = (height: string) => {
  return {
    control: (provided: any, state: any) => ({
      ...provided,
      height: height,
      maxHeight: height,
      alignItems: "flex-start",
      overflowY: 'auto',
      padding:"2px",
    }),
  
    valueContainer: (provided: any) => ({
      ...provided,
      height: 'none',
    }),
  }
};