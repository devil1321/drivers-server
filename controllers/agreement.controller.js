const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

let gfs;

const MongoURI = 'mongodb://localhost:27017/DriversApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const conn = mongoose.createConnection(MongoURI)

conn.once('open',()=>{
    // init stream
    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('Umowy')
})

const get_all_agreements = (req,res) =>{
    gfs.collection('Umowy')
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
const get_agreement = (req,res) =>{
    gfs.collection('Umowy')
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
const post_agreement = (req,res) =>{
    console.log('umowa added')
    res.json(req.body)
}
const delete_agreement = (req,res) =>{
    gfs.collection('Umowy')
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
const update_agreement = (req,res) =>{
   
   
}

module.exports = {
    get_all_agreements,
    get_agreement,
    post_agreement,
    delete_agreement,
    update_agreement,
}