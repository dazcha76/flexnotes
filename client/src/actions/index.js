import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

//PANEL SPECs Action Creator

// Yo hyung, if I set PUT request individually in each of these functions, they will overwrite each other right????
export function setTopLeftHeight(num, interfaceObj) {
    axios.put('/api/page', {

        top_left_panel_height: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    });

    return {
        type: types.PANEL_TOP_LEFT_HEIGHT,
        payload: num
    }
}

export function setTopLeftWidth(num, interfaceObj) {
    axios.put('/api/page', {
        top_left_panel_width: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    });

    return {
        type: types.PANEL_TOP_LEFT_WIDTH,
        payload: num
    }
}

export function setTopRightHeight(num, interfaceObj) {
    axios.put('/api/page', {
        top_right_panel_height: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    });

    return {
        type: types.PANEL_TOP_RIGHT_HEIGHT,
        payload: num
    }
}

export function setNumOfPanels(num, interfaceObj) {
    axios.put('/api/page', {
        number_of_panels: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    });

    return {
        type: types.NUM_OF_PANELS,
        payload: num
    }
}

//Lecture Slides Action Creator

export function setSlidesUrl(value, interfaceObj) {
    console.log("setSlides url action 1:", value);
    if (value) {
        if (value.indexOf('presentation/d/') !== -1 || value.indexOf('presentation/d/e') !== -1) {
            if (value.indexOf('presentation/d/e') !== -1) {
                const urlSplit1 = value.split("presentation/d/e/");
                const urlSplit2 = urlSplit1[1].split('/');
                let presentationID = urlSplit2[0];
                const slidesURL = `https://docs.google.com/presentation/d/e/${presentationID}/embed`;
                axios.put('/api/page', {
                    lecture_slides: {
                        lec_id: slidesURL
                    },
                    binderID: interfaceObj.binder_id,
                    tabID: interfaceObj.tab_id,
                    pageID: interfaceObj.page_id
                });
                return {
                    type: types.SET_SLIDES_URL,
                    payload: slidesURL
                }
            }
            const urlSplit1 = value.split("presentation/d/");
            const urlSplit2 = urlSplit1[1].split('/');
            let presentationID = urlSplit2[0];
            const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`;
            axios.put('/api/page', {
                lecture_slides: {
                    lec_id: slidesURL
                },
                binderID: interfaceObj.binder_id,
                tabID: interfaceObj.tab_id,
                pageID: interfaceObj.page_id
            });
            return {
                type: types.SET_SLIDES_URL,
                payload: slidesURL
            }
        }
        else {
            return {
                type: types.SET_SLIDES_URL,
                payload: ''
            };
        }
    }
    else {
        return {
            type: types.SET_SLIDES_URL,
            payload: ''
        };
    }
}
// End of Lecture Slides Action Creators

//Video Action Creators
export function toggleModal({ display }) {
    let displayValue = display;
    if (displayValue === 'none') {
        displayValue = 'block';
    } else {
        displayValue = 'none';
    }
    return {
        type: types.TOGGLE_MODAL,
        payload: displayValue
    }
}
export function getVideoResults(videos) {
    return {
        type: types.GET_VIDEO_RESULTS,
        payload: videos
    }
}
export function getResultStyles(styles, bool) {
    if (!bool) {
        styles = {
            transform: 'translateX(100%)'
        }
    } else {
        styles = {
            transform: 'translateX(0%)'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_RESULT_STYLES,
        payload: styles
    }
}
export function getOpacityDisplay(styles, bool) {
    if (!bool) {
        styles = {
            display: 'none'
        }
    } else {
        styles = {
            display: 'block'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_OPACITY_DISPLAY,
        payload: styles
    }
}
export function toggleResults(bool) {
    let toggleResults = !bool
    return {
        type: types.TOGGLE_RESULTS,
        payload: toggleResults
    }
}
export function addToPlaylist(videoUrl, videoTitle, interfaceObj) {
    let videoId = videoUrl.split("/");
    videoId = videoId[4];
    return (dispatch) => {
    const videoTest = axios.post('/api/video', {
        video: {
            videoTitle: videoTitle,
            videoId: videoId,
            videoUrl: videoUrl
        },
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    }).then( (response) => {
        console.log("DATA HAS BEEN SENT", response);
        dispatch({
            type: types.ADD_TO_PLAYLIST,
            payload: videoUrl
        });
        }).catch(error => {
            dispatch({
                type: 'error',
                message: 'Failed call in add binder.'
            })
        })
    };
}

export function playVideo(url) {
    let videoId = url;
    document.querySelector(".video-iframe").src = url
    return {
        type: types.PLAY_VIDEO,
        payload: videoId
    }
}
export function playPastedLinkVideo(url) {
    let videoId = url
    videoId = videoId.split('&')[0];
    videoId = videoId.split('=')[1];
    videoId = `https://www.youtube.com/embed/${videoId}`;
    console.log("PLAY PASTED LINK VIDEO: ", videoId)
    return {
        type: types.PLAY_PASTED_VIDEO_LINK,
        payload: videoId
    }
}
export function grabVideoUrl(videoLink) {
    return {
        type: types.GRAB_VIDEO_URL,
        payload: videoLink
    }
}
export function setVideoUrl (value, interfaceObj) {
    console.log("VIDEO URL FROM ACTION CREATOR: ", value);
    return {
        type: types.SET_VIDEO_URL,
        payload: value
    }
}
// END OF VIDEO ACTION CREATORS
export function getDataObject() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                //console.log("get data object: ", resp.data);

                dispatch({
                    type: types.GET_USER_DATA,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in get user data'
                });
            });
    }
}

export function updateBinderArray() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                console.log("get response: ", resp.data.binder_arr_obj);

                dispatch({
                    type: types.UPDATE_BINDER_ARRAY,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

export function selectBinder(binderObj) {
    return {
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function selectTab(tabObj) {
    return {
        type: types.SELECT_TAB,
        payload: tabObj
    }
}

export function selectPage(pageObj) {
    return {
        type: types.SELECT_PAGE,
        payload: pageObj
    }
}

export function addBinder() {
    return (dispatch) => {
        const test = axios.post('/api/binder')
            .then((resp) => {
                //console.log("addBinder response: ", resp);
                dispatch({
                    type: types.ADD_BINDER,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in add binder'
                });
            });
    }
}

export function addTab(binder_id) {
    return (dispatch) => {
        const test = axios.post('/api/tab', {
            binderID: binder_id
        })
            .then((resp) => {
                //console.log("add tab: ", resp);
                dispatch({
                    type: types.ADD_TAB,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in add tab'
                });
            });
    }
}

export function addPage(binder_id, tab_id) {
    return (dispatch) => {
        const test = axios.post('/api/page', {
            binderID: binder_id,
            tabID: tab_id
        })
            .then((resp) => {
                //console.log("addPage response: ", resp);
                dispatch({
                    type: types.ADD_PAGE,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in add page'
                });
            });
    }
}

export function deleteBinder(binder_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/binder?binderID=${binder_id}`, {
        })
            .then((resp) => {
                //console.log("delete binder response: ", resp.data);

                dispatch({
                    type: types.DELETE_BINDER,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in delete binder'
                });
            });
    }
}

export function deleteTab(binder_id, tab_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/tab?binderID=${binder_id}&tabID=${tab_id}`, {
        })
            .then((resp) => {
                //console.log("delete tab response: ", resp);

                dispatch({
                    type: types.DELETE_TAB,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in delete tab'
                });
            });
    }
}

export function deletePage(binder_id, tab_id, page_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/page?binderID=${binder_id}&tabID=${tab_id}&pageID=${page_id}`, {
        })
            .then((resp) => {
                console.log("delete page response: ", resp);

                dispatch({
                    type: types.DELETE_PAGE,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in delete page'
                });
            });
    }
}