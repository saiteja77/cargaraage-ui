import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Actions from './Actions';
import { setUsersCms, userTobeSaved } from '../../../actions'
import { connect } from 'react-redux'
import { BootstrapInput } from './BootstrapInput'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';

const BootstrapSelect = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 13,
        padding: '2px 14px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

function Row(props) {
    const [status, setStatus] = React.useState('ACTIVE');
    const handleChange = event => {
        setStatus(event.target.value);
    };
    React.useEffect(() => {
        setStatus(props.users[props.index].status)
    }, [props.users, props.index])
    function returnRow(value, index) {
        if (value[0] === 'id') {
            //Do nothing
        } else if (value[0] === 'password') {
            return <TableCell key={index}>{'••••••••••••••'}</TableCell>
        } else {
            return <TableCell key={index}>{value[1]}</TableCell>
        }
    }

    if(props.editUser.id === props.index && props.editUser.value){
        props.userTobeSaved(props.users[props.index])
    }

    function returnRowWithInput(value, index) {
        if (value[0] === 'id') {
            //Do nothing
        } else if (value[0] === 'password') {
            return <TableCell key={index}>{'••••••••••••••'}</TableCell>
        } else if (value[0] === 'dob') {
            return <TableCell key={index}><BootstrapInput type='date' value={value[1]} id="bootstrap-input" /></TableCell>
        } else if (value[0] === 'status') {

            return <TableCell>
                <NativeSelect
                    value={status}
                    onChange={handleChange}
                    input={<BootstrapSelect />}
                    style={{ width: ((status.length + 5) * 9) + 'px', }}
                >
                    <option value={'ACTIVE'}>ACTIVE</option>
                    <option value={'INACTIVE'}>INACTIVE</option>
                    <option value={'DELETED'}>DELETED</option>
                </NativeSelect>
            </TableCell>
        } else {
            return <TableCell key={index}><BootstrapInput style={{ width: ((value[1].length + 1) * 8) + 'px' }} defaultValue={value[1]} id="bootstrap-input" /></TableCell>
        }
    }
    return (
        <TableRow hover key={props.index}>
            {console.log(props.index)}
            {(props.editUser.id === props.index && props.editUser.value) ? 
                Object.entries(props.users[props.index]).map((r, i) => returnRowWithInput(r, i)) 
                : Object.entries(props.users[props.index]).map((r, i) => returnRow(r, i))}
            <Actions index={props.index} />
        </TableRow>
    )
}

const mapStateToProps = state => ({
    users: state.usersCms.users,
    editUser: state.usersCms.editUser
})

export default connect(mapStateToProps, { setUsersCms, userTobeSaved })(Row);