import React from "react";
import { TextField, InputLabel, Paper } from "@material-ui/core";
import Steppers from "./Steppers";
import SelectBox from "./SelectBox";
import Axios from "axios";

export default function Specifications(props) {
    const [specsData, setSpecsData] = React.useState({});
    const [bodyStyle, setBodyStyle] = React.useState({});
    const [make, setMake] = React.useState({});
    const [fuelType, setFuelType] = React.useState("");
    const [fuelCapacity, setFuelCapacity] = React.useState(0.0);
    const [accelerationTime, setAccelerationTime] = React.useState(0);
    const [seatingCapacity, setSeatingCapacity] = React.useState(0);
    const [horsePower, setHorsePower] = React.useState(0);
    const [torque, setTorque] = React.useState(0);
    const [engineType, setEngineType] = React.useState("");
    const [year, setYear] = React.useState(2000);
    const [mileage, setMileage] = React.useState({});
    const [makes, setMakes] = React.useState([])
    const [bodyStyles, setBodyStyles] = React.useState([])

    React.useEffect(() => {
        getBodyStyles()
        getMakes()
      }, [])
    
    function getBodyStyles(){
        Axios.get('https://cargaraage-api.herokuapp.com/bodyStyles/')
        .then(response => {
            setBodyStyles(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    
    function getMakes(){
        Axios.get('https://cargaraage-api.herokuapp.com/makes/')
        .then(response => {
            setMakes(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    React.useEffect(() => {
        setSpecsData({
            bodyStyle: bodyStyle,
            make: make,
            fuelType: fuelType,
            mileage: mileage,
            fuelCapacity: parseInt(fuelCapacity, 10),
            accelerationTime: parseInt(accelerationTime, 10),
            seatingCapacity: parseInt(seatingCapacity, 10),
            horsePower: parseInt(horsePower, 10),
            torque: parseInt(torque, 10),
            engineType: engineType,
            year: parseInt(year, 10)
        });
    }, [
            bodyStyle,
            make,
            fuelType,
            mileage,
            fuelCapacity,
            accelerationTime,
            seatingCapacity,
            horsePower,
            torque,
            engineType,
            year
        ]);

    React.useEffect(() => {
        props.onDataChange({ id: "specs", value: specsData });
    }, [specsData, props]);


    const handleChange = event => {
        switch (event.target.name) {
            case "fuelType":
                setFuelType(event.target.value);
                break;
            case "fuelCapacity":
                setFuelCapacity(event.target.value);
                break;
            case "accelerationTime":
                setAccelerationTime(event.target.value);
                break;
            case "seatingCapacity":
                setSeatingCapacity(event.target.value);
                break;
            case "horsePower":
                setHorsePower(event.target.value);
                break;
            case "torque":
                setTorque(event.target.value);
                break;
            case "engineType":
                setEngineType(event.target.value);
                break;
            case "year":
                setYear(event.target.value);
                break;
            default:
                break;
        }
    };

    function handleSelectDataChange(value) {
        switch (value.id) {
            case "bodyStyle":
                setBodyStyle(value.value);
                break;
            case "make":
                setMake(value.value);
                break;
            case "mileage":
                setMileage(value.value);
                break;
            default:
                break;
        }
    }

    return (
        makes.length > 0 && bodyStyles.length > 0 && <div style={{ display: "inline-grid" }}>
            <SelectBox
                display={"Body Style"}
                name="bodyStyle"
                data={bodyStyles}
                onDataChange={handleSelectDataChange}
            />
            <SelectBox
                display={"Make"}
                name="make"
                data = {makes}
                onDataChange={handleSelectDataChange}
            />
            <TextField
                label="Fuel Type"
                id="standard-uncontrolled"
                placeholder={"Enter the Fuel Type..."}
                margin="normal"
                name="fuelType"
                value={fuelType}
                onChange={handleChange}
            />
            <Paper style={{ marginTop: 10, borderRadius: 0, minWidth: 400 }}>
                <div style={{ padding: 10 }}>
                    <InputLabel style={{ display: "inline" }}>Mileage: </InputLabel>
                    <Steppers id="mileage" onDataChange={handleSelectDataChange} />
                </div>
            </Paper>
            <TextField
                label="Fuel Capacity"
                id="standard-uncontrolled"
                placeholder={"Enter the Fuel Capacity..."}
                margin="normal"
                name="fuelCapacity"
                value={fuelCapacity}
                onChange={handleChange}
            />
            <TextField
                label="Acceleration Time"
                id="standard-uncontrolled"
                placeholder={"Enter the Acceleration Time..."}
                margin="normal"
                name="accelerationTime"
                value={accelerationTime}
                onChange={handleChange}
            />
            <TextField
                label="Seating Capacity"
                id="standard-uncontrolled"
                placeholder={"Enter the Seating Capacity..."}
                margin="normal"
                name="seatingCapacity"
                value={seatingCapacity}
                onChange={handleChange}
            />
            <TextField
                label="Horse Power"
                id="standard-uncontrolled"
                placeholder={"Enter the Horse Power..."}
                margin="normal"
                name="horsePower"
                value={horsePower}
                onChange={handleChange}
            />
            <TextField
                label="Torque"
                id="standard-uncontrolled"
                placeholder={"Enter the Torque..."}
                margin="normal"
                name="torque"
                value={torque}
                onChange={handleChange}
            />
            <TextField
                label="Engine Type"
                id="standard-uncontrolled"
                placeholder={"Enter the Engine Type..."}
                margin="normal"
                name="engineType"
                value={engineType}
                onChange={handleChange}
            />
            <TextField
                label="Year"
                id="standard-uncontrolled"
                placeholder={"Enter the Year..."}
                margin="normal"
                name="year"
                value={year}
                onChange={handleChange}
            />
        </div>
    )
}
