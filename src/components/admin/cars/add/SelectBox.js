import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export default function SelectBox(props) {
  const [values, setValues] = React.useState(props.data[0].value);
  const handleChangeSelect = event => {
    setValues(event.target.value);
  };
  React.useEffect(() => {
    var dataObject = props.data;
    var id;
    dataObject.forEach(element => {
      if (element.value === values) {
        id = element.id;
      }
    });
    props.onDataChange({ id: props.name, value: values, key: id });
  }, [values, props]);
  return (
    <FormControl>
      <InputLabel>{props.display}</InputLabel>
      <Select
        value={values}
        onChange={handleChangeSelect}
        style={{ minWidth: 80, width: (values.length + 2) * 10 }}
      >
        {props.data.map(row => (
          <MenuItem key={row.id} value={row.value}>
            {row.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
