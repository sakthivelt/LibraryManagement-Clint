import {format} from 'date-fns';
import React, { useEffect } from 'react';
import { alpha } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({setitem,lableValue,item}) {
 
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(item+'T21:11:54'));   //`${format(date, 'yyyy-MM-dd').toString()}`

  useEffect(()=>{ console.log(item)},[item])

  const handleDateChange = async (date) => {
    await setSelectedDate(date);
    if(date!==null&&!isNaN(date.getTime())){
      
      setitem(`${format(date, 'yyyy-MM-dd').toString(date)}`);
      console.log('blllll')
    }
    // setitem(`${format(date, 'yyyy-MM-dd').toString(date)}`);
};

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={lableValue}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
