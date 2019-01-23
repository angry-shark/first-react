import React, { Component } from 'react';
import Record from '../components/Record';
import RecordForm from './RecordForm';
/*import { getJSON } from 'jquery';
import axios from 'axios';*/
import * as RecordsAPI from '../utils/RecordsAPI.js';
import AmountBox from './AmountBox';

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

  addRecord(newrecord){
    this.setState({
      error: null,
      isLoaded:true,
      records:[
        ...this.state.records,//...的意思是打散原数组为一系列元素
        newrecord
      ]
    })
  }

  UpdateRecord(record,data){
    const recordIndex = this.state.records.indexOf(record);//得到record在records列表中的索引位置
    const newRecords = this.state.records.map((item, index) => {
      if(index !== recordIndex){
        return item
      }

      return {//即item被date更新替代
        ...item,
        ...data
      };
    })


    this.setState({
      records: newRecords
    });
  }

  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);//得到record在records列表中的索引位置
    const newRecords = this.state.records.filter((item,index) => index !== recordIndex);
    this.setState({
      records:newRecords
    });
  }

  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record,i) => <Record record={record} key={record.id}
              handleEditRecord={this.UpdateRecord.bind(this)}
              handleDelete={this.deleteRecord.bind(this)}/>)}
          </tbody>
        </table>
    }

    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()} />
          <AmountBox text="Debit" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
        {RecordComponent}
      </div>);
  }

}

export default Records;
