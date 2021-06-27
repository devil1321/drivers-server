const mongoose = require('mongoose')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

const SettlementSchema = new mongoose.Schema({
    userId:ObjectId,
    data:{
        type:Date
    },
    nrFaktury:{
        type:Number
    },
    imie:{
        type:String,
    },
    nazwisko:{
        type:String,
    },
    email:{
        type:String,
    },
    formaPlatnosci:{
        uberAplikacja:{  
            type:Number
        },
        uberGotowka:{
            type:Number
        },
        boltAplikacja:{  
            type:Number
        },
        boltGotowka:{
            type:Number
        },
        freeNowAplikacja:{  
            type:Number
        },
        freeNowGotowka:{
            type:Number
        }
    },
    calyObrot:{
        type:Number
    },
    gotowkaRazem:{
        type:Number
    },
    podatek:{
        type:Number
    },
    zuszwrotFv:{
        type:Number
    },
    prowizjaBolt:{
        type:Number
    },
    premia:{
        type:Number
    },
    rejestracja:{
        type:String
    },
    napiwek:{
        type:Number
    },
    bonusy:{
        type:Number
    },
    potracenia:{
        type:Number
    },
    dodatek:{
        type:Number
    },
    zus:{
        type:Number
    },
    kwotaKoncowa1:{
        type:Number
    },
    kwotaKoncowa2:{
        type:Number
    },
    doWyplaty:{
        type:Number
    },
 
},{timestamps:true})

const Settlement = mongoose.model('Rozliczenia',SettlementSchema,'Rozliczenia')

module.exports = Settlement