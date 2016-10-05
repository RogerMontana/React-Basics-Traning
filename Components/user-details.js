require("bootstrap/dist/css/bootstrap.css");
require("../css/user-details.css");
import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {filterDetails, loadDataAndFilterDetails} from "../Actions";

export class UserDetail extends React.Component {

    render() {

        let {detail} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{detail.name}</h2>
                                    <p><strong>About: </strong> {detail.about} </p>
                                    <p><strong>Hobbies: </strong> {detail.hobbies} </p>
                                    <p><strong>Skills: </strong>
                                        {detail.skills.map((skill, i)=>{
                                            return <span key={i} className="tags">{skill}</span>
                                        })}
                                    </p>
                                </div>
                                <div className="col-xs-12 col-sm-4 text-center">
                                    <figure>
                                        <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-2.jpg" alt="" className="img-circle img-responsive"/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class UserDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        const id = this.props.params.id;
        let {dispatch} = this.props;
        dispatch(filterDetails(id));
    }

    componentDidUpdate(prevProps) {
        let {dispatch} = this.props;
        if (prevProps.params.id !== this.props.params.id) {
            dispatch(loadDataAndFilterDetails(id));
        }
    }

    render() {
        return (
            <div>
                <h1>THIS IS PARAM FROM GRIDCOMPONENT: {this.props.params.id}</h1>
                {this.props.details.map((detail, i)=> {
                    return <UserDetail key={i} detail={detail}/>
                })}
            </div>
        )
    }
}



UserDetails.propTypes = {
    details: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

export default connect(
    mapStateToProps
)(UserDetails)