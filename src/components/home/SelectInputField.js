import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { Select, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux'
import { setSelected } from '../../actions';

class SelectInputField extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            optionValue: [],
            value: '',
            label: ''
        }
    }
    componentWillMount() {
        this.getValues();
    }
    getValues() {
        this.setState({ optionValue: this.props.optionValue, label: this.props.label, value: 'All' })
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({ value: e.target.value })
        var value ={
            type: this.state.label,
            value: e.target.value
        }
        this.props.setSelected(value)
    }
    render() {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        return (
            <div style={{ float:"left"}}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    {this.state.label}
                </InputLabel>
                <Select
                    multiline
                    displayEmpty
                    name="age"
                    style={{ color: "#752205",
                width: '10rem', display:"flex"}}
                    MenuProps={MenuProps}
                    value={this.state.value}
                    onChange={(value) => this.handleChange(value)}
                >
                    {
                        this.state.optionValue.map(option => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))
                    }
                </Select>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    makes: state.props.makes,
    bodyStyles: state.props.bodyStyles
})

export default connect(mapStateToProps, { setSelected }) (SelectInputField)