import React, { Component } from 'react';
import Record from '../components/Record';
import RecordForm from './RecordForm';
/*import { getJSON } from 'jquery';
import axios from 'axios';*/
import * as RecordsAPI from '../utils/RecordsAPI.js';

class Records extends Component {
  constructor(){
    super();
    this.state = {
      error: null,
      isLoaded:false,
      records:[
       /* {"id":1,"date":"2018-01-09","title": "收入","amount": 20},
        {"id":2,"date":"2018-01-07","title": "录视频b收入","amount": 12999},
        {"id":3,"date":"2018-01-087","title": "录视频a收入","amount": 13999}*/
      ]
    }
  }

  componentDidMount(){
    /*getJSON("http://localhost:3004/records").then(
      response => this.setState({
        records:response,
        isLoaded:true
        }),
      error => this.setState({
        isLoaded:true,
        error
      })
    )*/

   /* axios.get("http://localhost:3004/records").then(
      response => this.setState({
        records:response.data,
        isLoaded:true
        })
    ).catch(
      error => this.setState({
        isLoaded:true,
        error
      })
    )*/
/*
    axios.get(`${RecordsAPI.api}/records`).then(
      response => this.setState({
        records:response.data,
        isLoaded:true
        })
    ).catch(
      error => this.setState({
        isLoaded:true,
        error
      })
    )*/
    RecordsAPI.getAll().then(
      response => this.setState({
        records:response.data,
        isLoaded:true
        })
    ).catch(
      error => this.setState({
        isLoaded:true,
        error
      })
    )
  }

  render() {
    const {error,isLoaded,records} = this.state;
    var RecordComponent;


    if(error){
      RecordComponent = <div>Error:{error.message}</div>;
    }
    else if(!isLoaded){
      RecordComponent = <div>Loading...</div>;
    }else{
        RecordComponent = <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record,i) => <Record record={record} key={record.id}/>)}
          </tbody>
        </table>
    }

    return (
      <div>
        <h2>Records</h2>
        <RecordForm/>
        {RecordComponent}
      </div>);
  }

}

export default Records;
