import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

class Record extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.record.id,
            date: props.record.date,
            title: props.record.title,
            amount:props.record.amount,
            edit:false
        }
    }

    handleDelete(event){
        event.preventDefault();
        RecordsAPI.remove(this.state.id).then(
            response => {
              this.props.handleDelete(this.state.id);
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    handleToggle(){
        this.setState({
            edit:!this.state.edit
        });
    }

    handleEdit(event){
        event.preventDefault();
        const data = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value)
        }
        RecordsAPI.update(this.state.id,data).then(
            response => {
                this.props.handleEditRecord(this.props.record,response.date);
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    recordRow(){
        return (
            <tr>
              <td>{this.state.date}</td>
              <td>{this.state.title}</td>
              <td>{this.state.amount}</td>
              <td>
                  <button className="btn btn-info mr-1" 
                  onClick={this.handleToggle.bind(this)}>Edit</button>
                  <button className="btn btn-danger"
                  onClick={this.handleDelete.bind(this)}>Delete</button>
              </td>
            </tr>
        );
    }

    recordForm(){
        return (
            <tr>
              <td>
                  <input type="text" className="form-control" 
                    defaultValue={this.state.date} ref="date"/>
              </td>
              <td>
                  <input type="text" className="form-control" 
                  defaultValue={this.state.title} ref="title"/>
              </td>
              <td>
                  <input type="text"className="form-control"
                  defaultValue={this.state.amount} ref="amount"/>
              </td>
              <td>
                  <button className="btn btn-info mr-1" 
                  onClick={this.handleEdit.bind(this)}>Update</button>
                  <button className="btn btn-danger" 
                  onClick={this.handleToggle.bind(this)}>Cancel</button>
              </td>
            </tr>
        );
    }

    render() {
        if(this.state.edit){
            return this.recordForm();
        }else{
            return this.recordRow();
        }
    }
}

export default Record;

Record.propTypes = {
    id: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}