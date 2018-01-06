const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
let dummyData = require('../dummyData/backEndDummyData');
const { User, Binder, Tab, Page, Note, Video } = require('../models');

//Restful/ CRUD operation 

module.exports = app => {
    app.get('/', (req,res)=>{
        res.send('Homepage')
    })
    app.get('/userInfo', requireLogin, (req,res)=>{
        
        res.send(req.user);
    })
    app.get('/dummyData', requireLogin, (req,res)=>{
        res.send(dummyData);

    })
    // app.get('/dummyData', (req,res)=>{
    //     if(req.user.userName=== 'JOhn Hong'){
    //         dummyData.binder_arr_obj.forEach(ele=>{
    //             if(ele.binder_id === 1){
    //                 console.log('if passed')
    //                 ele.binder_name= "binder name changed";
    //                 res.send(dummyData);
    //             }
    //         })

    //     }


    // })
    app.post('/dummyData', (req,res)=>{
        

        res.send(dummyData);
    })

    app.get('/main/:userId', requireLogin, async (req, res)=>{
        //pull entire user obj
        
    })
// For Binder //
    app
    .get('/main/:userId/:binderId', requireLogin, async (req,res)=>{
        //give binder data
        //userId accessible via req.param.userId?
        console.log('you reached here', req.user)
    }) 
    .post('/main/binder/new', async (req,res)=>{
        //create new binder in user
        const existingUser = await User.findOne({ 'googleId': "105357479853481878063" }, function(err, user) {
            if (err) return console.log(err);

            if(user){
                const defaultBinder = new Binder();
                defaultBinder.tab_arr_obj.push(new Tab());
                defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({page_color:'orange'}));
                defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({videoInfo: 'No Info'}));
                defaultBinder.tab_arr_obj[0].page_arr_obj[0].notes.document.nodes.push(new Note());
                user.binder_arr_obj.push(defaultBinder);
                user.save()
                console.log("User has a new binder and is now saved");
            }
            
        });

        

        res.end();
    }) 
    .delete('/main/:userId/:binderId', requireLogin, async (req,res)=>{
        //delete binder
    }) 
    .put('/main/:userId/:binderId', requireLogin, async (req,res)=>{
        // update binder
    }) 
// For Tab//
    app.get('/main/:userId/:binderId/:tabId', requireLogin, async (req,res)=>{
        //give tab data
        // www.chung.com/user/1/binder/4/tab/3
    }); 
    app.post('/main/:userId/:binderId/:tabId', requireLogin, async (req,res)=>{
        //create new tab in user
    }); 
    app.delete('/main/:userId/:binderId/:tabId', requireLogin, async (req,res)=>{
        //delete tab
    }); 
    app.put('/main/:userId/:binderId/:tabId', requireLogin, async (req,res)=>{
        // update tab
    }); 

// For Page //

    app.get('/main/:userId/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //give page data
    }); 
    app.post('/main/:userId/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //create new page in user
    }); 
    app.delete('/main/:userId/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //delete page
    }); 
    app.put('/main/:userId/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        // update page
    }); 



    
    
}