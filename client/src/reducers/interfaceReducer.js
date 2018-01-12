import types from '../actions/types';

const DEFAULT_STATE = {
    binder_id: '',
    tab_id: '',
    page_id: '',
    navbar_min: false 
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.BINDER_UPDATE:
            return {...state, binder_id: action.payload};
        case types.TAB_UPDATE:
            return {...state, tab_id: action.payload};
        case types.PAGE_UPDATE:
            return {...state, page_id: action.payload};
        default:
            return state;
    }
}