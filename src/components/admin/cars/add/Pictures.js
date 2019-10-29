import React from "react";
import { TextField, InputLabel, Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 20,
    marginLeft: 20,
    minWidth: 2,
    minHeight: 2,
    width: 30,
    height: 30
  }
}));

export default function Pictures(props) {
  const classes = useStyles();
  const [urls, setUrls] = React.useState([]);
  const [values, setValues] = React.useState([
    {
      id: 0,
      value: ""
    }
  ]);
  const [noOfImages, setNoOfImages] = React.useState([0]);

  React.useEffect(() => {
    props.onDataChange({ id: "pictures", value: urls });
  }, [urls, props]);

  React.useEffect(() => {
    setUrls(values.map(e => e.value));
  }, [values]);

  const handleChange = event => {
    values.forEach((value, index) => {
      if (value.id === parseInt(event.target.name, 10)) {
        var v = [...values];
        v[index].value = event.target.value;
        setValues([...v]);
      }
    });
  };

  const handleClick = event => {
    var newValue = {
      id: noOfImages[noOfImages.length - 1] + 1,
      value: ""
    };
    setValues([...values, newValue]);
    setNoOfImages([...noOfImages, noOfImages[noOfImages.length - 1] + 1]);
  };

  return (
    <>
      <InputLabel>Image URL(s)</InputLabel>
      <div style={{ display: "grid", maxWidth: 800 }}>
        {values.map(row => {
          return (
            <TextField
              key={row.id}
              name={"" + row.id}
              placeholder="Enter the URL..."
              margin="normal"
              value={row.value}
              onChange={handleChange}
            />
          );
        })}
      </div>

      {values[values.length - 1].value === "" ? (
        <Fab disabled color="primary" size="small" className={classes.button}>
          <AddIcon />
        </Fab>
      ) : (
        <Tooltip title="Add one more URL">
          <Fab
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}
