import React, { Fragment } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded'
import { setUsersCms, deleteUser, toggleEditUser } from '../../../actions'
import { connect } from 'react-redux'


function Actions(props){

    const [saveToggle, setSaveToggle] = React.useState(false)
    const [editToggle, setEditToggle] = React.useState(true)
    const [cancelToggle, setCancelToggle] = React.useState(false)
    const index = props.index
    const userToggle = {
        value: false,
        id: index
    }

    const toggleButton = () => {
        setEditToggle(!editToggle)
        setSaveToggle(!saveToggle)
        setCancelToggle(!cancelToggle)
        props.toggleEditUser(userToggle)
    }

    const saveRow = (event) => {
        event.preventDefault()
        toggleButton()
        userToggle.value = false
        props.toggleEditUser(userToggle)
    }

    const deleteUser = (event) => {
        event.preventDefault()
        props.deleteUser({value:index, id:props.users[index].id})
    }

    function handleEdit(){
        userToggle.value = true
        props.toggleEditUser(userToggle)
        toggleButton()
    }

    return(
        <Fragment key={props.index}>
            {saveToggle && 
                <Fragment>
                    <IconButton onClick={saveRow}><SaveIcon fontSize="small" style={{color:'#024c02'}}/></IconButton>
                    <IconButton hidden onClick={toggleButton}><EditOutlinedIcon fontSize="small"/></IconButton>
                    <IconButton onClick = {deleteUser}><DeleteOutlineOutlinedIcon fontSize="small" style={{color:'#752205'}}/></IconButton>
                    <IconButton onClick={toggleButton}><CancelPresentationRoundedIcon/></IconButton>
                </Fragment>}
            {editToggle &&
                <Fragment>
                    <IconButton onClick={toggleButton} hidden><SaveIcon fontSize="small" style={{color:'#024c02'}}/></IconButton>
                    <IconButton onClick={handleEdit}><EditOutlinedIcon fontSize="small"/></IconButton>
                    <IconButton onClick = {deleteUser}><DeleteOutlineOutlinedIcon fontSize="small" style={{color:'#752205'}}/></IconButton>
                </Fragment>
            }
        </Fragment>
    )
}


const mapStateToProps = state => ({
    users: state.usersCms.users
})

export default connect(mapStateToProps, { setUsersCms, deleteUser, toggleEditUser }) (Actions);