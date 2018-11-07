import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Popup from "reactjs-popup";
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';



class Customerslist extends Component {
    
    constructor(params) {
        super(params);
        this.state = { customers: [] };
        this.state = { trainings: [] };  
        this.state = { emptylist: [] };
        this.state = { showSnack: false};
        this.state = { isOpen: false };
    }



    componentDidMount() {
       this.listCustomers();
       fetch('http://customerrest.herokuapp.com/api/trainings').then(response => response.json())
        .then(responseData => {
            this.setState({ trainings: responseData.content });
        });
    }

    toggleModal = event => {
        console.log(event);
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
      }

      cleartrainings = () => {
         this.setState({ trainings: this.emptylist});
      }

    showTrainings = (link) => {
        fetch(link).then(response => response.json())
        .then(responseData => {
            this.setState({ trainings: responseData.content});
            // if (responseData.content[0].rel == null){
            //    alert("no trainings");
            // }
        })
        
        this.setState({isOpen: true});
    }



    handleClose = (event, reason) => {
        this.setState({showSnack:false});
    }

    //Delete a customer 
    deleteCustomer = (link) => {
        alert(link);
        fetch(link, {method:'DELETE'}) //EERSTE ARGUMENT IN FETCH IS DE URL, 2de is javascript object
        .then(response => {
            this.listCustomers();
        })
        this.setState({showSnack:true});
    }

    listCustomers = () => {
        fetch('http://customerrest.herokuapp.com/api/customers').then(response => response.json())
        .then(responseData => {
            this.setState({ customers: responseData.content });
        });
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
        },  {
            Header: 'E-mail',
            accessor: 'email'
        },  {
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
            Cell:({value}) => (<Button bsStyle="info"  onClick={() => this.showTrainings(value)} >Trainings</Button>)
        }
    ]
    
    const columns2 = [{
        Header: 'Date',
        accessor: 'date'
    }, {
        Header: 'Duration',
        accessor: 'duration'
    }, {
        Header: 'Activity',
        accessor: 'activity'
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
               <Snackbar open={this.state.showSnack} autoHideDuration={3000} message={'Customer deleted'} onClose={this.handleClose}/>
            </div>
            
        );
        //interessant om map opnieuw op te frissen

    }
}

export default Customerslist;

