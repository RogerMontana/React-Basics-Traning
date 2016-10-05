require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {filterGrid, toggleActive, loadDataInGrid} from "../Actions";

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


export class GridComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.loadData();
    }

    loadData(){
        let {dispatch} = this.props;
        dispatch(loadDataInGrid());
    }

    toggleActive(index){
        let {dispatch} = this.props;
        dispatch(toggleActive(index));
    }

    handleFilterChange(e) {
        let {dispatch} = this.props;
        dispatch(filterGrid(e.target.value));
    }

    editField(index) {
        let {records} = this.state;
        this.setState({
            records: records[index].lastName
        })
    }


    render() {
        let recordsToShow = this.props.records.filter((record)=>{
            return this.props.filtered.indexOf(record.id)==-1;
        });
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
                    {recordsToShow.map((record, index)=>{

                        return <GridRecord record={record} key={index} toggleActive={this.toggleActive.bind(this, index)}/>

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

GridComponent.propTypes = {
    records: React.PropTypes.array.isRequired,
    filtered: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid.records,
        filtered: state.grid.filtered,
        loading: state.grid.loading
    }
}

export default connect(
    mapStateToProps
)(GridComponent)