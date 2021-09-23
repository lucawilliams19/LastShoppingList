// dependencies
import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
    //allows binding of methods from other files
import { connect } from 'react-redux'


//built components
import {addItem} from '../actions/itemActions'

class ItemModal extends Component {
    //sets default Modal, the text box is closed by default
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAutheniticated:PropTypes.bool
    }

    //toggles between opening and closing the text box
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

        //when text is added the default text dissapears 
            //"ep" == 'event properties'
    onChange = (ep) => {
        this.setState({ [ep.target.name]: ep.target.value })
    }

        //when item is submited, item gets added to listGroup of tasks and Modal closes
    onSubmit = (ep) => {
        ep.preventDefault()
        
        const newItem = {
            name: this.state.name
        }
            //add item via AddItem action
        this.props.addItem(newItem)

            //close Modal
        this.toggle()
    }

    render() {
        return(
            <div>
                { this.props.isAutheniticated ?  <Button
                    color='dark'
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Item
                </Button> : <h4 className='mb-3 ml-4'>Please Log in to manage items</h4>}


                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for='item'>Item</Label>
                                    <Input
                                        type='text'
                                        name='name'
                                        id='item'
                                        placeholder='Add shopping item'
                                        onChange={this.onChange}
                                    />
                                    <Button
                                        color='dark'
                                        style={{marginTop: '2rem'}}
                                        block
                                    >Add Item</Button>
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
    item: state.item,
    isAutheniticated: state.auth.isAutheniticated
})
    //"connect(mapStateToProps,{ addItem })" passes the method 'addItem' to ItemModal from ItemActions
export default connect(mapStateToProps, { addItem })(ItemModal)