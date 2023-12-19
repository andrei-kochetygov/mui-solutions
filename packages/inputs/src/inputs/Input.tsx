import { InputLabel as MuiInputLabel, InputLabelProps, InputProps, FormControl, useFormControl } from '@mui/material';
import { Fragment, ReactNode, useCallback, useMemo } from 'react';
import { useMuiInput } from '@mui-solutions/inputs/hooks/useMuiInput';

export type BaseInputProps = InputProps & {
  label: ReactNode;
  InputLabelProps?: InputLabelProps;
};

export const Input = (props: BaseInputProps) => {
  const { label, onChange } = props;

  const formControl = useFormControl();

  const MuiInput = useMuiInput();

  const id = useMemo(() => props.id ?? `${Input.name}-${Math.random().toString(36).substring(2, 9)}`, [props.id]);

  const InputLabelProps = useMemo(() => ({ htmlFor: id, ...props.InputLabelProps }), [id, props.InputLabelProps]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange],
  );

  const InputProps = useMemo(() => ({ id, onChange: handleChange, ...props }), [id, handleChange, props]);

  const Container = useMemo(() => (formControl ? Fragment : FormControl), [formControl]);

  return (
    <Container>
      <MuiInputLabel {...InputLabelProps}>{label}</MuiInputLabel>
      <MuiInput {...InputProps} />
    </Container>
  );
};
