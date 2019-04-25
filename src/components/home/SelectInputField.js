import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class SelectInputField extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            optionValue: [],
            value: '',
            label: ''
        }
    }
    componentDidMount(){
        this.getValues();
    }
    getValues(){
        this.setState({optionValue: this.props.optionValue, label: this.props.label, value:'All'})
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({value: e.target.value})
    }
    render(){
        return (
            <TextField
                select
                label={this.state.label}
                style={{ color: "#752205", width:'10rem' }}
                value={this.state.value}
                onChange={(value) => this.handleChange(value)}
                InputProps={{
                    
                }}
            >
                {
                    this.state.optionValue.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))
                }
            </TextField>
        )
    }
    
}


export default SelectInputField