import React, { Component } from 'react';
import './../App.js';
import SkyLight from 'react-skylight';

class AddCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        };
    }


    toggleModal2 = event => {
        const { addOpenClose } = this.state;
        this.setState({ addOpenClose: !addOpenClose });
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save customer and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var newCustomer = { firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        };
     
        this.props.addCustomer(newCustomer); 
        this.refs.addDialog.hide();
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Customer</h3>
                    <form>
                        <input type="text" placeholder="Firstname" name="firstname"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Lastname" name="lastname"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="StreetAddress" name="streetaddress"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Postcode" name="postcode"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="City" name="city"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="Email" name="email"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="phone" name="phone"
                            onChange={this.handleChange} /><br />

                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.refs.addDialog.show()}>New Customer</button>
                </div>
            </div>
        );
    }
}
export default AddCustomer;