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

app.post('/registeruser',(req,res)=>{
    const user=req.body
    db.collection('users').insertOne(user)
    .then(result => {
        res.status(201).json(result)})
     .catch((err)=>res.status(500).json({error:"Could not create a new document"}))
 })

app.get('/users', (req, res) => {
    db.collection('users').find().toArray()
    .then(result => {res.send(result)})
    .catch(error => res.status(500).send(error))
})

app.delete('/deregister/:id', (req, res) => {
    const Id = req.params.id
    if(ObjectId.isValid(Id)){
        db.collection('users').deleteOne({_id:new ObjectId(Id)})
        .then(result => { res.send(result) })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})

app.patch('/update/:id', (req, res) => {
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
