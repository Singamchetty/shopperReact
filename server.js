const express=require('express')
const {connectToDb, getDb} = require("./db")
const {ObjectId}=require("mongodb")
const cors= require("cors")
const app=express();

app.use(express.json())
app.use(cors())



connectToDb((err)=>{
    if(!err){
        app.listen(4000, ()=>{
            console.log('app listening on port 4000')
        })
        db=getDb()
    }
})


app.get('/products', (req, res) => {
    db.collection('products').find().toArray()
    .then(result => {res.send(result)})
    .catch(error => res.status(500).send(error))
})

// app.get('/products', (req, res) => {
//     const  pageIndex=parseInt(req.query.p || "0")
//     let pageSize=5;
//     db.collection('products').find().skip(pageIndex*pageSize).limit(pageSize).toArray()
//     .then(result => {res.send(result)})
//     .catch(error => res.status(500).send(error))
// })

app.get('/products/:id', (req, res) => {
    const Id = Number(req.params.id)
    if(!isNaN(Id)){
        db.collection('products').find({id: Id}).toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})

// Middleware function to check if userId already exists
const checkUserIdExists = (req, res, next) => {
    const userId = req.body.userId.trim();
    db.collection('users').findOne({ userId: userId })
    .then(result => {
        if (result) {
            res.status(400).json({ error: "userId already exists" });
        } else {
            next(); // Proceed to register user if userId is not taken
        }
    })
    .catch(error => res.status(500).json({ error: "Internal server error" }));
};
 
// Register User endpoint with middleware
app.post('/registeruser', checkUserIdExists, (req, res) => {
    const user = req.body;
    const userid=req.body.userId;
    db.collection('users').insertOne(user)
    .then(result => {
        res.status(201).json(result);
        db.collection('cartitems').insertOne({userId:userid,cartItems:[]})
    })
    .catch(err => res.status(500).json({ error: "Could not create a new document" }));
});
 
// Get Users endpoint
app.get('/users', (req, res) => {
    // db.collection('users').find({}, { projection: { _id: false, userId: true, password: true } }).toArray()
    db.collection('users').find({}, { projection: { _id: false} }).toArray()
    .then(result => {
        res.send(result);
    })
    .catch(error => res.status(500).send(error));
});

app.delete('/deregister/:userid', (req, res) => {
    const userid = req.params.userid
    if(isNaN(userid)){
        db.collection('users').deleteOne({userId:userid})
        .then(result => {
            res.send(result)
            db.collection('cartitems').deleteOne({userId:userid})
         })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})
 
app.patch('/updateuser/:id', (req, res) => {
    const Id = req.params.id
    const data = req.body
    if(ObjectId.isValid(Id)){
        db.collection('users').updateOne({_id:new ObjectId(Id)},{$set:data})
        .then(result => { res.send(result) })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})

app.get('/cartItems/:userid', (req, res) => {
    const userid = req.params.userid
    if(isNaN(userid)){
        db.collection('cartitems').find({userId: userid}).toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid UserId' })
    }
})
 
app.post('/updateCartItems/:userid', (req, res) => {
    const userid=req.params.userid
    const newCartItems = req.body.ObjectId
    console.log(req.body,userid)
    // if(isNaN(userid)){
    //     db.collection('cartitems').updateOne({userId: userid},{$set:{cartItems:[newCartItems]}})
    //     .then(result => { res.send(result).status(200) })
    //     .catch(error => res.status(500).send(error))
    // } else {
    //     res.status(500).json({ error: 'Invalid UserId' })
    // }
})