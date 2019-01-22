import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Record extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.record.id,
            date: props.record.date,
            title: props.record.title,
            amount:props.record.amount
        }
    }

    render() {
        return (
            <tr>
              <td>{this.state.date}</td>
              <td>{this.state.title}</td>
              <td>{this.state.amount}</td>
            </tr>
        );
    }
}

export default Record;

Record.propTypes = {
    id: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}