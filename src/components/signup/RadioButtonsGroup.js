import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: "100%"
  },
  inline: {
    display: "inline",
    paddingLeft: 50,
    padding: 5,
    border: "1px solid #afb6bb",
    borderRadius: 5
  },
  formLabel: {
    marginBottom: 10
  }
}));

export default function RadioButtonsGroup(props) {
  const onChange = props.onGenderChange;
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend" className={classes.formLabel}>
        Gender
      </FormLabel>
      <RadioGroup
        name="gender"
        value={value}
        onChange={handleChange}
        className={classes.inline}
      >
        <FormControlLabel
          value="Female"
          control={<Radio color="primary" />}
          label="Female"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Male"
          control={<Radio color="primary" />}
          label="Male"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Other"
          control={<Radio color="primary" />}
          label="Other"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}
