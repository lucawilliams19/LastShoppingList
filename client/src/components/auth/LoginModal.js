// dependencies
import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
    //allows binding of methods from other files
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Built Components
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'



class LoginModal extends Component {

    //sets default Modal, the text box is closed by default
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if(error !== prevProps.error){

            //check for register error
            if(error.id === 'LOGIN_FAIL') {

                this.setState({ msg: error.msg.msg })

            } else {
                this.setState({ msg: null })
            }
        }
        
        //If Authenticated close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }
        
    }

    //toggles between opening and closing the modal
    toggle = () => {
        //Clear Errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

        //when text is added the default text dissapears 
            //"ep" == 'event properties'
    onChange = (ep) => {
        this.setState({ [ep.target.name]: ep.target.value })
    }

        // Sends the new user to try register
    onSubmit = (ep) => {
        ep.preventDefault()
        
        const { email, password } = this.state

        const user = {
            email,
            password
        }

        //attempt to login
        this.props.login(user)
       
    }

    render() {
        return(
            <div>
                <NavLink onClick = {this.toggle} href ='#'>
                    Login
                </NavLink>



                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                        <ModalBody>
                            { this.state.msg ?<Alert color='danger'>{ this.state.msg }</Alert> : null }
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>

                                    <Label for='email'>Email</Label>
                                    <Input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='Email'
                                        onChange={this.onChange}
                                        className='mb-3'
                                    />

                                    <Label for='password'>Password</Label>
                                    <Input
                                        type='password'
                                        name='password'
                                        id='nampassword'
                                        placeholder='Password'
                                        onChange={this.onChange}
                                        className='mb-3'
                                    />

                                    <Button
                                        color='dark'
                                        style={{marginTop: '2rem'}}
                                        block
                                    >Login</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                </Modal>
            </div>
        )
    }
}

    //connects the 
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
    //"connect(mapStateToProps,{ addItem })" passes the method 'addItem' to ItemModal from ItemActions
export default connect(
    mapStateToProps, 
    { login, clearErrors }
    )(LoginModal)