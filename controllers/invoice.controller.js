
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

const get_all_user_invoices = (req,res) =>{
    gfs.collection('Faktury')
    gfs.files.find({"metadata.userId":req.params.id}).toArray((err,files)=>{
        if(!files || files.length === 0){
            return res.status(404).json({
                err:"not file exists"
            })
        }else{
            res.json(files)
        }
    })
}

const get_invoice = (req,res) =>{
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

const post_invoice = (req,res) =>{
    console.log('faktura added')
    res.json(req.body)
}


const delete_invoice = (req,res) =>{
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
    post_invoice,
    get_all_invoices,
    get_all_user_invoices,
    get_invoice,
    delete_invoice
}