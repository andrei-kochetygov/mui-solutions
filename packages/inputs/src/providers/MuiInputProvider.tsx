import { OutlinedInput, type InputProps as MuiInputProps } from '@mui/material';
import { createContext } from 'react';

type MuiInputType<Props> = (props: Props) => JSX.Element;

export const MuiInputContext = createContext<MuiInputType<MuiInputProps> | null>(null);

export type MuiInputProviderProps<InputProps extends MuiInputProps> = {
  MuiInput: MuiInputType<InputProps>;
  children?: React.ReactNode;
};

export const MuiInputProvider = <InputProps extends MuiInputProps>({
  MuiInput,
  children,
}: MuiInputProviderProps<InputProps>) => {
  return (
    <MuiInputContext.Provider value={MuiInput as MuiInputType<MuiInputProps>}>{children}</MuiInputContext.Provider>
  );
};

export const Kek = () => {
  return <MuiInputProvider MuiInput={OutlinedInput}></MuiInputProvider>;
};
