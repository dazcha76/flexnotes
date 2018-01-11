import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { selectBinder } from '../../actions';

import Page from './page';

class Tab extends Component {
    constructor(props){
        super(props);

        this.state = {
            tab_color_arr: ['#ff0000', '#0000ff', '#ff00ff', '#FF8C00', '#008000'],
            editable: false
            //binder: this.props.binder_obj
        }



        this.addTab = this.addTab.bind(this);
        this.editTabs = this.editTabs.bind(this);
        this.notEditTabs = this.notEditTabs.bind(this);
    }

    // componentWillMount(){
    //     console.log("should component update");
    //     this.props.selectBinder(this.props.binder);
    // }

    addTab(){
        console.log('addTab clicked');
        const {binder, tab_color_arr} = this.state;
        //console.log(binder);
        const {tab_arr_obj} = binder;
        //console.log('tab_arr_obj:',tab_arr_obj);

        let length = tab_arr_obj.length;
        if(length === 0){
            let new_tab_obj = {
                tab_id: 1,
                tab_color: tab_color_arr[0],
                tab_name: 'Tab1',
                tab_url: '/tab1',
                page_arr_obj: [{
    
                    page_id: 1,
                    page_color: 'green',
                    page_name: 'Page1',
                    page_date: '',
                    page_url: '/page1'
                }]
            }

            binder.tab_arr_obj = [new_tab_obj];

            this.setState({
                binder: binder
            });
             
        } else {
            let new_index = tab_arr_obj[length-1].tab_id + 1;
            //console.log('tab_arr_obj',tab_arr_obj[length-1]);
            let new_url = '/tab' + new_index;
            //console.log('new_url:',new_url);
            let mod_index = new_index % 5;
            let new_tab_obj = {
                tab_id: new_index,
                tab_color: tab_color_arr[mod_index],
                tab_name: 'NewTab',
                tab_url: new_url,
                page_arr_obj: [{
    
                    page_id: 1,
                    page_color: 'green',
                    page_name: 'Page1',
                    page_date: '',
                    page_url: '/page1'
                }]
            }
    
            binder.tab_arr_obj = [...binder.tab_arr_obj, new_tab_obj];
    
            this.setState({
                binder: binder
            });
        }
    }

    editTabs(){
        console.log("editable should be true");
        this.setState({
            editable: true
        });
    }

    notEditTabs() {
        console.log("editable should be false");
        this.setState({ 
            editable: false 
        });
    }

    tabTextChanged(e, id){
        const {binder} = this.state;
        const {tab_arr_obj} = binder;
        //console.log("text changed, id:", id);
        //console.log(e.target.value);

        for(let i =0; i<tab_arr_obj.length; i++){
            if(tab_arr_obj[i].tab_id===id ){
                //console.log('binder_id and id match');
                tab_arr_obj[i].tab_name = e.target.value;
            }
        }

        binder.tab_arr_obj = tab_arr_obj;

        this.setState({
            binder: binder
        });
    }
    
    deleteTab(delete_id){

        const {binder} = this.state;
        const {tab_arr_obj} = binder;
        //console.log(binder_array);
        let deleteIndex = 0;
        for(deleteIndex; deleteIndex<tab_arr_obj.length; deleteIndex++){
            if(tab_arr_obj[deleteIndex].tab_id === delete_id){
                tab_arr_obj.splice(deleteIndex, 1);
            }
        }

        binder.tab_arr_obj = tab_arr_obj;

        this.setState({
            binder: binder
        });
    }

    render(){
        //this.props.selectBinder(this.props.binderObj);
        const {editable} = this.state;
        console.log('props in tab:', this.props);
        //const{ binder_url} = this.props;
        const{ tab_arr_obj} = this.props.binder;
        //console.log('binder tab_arr_obj', tab_arr_obj);
        //console.log('binder tab_arr_obj', binder_url);
        
        let tab_link = [];
        if(editable){
            tab_link = tab_arr_obj.map((item, index) => {
                //console.log('editable map:', item);
                return (
                    <li key={item.tab_id}>
                        <input 
                            className="edit_input"
                            ref='textInput'
                            type='text'
                            onChange={(e)=>this.tabTextChanged(e, item.tab_id)}
                            // onBlur={this.notEditable}
                           // onKeyPress={this.keyPressed}
                            value={item.tab_name}
                            />

                    <button type="button" className="btn btn-default btn_delete" onClick={()=>this.deleteTab(item.tab_id)} >
                        <span className="glyphicon glyphicon-minus"></span>
                    </button>
                        
                          
                    </li>
                );
            });

        } else {

            tab_link = tab_arr_obj.map((item, index) => {
                let tab_url = '/tab' + item.tab_id;
                //console.log('map:', item);
                var tabStyle ={
                    borderLeft: '12px solid '+item.tab_color
                }

                    return (
                        <li key={item.tab_id}><Link to={this.props.match.path + tab_url} style={{ textDecoration: 'none' }}>
                            <div className="tabDiv" style={tabStyle}>
                                {item.tab_name}
                            </div>
                        </Link></li>
                    );               
                 });
        }
    
        const tab_route = tab_arr_obj.map((item, index) => {
            let tab_url = '/tab' + item.tab_id;
            return(
                <Route key={item.tab_id} path={this.props.match.path + tab_url} render={()=> 
                    <Page tabObj={item}/>
                }
                />
            );
        });

        return(

            <div className='nav_tab'>
                
                <button type="button" className={`btn btn-default btn-xs btn_edit_tab ${editable ? 'hidden': 'visible'}`} onClick={this.editTabs}>
                    Tabs <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_tab ${editable ? 'visible': 'hidden'}`} onClick={this.notEditTabs}>
                    Tabs <span className="glyphicon glyphicon-ok"></span>
                </button>

                <ul className="nav-tab-col">
                    {tab_link}
                </ul>
                {tab_route}
                <button className={`btn btn-default btn-xs btn_add ${editable ? 'visible': 'hidden'}`} onClick={this.addTab}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>  
            </div>
        );
    }

    
}

function mapStateToProps(state){
    console.log('tab mstp', state);
    return {
        binderObj: state.binder.binderObj
    }
}
export default withRouter(connect(mapStateToProps,{ selectBinder })(Tab));
