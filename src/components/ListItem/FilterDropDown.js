import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FilterDropDown({lable,DegreeValue,CoursesValues,item,setitem}) {
  var DegreeValue2=["UG","PG","NONE"];
  var CoursesValues2=[
    "NONE","Tamil","English","Maths","Computer Science","Physice","commerce"
    ]

  const classes = useStyles();
  const [selectValue, setselectValue] = React.useState('');

  const handleChange = (event) => {
    setselectValue(event.target.value);
    setitem(event.target.value)
  };

 

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{lable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          onChange={handleChange}
          style={{width:'200px'}}
        >
            {
              DegreeValue?DegreeValue2.map((item,index)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              }):CoursesValues2.map((item,index)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              })
            }
        </Select>
      </FormControl>
    </div>
  );
}

// { DegreeValue?DegreeValue.map((item,index)=>{
//   returnitem,index
//         }):CoursesValues.UG.map((item,index)=>{
//             return <MenuItem key={index} value={item}>{item}</MenuItem>
//                  })}