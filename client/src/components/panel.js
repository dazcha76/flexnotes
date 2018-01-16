import React, { Component } from 'react';
import PanelNum from './panel_num';
import '../assets/css/panel.css';
import axios from 'axios';
// import { SortablePane, Pane } from 'react-sortable-pane';
// import Resizable from 're-resizable';
import { connect } from 'react-redux';
import { binderArray, setNumOfPanels } from '../actions/index';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillMount() {
        //this.props.getBinderArray();

        // const url = '/api/page';
        //
        // axios.get(url).then((resp) => {
        //     this.setState({
        //         userName: resp.data.userName
        //     })
        // });
    }

    render() {
        return (
            <div>
                <header>
                    <div>
                        <h3 className="welcome">Welcome {/*this.props.binderArray.binderArr.userName */}!</h3>
                    </div>
                    <div className="panelOptions">
                        <div><h3 className="optionsTitle">Panels:</h3></div>
                        <div><button className="layoutBtn" onClick={() => { this.props.setNumOfPanels(3) }}>3</button></div>
                        <div><button className="layoutBtn" onClick={() => { this.props.setNumOfPanels(4) }}>4</button></div>
                    </div>
                </header>
                {/* <div className="col-xs-10">
                    <button onClick={this.sendSize} className="btn btn-primary">Save</button>
                    <h1 className="app-title">FlexNote</h1>
                </div> */}
                <div className="panel_div col-xs-10">
                    <PanelNum num={this.props.panel_num} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        binderArray: state.binderArray,
        panel_num: state.panelSpecs.numberPanels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBinderArray: function () {
            dispatch(binderArray())
        },
        setNumOfPanels: function (num) {
            dispatch(setNumOfPanels(num))
        }
    }
}

const VisiblePanel = connect(mapStateToProps, mapDispatchToProps)(Panel);

export default VisiblePanel;