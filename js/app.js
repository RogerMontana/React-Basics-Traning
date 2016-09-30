require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false},
    {firstName: "Mary", lastName: "Moe", active: false},
    {firstName: "Peter", lastName: "Noname", active: true}
];


class GridRecord extends React.Component {


    render() {
        let {record} = this.props;
        return <tr>
            <th>{record.firstName}</th>
            <th><input type="text" value={record.lastName} onChange={this.props.editField}/></th>
            <th><input type="checkbox" checked={record.active} onChange={this.props.toggleActive}/></th>
        </tr>
    }
}
GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
};

GridRecord.propTypes = {
    record: React.PropTypes.shape({
        firstName: React.PropTypes.string.isRequired,
        lastName: React.PropTypes.string.isRequired,
        active:React.PropTypes.bool.isRequired
    })
};


class GridComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        this.setState({
            records: dataSource
        })
    }

    toggleActive(index){
        let {records} = this.state;
        records[index].active = !records[index].active;
        this.setState({
            records:records
        })
    }

    handleFilterChange(e){
        let value = e.target.value,
            records = dataSource.filter((record) => record.firstName.toUpperCase().includes(value.toUpperCase()));
        this.setState({
            records:records
        });
    }

    editField(index) {
        let {records} = this.state;
        this.setState({
            records:records[index].lastName
        })
    }

    render() {
        let records = this.state.records.map((record)=> {
            return <GridRecord record={record}/>
        });
        return (
            <div style={{width:300, height: 300, padding: 20}}>
                <p>
                    <input type="text" placeholder="Filter by..."/>
                </p>
                <table className="table table-condensed">
                    <thead>

                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map((record, index)=> {
                        return <GridRecord record={undefined}
                                           key={index}
                                           toggleActive={this.toggleActive.bind(this, index)}
                                           editField={this.editField.bind(this, index)}/>

                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

render(
    <GridComponent/>,
    document.getElementById('app')
);
