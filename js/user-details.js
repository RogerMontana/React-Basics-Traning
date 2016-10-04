require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';

const detailsRecords = [{
    id: 1,
    name: "John Doe",
    about: "Nice guy",
    hobby: "Likes drinking wine",
    skills: ["html", "javascript", "redux"]
}, {
    id: 2,
    name: "Mary Moe",
    about: "Cute girl",
    hobby: "Likes playing xbox whole days long",
    skills: ["Fortran", "Lua", "R#"]
}];

export default class UserDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        const id = this.props.params.id;
        if(id){
            const withProvidedID = detailsRecords.filter((record)=>(record.id == id));
            this.setState({
                records: withProvidedID
            })
        } else {
            this.setState({
                records: detailsRecords
            })
        }
    }

    render() {
        let records = this.state.records;
        return <div> {records.map((record) => (
            <div className="container">
                <h1>THIS IS PARAM FROM GRIDCOMPONENT: {this.props.params.id}</h1>
            <div className="row">
                <div className="col-md- offset-2 col-md- 8 col-lg- offset-3 col-lg- 6">
                    <div className="well profile">
                        <div className="col-sm- 12">
                            <div className="col-xs- 12 col-sm- 8">
                                <h2>{record.name}</h2>
                                <p><strong>About: </strong> {record.about} </p>
                                <p><strong>Hobbies: </strong> {record.hobby}</p>
                                <strong>Skills: </strong>
                                <p> {record.skills.map(
                                    (skill) => {return (<span className="tags">{skill}</span>)})}
                                </p>
                            </div>
                            <div className="col-xs- 12 col-sm- 4 text-center">
                                <figure>
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-2.jpg" alt="" className="img-circle img-responsive"/>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>))}
        </div>;
    }



}