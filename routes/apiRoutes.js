const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
let dummyData = require('../dummyData/backEndDummyData');

//Restful/ CRUD operation 

module.exports = app => {
    app.get('/', (req,res)=>{
        res.send('Homepage')
    })
    app.get('/lala', (req,res)=>{
        console.log('ahaha');
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
    .post('/main/:userId/:binderId', requireLogin, async (req,res)=>{
        //create new binder in user
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