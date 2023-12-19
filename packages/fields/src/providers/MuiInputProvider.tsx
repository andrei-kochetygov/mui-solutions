import { createProvider } from '@mui-solutions/utils';
import type { InputProps as MuiInputProps } from '@mui/material';

type MuiInputType<Props> = (props: Props) => JSX.Element;

export type MuiInputProviderProps<InputProps extends MuiInputProps> = {
  MuiInput: MuiInputType<InputProps>;
};

export const [MuiInputProvider, useMuiInput, MuiInputContext] = createProvider(
  'MuiInput',
  <InputProps extends MuiInputProps>({ MuiInput }: MuiInputProviderProps<InputProps>) => {
    if (!MuiInput) {
      throw new Error('Desired MUI Input component must be passed to MuiInputProvider');
    }

    return MuiInput;
  },
);
