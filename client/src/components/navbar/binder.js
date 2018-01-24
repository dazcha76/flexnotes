import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, selectBinder, addTab, deleteTab, deleteBinder, editBinder } from '../../actions';


import Tab from './tab';

import '../../assets/css/navbar.css';

class Binder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: false,
            binderName : '',
            active: false
        }

        this.addTab = this.addTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
        this.editable = this.editable.bind(this);
        this.notEditable = this.notEditable.bind(this);
        this.binderSelect = this.binderSelect.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
    }

    componentDidMount(){
        if(this.props.index===0){
            this.setState({
                active: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.hasOwnProperty("binderObj")){
        //     this.setState({
        //         binderName: nextProps.binderObj.binder_name
        //     });
        // }
        //console.log('nextProps: ',nextProps);
        //console.log('this.props in CWRP: ', this.props);
        // if(!this.props.binder || !nextProps.binder){
        //     return;
        // }
        //  if(this.props.binder != nextProps.binder){
        //      this.props.updateBinderArray();
        //  }
        if(this.props.hasOwnProperty("binderObj")){
            // this.setState({
            //     binderName: this.props.binderObj.binder_name
            // });
            if(nextProps.interface.binder_id === this.props.binderObj._id){
                //console.log('setting active to true');
                this.setState({
                    active: true

                });
            } else {
                this.setState({
                    active: false

                });
            }
        }

    }

    addTab(){
        //console.log('addTab clicked');
        this.props.addTab(this.props.binderObj._id);
        //this.props.updateBinderArray();
    }

    deleteTab(tab_id) {
        //console.log('delete tab btn clicked, tab_id: ', tab_id);
        //console.log('delete tab btn clicked, binder_id: ', this.props.binderObj._id);
        if(this.props.binderObj.tab_arr_obj.length === 1){
            console.log('can not delete last tab');
            return;
        }

        this.props.deleteTab(this.props.binderObj._id, tab_id);
        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }

    deleteBinder(delete_id) {
        //console.log('delete button clicked, binder_id: ', delete_id);
        if(this.props.binderArr.length === 1){
            console.log('can not delete last binder');
            return;
        }
        this.props.deleteBinder(delete_id);
        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }

    editable() {
        //console.log("editable should be true");
        this.setState({
            editable: true,
            binderName: this.props.binderObj.binder_name
        });
    }

    notEditable() {
        //console.log("editable should be false");
        const { binderName } = this.state;
        this.props.editBinder(this.props.binderObj._id, binderName);
        this.setState({
            editable: false
        });
        

    }
    editBinderName(e){


        this.setState({
            binderName: e.target.value
        });
    }

    binderSelect(){
        //console.log('binderObj:' ,binderObj);
        this.props.selectBinder(this.props.binderObj);
    }

    render() {
        const { active, editable, binderName } = this.state;
        console.log("Binder props:", this.props);
        //console.log("Binder state:", this.state);
        if(!this.props.binderObj){
            return null;
        }
        const { tab_arr_obj } = this.props.binderObj;

        let binder_url = this.props.binderObj._id;

        let binder_title = [];

        if(editable){
            //let editName = this.props.binderObj.binder_name;
            binder_title = (
                <div className="binderTitle">
                         <input 
                             className="edit_input"
                             ref='textInput'
                             type='text'
                             onChange={(e)=>this.editBinderName(e)}
                             // onBlur={this.notEditable}
                            // onKeyPress={this.keyPressed}
                             value={binderName}
                             />
                <button type="button" className={`btn-floating ${editable ? 'visibleBinder' : 'hiddenBinder'}`} onClick={this.notEditable}>
                Done
                </button>
            </div>              
            );
        } else {
            binder_title = (
                <div className="binderTitle">
                    <Link to={`/main/${binder_url}`} style={{ textDecoration: 'none' }} >
                                <div className="binderLink"  onClick={()=>this.binderSelect()}>
                                    {this.props.binderObj.binder_name}
                                </div>
                    </Link>
                    <div className="left-align">
                        <button type="button" className={`btn-floating navbar-btn edit-btn ${this.props.interface.editable ? 'visible' : 'hidden'}`} onClick={this.editable}>
                        <i className="small material-icons">edit</i>
                        </button>
                        <button type="button" className={`btn-floating navbar-btn delete-btn ${this.props.interface.editable ? 'visible' : 'hidden'}`} onClick={()=>this.deleteBinder(this.props.binderObj._id)}>
                        <i className="small material-icons">delete_forever</i>
                        </button>
                    </div>
                </div>
            );
        }


        let tab_link = tab_arr_obj.map((item, index) => {
            let tab_url = '/' + item._id;
            //console.log('tab map:', item);
            var tabStyle ={
                borderLeft: '12px solid '+item.tab_color
            }

                return (
                    <div key={index} className="tabWrap">
                        <Tab index={index} tabObj={item}/>
                    </div>
                    // <Link to={'/main/'+ binder_url + tab_url} key={index} style={{ textDecoration: 'none' }}>

                    //     <div className=""style={tabStyle}>
                    //         {item.tab_name}
                    //     </div>
                    // </Link>
                );               
                });

        return (
            <div>
                {binder_title}

                <div className={`binderBody ${active ? 'visible' : 'hidden'}`}>

                    {tab_link}
                
                
                {/* <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'hidden' : 'visible'}`} onClick={this.editable}>
                    Binders <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditable}>
                    Binders <span className="glyphicon glyphicon-ok"></span>
                </button>



                <ul className="binder_wrap">
                    {/* {binder_link} 




                <button className={"btn btn-default btn-xs btn_add"} onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button> */}
                <button className="btn add-btn-tab waves-effect waves-light" onClick={this.addTab}>
                New Tab</button>  
                <Route path={`/main/${binder_url}`+"/:tab"} component={Tab}/>
                </div>
            </div>
        );
    }
}
    function mapStateToProps(state){
        //console.log('binder mstp', state);
        return{
            binderArr: state.binderArray.binderArr,
            binder: state.binder.binderObj,
            interface: state.interface
        }
    }

    export default withRouter(connect(mapStateToProps,{ updateBinderArray, selectBinder, addTab, deleteTab, deleteBinder, editBinder})(Binder));


