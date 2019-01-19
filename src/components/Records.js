import React, { Component } from 'react';
import Record from '../components/Record';


class Records extends Component {
  constructor(){
    super();
    this.state = {
      records:[
        {"id":1,"date":"2018-01-09","title": "收入","amount": 20},
        {"id":2,"date":"2018-01-07","title": "录视频b收入","amount": 12999},
        {"id":3,"date":"2018-01-087","title": "录视频a收入","amount": 13999}
      ]
    }
  }


  render() {
    return (
      <div>
        <h2>Records</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record,i) => <Record record={record} key={record.id}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Records;
