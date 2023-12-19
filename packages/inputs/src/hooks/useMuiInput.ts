import { useContext } from 'react';
import { MuiInputContext } from '@mui-solutions/inputs/providers/MuiInputProvider';

export function useMuiInput() {
  const MuiInput = useContext(MuiInputContext);

  if (MuiInput === undefined) {
    throw new Error('useInput must be used within an InputProvider');
  }

  if (MuiInput === null) {
    throw new Error('Desired MUI Input component must be passed to InputProvider');
  }

  return MuiInput;
}
