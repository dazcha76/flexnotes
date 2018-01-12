import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlayList, playVideo } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends Component {
    addToPlayList (obj) {
        videoData.items.push(obj);
        console.log(videoData);
    }
    render() {
        const {results} = this.props;
        console.log("Here is the results from the results comp: ", results);
        const list = results.map((item, index) => {
            console.log(item.url);
            return (
                <li className="result-item list-group-item col-xs-12" key={index}>
                    <div className="col-xs-8">
                        <li className="video-items">{item.videoTitle}</li>
                    </div>
                    <div className="col-xs-4">
                        <button className="btn-sm btn-success pull-right" onClick={ () => { this.props.addToPlayList(item) } }><span className="glyphicon glyphicon-plus"></span></button>
                        <button className="btn-sm btn-primary pull-right" onClick={ () => { this.props.playVideo(item.url) }}><span className="glyphicon glyphicon-play"></span></button>
                    </div>
                </li>
            );
        });
        return (
            <ul className="results text-left">{list}</ul>
        );

    }
}

function mapStateToProps (state) {
    return {
        playlist: state.results.playlist,
        url: state.results.url
    }
}

export default connect(mapStateToProps, { addToPlayList, playVideo })(Results);