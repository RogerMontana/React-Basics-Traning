import {combineReducers} from 'redux';
import {TOGGLE_ACTIVE, FILTER, FILTER_DETAILS, START_LOADING, STOP_LOADING, ADD_DATA} from "../Constants";

let gridRecords = [
    {firstName: "John", lastName: "Doe", active: false, id: 1},
    {firstName: "Mary", lastName: "Moe", active: false, id: 2},
    {firstName: "Peter", lastName: "Noname", active: true, id: 3}
];

let detailsRecords = [{
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

let gridState = {
    records: [],
    filtered: [],
    loading: false
};

export function grid(state = gridState, action) {
    switch (action.type) {
        case START_LOADING:
            return Object.assign({}, state, {loading: true});
        case STOP_LOADING:
            return Object.assign({}, state, {loading: false});
        case ADD_DATA:
            return Object.assign({}, state, {
                records: [...action.value]
            });
        case FILTER:
            let filteredRecordsInd = state.records.reduce((result, record)=> {
                return record.firstName.toUpperCase().includes(action.value.toUpperCase()) || result.push(record.id), result;
            }, []);
            return Object.assign({}, state, {filtered: filteredRecordsInd});
        case TOGGLE_ACTIVE:
            let newRecords = [...state.records];
            newRecords[action.value].active = !newRecords[action.value].active;
            return Object.assign({}, state, {
                records: newRecords
            });
        default:
            return state
    }
}

export function details(state = detailsRecords, action) {
    switch (action.type) {
        case FILTER_DETAILS:
            return action.value ? detailsRecords.filter((record)=> {
                return record.id == action.value;
            }) : detailsRecords;
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    details,
    grid
});