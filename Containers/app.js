require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';
import {hashHistory} from 'react-router';
import GridComponent from '../Components/grid.js';
import {SummaryActive, SummaryUsers} from '../Components/summery';
import UserDetail from '../Components/user-details.js';
import {Router, Route, Link} from 'react-router';
import  {Provider} from 'react-redux';
import configureStore from "../Store/index.js";

const store = configureStore();

class App extends React.Component {

    render(){

        return (

            <div>

            <h1>Our awesome app</h1>

        <ul role="nav">

    <li><Link to="/grid">Grid</Link></li>

        <li><Link to="/details">Details</Link></li>

        </ul>

        {this.props.children}

    </div>

    )

    }

}

render(

<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="grid" component={GridComponent}/>
                 <Route path="details" component={UserDetail}>
                 <Route path="/details/:id" component={UserDetail}/>
            </Route>
        </Route>
    </Router>
</Provider>,
document.getElementById('app')

);