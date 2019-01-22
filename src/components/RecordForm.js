import React, { Component } from 'react';

class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state={
            date:"",
            title:"",
            amount:""
        }
    }

    vaild(){
        return this.state.date && this.state.title && this.state.amount
    }


    handleChange(event){
        var name,obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj[""+name] = event.target.value,
            obj
        ))
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" 
                    placeholder="Date" name="date" value={this.state.date}
                    onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" 
                    placeholder="Title" name="title" value={this.state.title}
                    onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" 
                    placeholder="Amount" name="amount" value={this.state.amount}
                    onChange={this.handleChange.bind(this)}/>
                </div>
                <button className="btn btn-primary" type="submit"
                    disabled={!this.vaild()}>Create Record</button>
            </form>
        );
    }
}

export default RecordForm;