import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import { TextField } from "@material-ui/core";

function getSteps() {
  return ["City", "Highway", "Combined"];
}

export default function Steppers(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [mileageValue, setMileageValue] = React.useState({
    city: 0,
    highway: 0,
    combined: 0
  });

  React.useEffect(() => {
    props.onDataChange({ id: props.id, value: mileageValue });
  }, [mileageValue, props]);

  const steps = getSteps();

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleChange = event => {
    setMileageValue({
      ...mileageValue,
      [event.target.name]: parseInt(event.target.value, 10)
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TextField
            placeholder="Enter City mileage"
            name="city"
            value={mileageValue.city}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <TextField
            placeholder="Enter Highway mileage"
            value={mileageValue.highway}
            name="highway"
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <TextField
            placeholder="Enter Combined mileage"
            value={mileageValue.combined}
            name="combined"
            onChange={handleChange}
          />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
    </>
  );
}
