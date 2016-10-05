/**
 * Created by artem on 10/4/16.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import {rootReducer} from '../Reducer/index.js'


export function loadDataInGrid(){

    return (dispatch)=>{

        dispatch(startLoading());

        fetch("http://localhost:4730")

            .then(function(response) {

            return response.json();

        }).then(function(json) {

            dispatch(addData(json.gridRecords))

        }).then(function(){

            dispatch(stopLoading());

        })

    }

}
export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(
    thunk
    )(createStore);
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}
