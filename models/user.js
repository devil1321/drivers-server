const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    isAdmin:{
        type:Boolean
    },
    isActive:{
        type:Boolean
    },
    login:{
        type:String
    },
    email:{
        type:String
        // required:true
    },
    password:{
        type:String
        // required:true
    },
    imie:{
        type:String
        // required:true
    },
    nazwisko:{
        type:String
        // required:true
    },
    dataUrodzin:{
        type:Date
    },
    plec:{
        type:String
    },
    pesel:{
        type:Number
    },
    telefon:{
        type:Number
    },
    nrDowodu:{
        type:String
    },
    auto:{
        type:Boolean,
        // required:true
    },
    pojazd:{
        type:String
    },
    nrRej:{
        type:String
    },
    wojewodztwo:{
        type:String
        // required:true
    },
    adres:{
        type:String
    },
    nrDomu:{
        type:Number
    },
    miasto:{
        type:String
    },
    zip:{
        type:String
    }
},{timestamps:true})

const User = mongoose.model('Users',UserSchema,'Users')

module.exports = User