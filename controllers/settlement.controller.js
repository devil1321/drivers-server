let Settlement  = require('../models/settlement')


const get_all_settlements = (req,res) =>{
    Settlement.find()
        .then(user=>res.json(user))
        .catch(err=>res.status(400).json("Error: " + err))
}


const get_all_user_settlements = (req,res) =>{
    Settlement.find({userId:req.params.id})
    .then(user=>{
        console.log(user)
        res.json(user)
    })
    .catch(err=>res.status(400).json("Error: " + err))
}

const get_settlement = (req,res) =>{
    if(req.user !== undefined){
        if(req.user.isActive === true){
            Settlement.findById(req.params.id)
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

const post_settlement = (req,res) =>{
    const {userId,nrFaktury,data,imie,nazwisko,zus,rejestracja,email,uberAplikacja,uberGotowka,boltAplikacja,boltGotowka,freeNowAplikacja,freeNowGotowka,calyObrot,gotowkaRazem,napiwek,bonusy,potracenia,dodatek,podatek,zwrotFv,prowizjaBolt,premia,kwotaKoncowa_1,kwotaKoncowa_2,doWyplaty} = req.body
    const newSettlement = new Settlement({
        userId:userId,
        data:data,
        nrFaktury:nrFaktury,
        imie:imie,
        nazwisko:nazwisko,
        email:email,
        formaPlatnosci:{
            uberAplikacja:uberAplikacja,
            uberGotowka:uberGotowka,
            boltAplikacja:boltAplikacja,
            boltGotowka:boltGotowka,
            freeNowAplikacja:freeNowAplikacja,
            freeNowGotowka:freeNowGotowka,
        },
        napiwek:napiwek,
        bonusy:bonusy,
        potracenia:potracenia,
        dodatek:dodatek,
        rejestracja:rejestracja,
        zus:zus,
        calyObrot:calyObrot,
        gotowkaRazem:gotowkaRazem,
        podatek:podatek,
        zwrotFv:zwrotFv,
        prowizjaBolt:prowizjaBolt,
        premia:premia,
        kwotaKoncowa1:kwotaKoncowa_1,
        kwotaKoncowa2:kwotaKoncowa_2,
        doWyplaty:doWyplaty
    })
    newSettlement.save()
    .then(settlement=>{
        res.json({success:'rozliczenie added'})
    })
    .catch(err =>console.log(err))
}
const delete_settlement = (req,res) =>{
    if(req.user !== undefined){
        if(req.user.isActive === true){
            Settlement.findByIdAndDelete(req.params.id)
            .then(user=>res.json('Exercise deleted'))
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
const update_settlement = (req,res) =>{
    if(req.user !== undefined){
        if(req.user.isActive === true){
            Settlement.findById(req.params.id)
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

module.exports = {
    get_all_settlements,
    get_all_user_settlements,
    get_settlement,
    post_settlement,
    delete_settlement,
    update_settlement,
}