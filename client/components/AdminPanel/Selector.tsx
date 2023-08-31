// React
import * as React from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ICoach } from '../../types/coach';

  interface SelectorProps {
    data: ICoach[]
    setSelector: (arg0: any) => React.ChangeEvent<HTMLInputElement>
    initial: string
  }

 const Selector:React.FC<SelectorProps> = ({data, setSelector, initial}) => {
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    setSelector(event.target.value)
  };

  return (
      <FormControl variant="standard" sx={{ minWidth: 150, marginLeft: '30px'}}>
        <InputLabel id="select-label">Тренер</InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="status"
          defaultValue={initial}
          size='small'
        >
          <MenuItem value={'Не занимаюсь'}>{'Не занимаюсь'}</MenuItem>
            {data.map(item =>
              <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
            )}
        </Select>
      </FormControl>
  );
}

export default Selector