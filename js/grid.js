require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';
import {hashHistory} from 'react-router';

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false, id: 1},
    {firstName: "Mary", lastName: "Moe", active: false, id: 2 },
    {firstName: "Peter", lastName: "Noname", active: true, id: 3}
];



export class GridRecord extends React.Component {
    showUserDetails(e){
        e.preventDefault();
        hashHistory.push(`/details/${this.props.record.id}`);
    }

    render(){

        let {record} = this.props;

        return (<tr>

        <th onClick={this.showUserDetails.bind(this)}><a href="#">{record.id}</a></th>

        <th>{record.firstName}</th>

        <th>{record.lastName}</th>

        <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive}/></th>

        </tr>)

    }
}


GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
};

GridRecord.propTypes = {
    record: React.PropTypes.shape({
        firstName: React.PropTypes.string.isRequired,
        lastName: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool.isRequired
    })
};


export default class GridComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    componentDidMount() {

        this.refs.filterInput && this.refs.filterInput.focus();

        this.setState({

            records: dataSource

        })

    }

    toggleActive(index) {
        let {records} = this.state;
        records[index].active = !records[index].active;
        this.setState({
            records: records
        })
    }

    handleFilterChange(e) {
        let value = e.target.value,
            records = dataSource.filter((record) => record.firstName.toUpperCase().includes(value.toUpperCase()));
        this.setState({
            records: records
        });
    }

    editField(index) {
        let {records} = this.state;
        this.setState({
            records: records[index].lastName
        })
    }

    render() {
        return (
            <div style={{width: 300, height: 300, padding: 20}}>
                <p>
                    <input type="text" ref="filterInput" placeholder="Filter by..."
                           onChange={this.handleFilterChange.bind(this)}/>
                </p>
                <table className="table table-condensed">
                    <thead>

                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map((record, index)=> {
                        return <GridRecord record={record}
                                           key={index}
                                           toggleActive={this.toggleActive.bind(this, index)}
                                           editField={this.editField.bind(this, index)}/>

                    })}
                    </tbody>
                </table>

                <div>{this.props.children &&
                React.cloneElement(this.props.children, {records: this.state.records})}</div>

            </div>

        )
        let records = this.state.records.map((record)=> {
            return <GridRecord record={record}/>
        });
    }
}