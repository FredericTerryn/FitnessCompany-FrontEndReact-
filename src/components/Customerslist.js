import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import AddTraining from './AddTraining.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddCustomer from './AddCustomer'; 




class Customerslist extends Component {

    constructor(params) {
        super(params);
        this.state = { customers: [] };
        this.state = { trainings: [] };
        this.state = { emptylist: [] };
        this.state = { dates: [] };
        this.state = { showSnack: false };
        this.state = { showSnack2: false };
        this.state = { isOpen: false };
    }



    componentDidMount() {
        this.listCustomers();
        this.listTrainings();
    }

    listCustomers = () => {
        fetch('http://customerrest.herokuapp.com/api/customers').then(response => response.json())
            .then(responseData => {
                this.setState({ customers: responseData.content });
            });
    }

    listTrainings = () => {
        fetch('http://customerrest.herokuapp.com/api/trainings').then(response => response.json())
            .then(responseData => {
                this.setState({ trainings: responseData.content });
            });
    }

    changeDate = (value) => {
        this.setState({ dates: moment(value).format() });
    }

    toggleModal = event => {
        console.log(event);
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    toggleModal2 = event => {
        const { addOpenClose } = this.state;
        this.setState({ addOpenClose: !addOpenClose });
    }

    cleartrainings = () => {
        this.setState({ trainings: this.emptylist });
    }

    showTrainings = (link) => {
        fetch(link).then(response => response.json())
            .then(responseData => {
                this.setState({ trainings: responseData.content });
                // if (responseData.content[0].rel == null){
                //    alert("no trainings");
                // }
            })
        this.setState({ isOpen: true });
    }

    handleClose = (event, reason) => {
        this.setState({ showSnack: false });
    }

    addCustomer(customer) {
        fetch('https://customerrest.herokuapp.com/api/customers/',
        {   method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(customer)
        })
        .then(res => this.listCustomers())
        .catch(err => console.error(err))
      }

    addTraining(training) {
            fetch('https://customerrest.herokuapp.com/api/trainings/',
            {   method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(training)
            })
            .then(res => this.loadTrainings())
            .catch(err => console.error(err))
          }


    //Delete a customer 
    delete = (link) => {
        fetch(link, { method: 'DELETE' }) //EERSTE ARGUMENT IN FETCH IS DE URL, 2de is javascript object
            .then(response => {
                this.listCustomers();
            })
        this.setState({ showSnack: true });
        this.setState({ isOpen: false });
    }


    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.delete(link)
                },
                {
                    label: 'No',
                }
            ]
        })
    }



    render() {
        const columns = [{
            Header: 'Firstname',
            accessor: 'firstname'
        }, {
            Header: 'Lastname',
            accessor: 'lastname'
        }, {
            Header: 'Street',
            accessor: 'streetaddress'
        }, {
            Header: 'PostCode',
            accessor: 'postcode'
        }, {
            Header: 'City',
            accessor: 'city'
        }, {
            Header: 'E-mail',
            accessor: 'email'
        }, {
            Header: 'Phone',
            accessor: 'phone'
        },
        /* {
            Header: '',
            accessor: 'links[0].href', //dit is de link die je al krijgt om te deleten
            Cell: ({value}) => (<Button bsStyle="danger" bsSize="small"  onClick={() => this.deleteCustomer(value)}>Delete</Button>) //YOU HAVE TO DO THE ARROW FUNCTION, OTHERWISE IT WON't WAIT FOR THE CLICK 
        }, */ {
            Header: 'Trainings',
            accessor: 'links[2].href',
            filterable: false,
            width: 100,
            sortable: false,
            Cell: ({ value }) => (<Button bsStyle="info" onClick={() => this.showTrainings(value)} >Trainings</Button>)
        }, {
            Header: 'Delete',
            accessor: 'links[0].href',
            filterable: false,
            width: 100,
            sortable: false,
            Cell: ({ value }) => (<Button bsStyle="danger" onClick={() => this.confirmDelete(value)} >Delete</Button>)
        } , 
        {
            id: 'addtraining',
            sortable: false,
            filterable: false,
            width: 150,
            accessor: 'links[0].href',
            Cell: ({value}) => (

                  <AddTraining customer={value} addTraining={this.addTraining} listTrainings={this.listTrainings}/>
            )
          }
        ]

        const columns2 = [{
            Header: 'Date',
            accessor: 'date',
            Cell: ({ value }) => ((!value) ? 'No trainings yet for this customer' : moment(value).format('MMMM Do YYYY, h:mm:ss a'))
        }, {
            Header: 'Duration',
            accessor: 'duration'
        }, {
            Header: 'Activity',
            accessor: 'activity'
        }, {
            Header: 'Trainings',
            accessor: 'links[1].href',
            filterable: false,
            width: 100,
            sortable: false,
            Cell: ({ value }) => (<Button bsStyle="danger" onClick={() => this.confirmDelete(value)} >Delete</Button>)
        }]

        const { isOpen } = this.state;

        return (

            <div>
               
                <Modal
                    id="modal_with_forms"
                    isOpen={isOpen}
                    closeTimeoutMS={150}
                    contentLabel="modalB"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.toggleModal}
                    aria={{
                        labelledby: "heading",
                        describedby: "fulldescription"
                    }}>
                    <h1 id="heading">Trainings of this customer!</h1>
                    <div id="fulldescription" tabIndex="0" role="document">
                        <ReactTable
                            defaultPageSize={5}
                            data={this.state.trainings}
                            noDataText="This customer has no trainings yet."
                            columns={columns2}
                        />
                    </div>
                </Modal>
                <AddCustomer addCustomer = {this.addCustomer} listCustomers= {this.listCustomers}/>
                <ReactTable
                    defaultPageSize={10}
                    data={this.state.customers}
                    noDataText="There are no customers."
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    columns={columns}
                    defaultSorted={[
                        {
                            id: "firstname",
                            desc: true
                        }
                    ]}
                />
                <Snackbar open={this.state.showSnack} autoHideDuration={3000} message={'Deleted'} onClose={this.handleClose} />

            </div>

        );
        //interessant om map opnieuw op te frissen

    }
}

export default Customerslist;

