let Invoice  = require('../models/invoice')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const MongoURI = 'mongodb://localhost:27017/DriversApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const conn = mongoose.createConnection(MongoURI)

let gfs;

conn.once('open',()=>{
    // init stream
    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('Faktury')
})

const get_all_invoices = (req,res) =>{
    Invoice.find()
     .then(faktura=>res.json(faktura))
     .catch(err=>res.status(400).json("Error: " + err))
}

const get_invoice = (req,res) =>{
    if(req.user !== undefined){
        if(req.user.isActive === true){
            Invoice.findById(req.params.id)
            .then(user=>res.json(user))
            .catch(err=>res.status(400).json("Error: " + err))
        }
        else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
        req.logout()
    }
}


const post_invoice = (req,res) =>{
    const {userId,kwota,data,nip} = req.body
    console.log(req.body)
    const newInvoice = new Invoice({
        userId:userId,
        kwota:kwota,
        data:data,
        nip:nip
    })
    newInvoice.save()
    .then(invoice=> res.json(invoice))
    .catch(err =>console.log(err))
}

const delete_invoice = (req,res) =>{
   
            Invoice.findByIdAndDelete(req.params.id)
            .then(user=>res.json('Exercise deleted'))
            .catch(err=>res.status(400).json("Error: " + err))
        

}
const update_invoice = (req,res) =>{
    if(req.user !== undefined){
        if(req.user.isActive === true){
            Invoice.findById(req.params.id)
            .then(user=>{
            // exercise.username = req.body.username
            // exercise.description = req.body.description
            // exercise.duration = Number(req.body.duration)
            // exercise.date = Date.parse(req.body.date)

            user.save()
            .then(()=>{res.json('Exercise updated!')})
            .catch(err=>res.status(400).json('Error: ' + err))
        })
        } 
        else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
        req.logout()
    }
   
}


const get_all_invoices_docs = (req,res) =>{
    gfs.collection('Faktury')
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length === 0){
            return res.status(404).json({
                err:"not file exists"
            })
        }else{
            res.json(files)
        }
    })
}

const get_invoice_doc = (req,res) =>{
    gfs.collection('Faktury')
    gfs.files.findOne({filename:req.params.filename},((err,file)=>{
       if(!file || file.length === 0){
           return res.status(404).json({
               err:"not file exists"
           })
       }
       if(file.contentType === "application/pdf"){
        //    read stream
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res)
       }else{
           res.status(404).json({err:"not an pdf"})
       }
    }))
}
const delete_invoice_doc = (req,res) =>{
    gfs.collection('Faktury')
    gfs.files.deleteOne({filename:req.params.filename},((err,file)=>{
       if(!file || file.length === 0){
           return res.status(404).json({
               err:"not file exists"
           })
       }else{
           res.status(200).json({msg:'File deleted'})
       }
    }))
}
module.exports = {
    get_all_invoices,
    get_invoice,
    post_invoice,
    delete_invoice,
    update_invoice,
    get_all_invoices_docs,
    get_invoice_doc,
    delete_invoice_doc

}