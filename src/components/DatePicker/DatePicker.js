import {format} from 'date-fns';
import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({setitem,lableValue}) {
    const date = new Date();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(`${format(date, 'yyyy-MM-dd').toString()}`));
 
 
  const handleDateChange = async (date) => {
    await setSelectedDate(date);
    setitem(selectedDate);

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
