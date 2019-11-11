import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
}));

export default function DatePicker(props) {
  const onDateChange = props.onDateChange;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(props.value);

  React.useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        label="Date of Birth"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        style={{ width: "100%" }}
        className={classes.datePicker}
      />
    </MuiPickersUtilsProvider>
  );
}
