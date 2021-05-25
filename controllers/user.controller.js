const passport = require('passport')
const bcrypt = require('bcryptjs')
let User  = require('../models/user')
const { session } = require('passport')

const register_user = (req,res) =>{
    const {email,password,password2,imie,nazwisko,auto,wojewodztwo } = req.body
    let errors = []
     // heck required fields
    //  if( !email || !password || !password || !imie || !nazwisko || auto === "" || !region){
    //      errors.push({msg:"Please fill all fields"})
    //  }
     // check passwords match
     if(password !== password2){
         errors.push({msg:"Passwords do not match"})
     }
     // check to pass length
     if(password.length < 6){
         errors.push({msg:"Password should be at least characters"})
     }
     if(errors.length > 0){
         res.json(errors)
     }else{
         // validation pass
         User.findOne({email:email})
             .then(user=>{
                 if(user){
                     // user exists
                     errors.push({msg:"Email is already registered"})
                     res.json(errors)
                 }else{
                     const newUser = new User({
                         email,
                         password,
                         isAdmin:false,
                         isActive:true,
                         imie,
                         nazwisko,
                         auto,
                         wojewodztwo
                     })
                 //   hash password
                 bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    //  if(err) throw err
                     // set password to hashed
                     newUser.password = hash
                     // save user
                     newUser.save()
                         .then(user=>{
                             res.json({success:'You are now registered and can log in'})
                             res.redirect('/users/login')
                         })
                         .catch(err =>console.log(err))
                    
                 }))
                 }
             })
     }
}
const login_user = (req,res,next) =>{
    User.findOne({email:req.body.email})
    .then(user => {
        res.json(user)
        // passport.authenticate('local',{
        //     successRedirect:`/users/logged-user`,
        //     failureRedirect:'/',
        // })(req,res,next)
    })
}
const logout_user = (req,res) =>{
    console.log('logged')
    req.logout()
    res.redirect('/')
}

const get_logged_user = (req,res) =>{
    
    
        if(req.user.isActive === true){
            User.find()
            .then(user =>res.json(user))
            .catch(err=>res.status(400).json('Error: ' + err))
        }else{
            req.logout()
            res.redirect('/')
        }
    
}

const get_all_users = (req,res) =>{
    
            User.find()
            .then(user=>res.json(user))
            .catch(err=>res.status(400).json("Error: " + err))
 
}
const get_user = (req,res) =>{
    
            User.findById(req.params.id)
            .then(user=>res.json(user))
            .catch(err=>res.status(400).json("Error: " + err))
     

}
const delete_user = (req,res) =>{

            User.findByIdAndDelete(req.params.id)
            .then(user=>res.json('Exercise deleted'))
            .catch(err=>res.status(400).json("Error: " + err))
         
}
const update_user = (req,res) =>{
            User.findById(req.params.id)
            .then(user=>{
            console.log(req.body)

                const { login, email, imie, nazwisko, dataUrodzin, plec, pesel, nrDowodu, telefon, auto, adres, nrDomu, miasto, wojewodztwo, zip } = req.body
                console.log(req.body)
                user.login = login
                user.email = email
                user.imie = imie
                user.nazwisko = nazwisko
                user.dataUrodzin = dataUrodzin
                user.plec = plec
                user.pesel = pesel
                user.nrDowodu = nrDowodu
                user.telefon = telefon
                user.auto = auto
                user.adres = adres
                user.nrDomu = nrDomu
                user.miasto = miasto
                user.wojewodztwo = wojewodztwo
                user.zip  = zip
            user.save()
            .then(user=> res.json(user))
            .catch(err=>res.status(400).json('Error: ' + err))
        })
    
}
const change_active_user = (req,res)=>{
    User.findByIdAndUpdate(req.params.id)
        .then(user=>{
            user.isActive = req.body.isActive
            user.save().then(user=>res.json(user))
        })
}
module.exports = {
    register_user,
    login_user,
    logout_user,
    get_logged_user,
    get_all_users,
    get_user,
    delete_user,
    update_user,
    change_active_user
}