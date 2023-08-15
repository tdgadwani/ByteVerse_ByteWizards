const localStrategy=require("passport-local").Strategy;
const Register = require("./models/registers");
const bcrypt = require("bcryptjs");
exports.initializingPassport = (passport)=>{
    passport.use(new localStrategy(async(email,password,done)=>{
        try{
            const user=await Register.findOne({email});
            if(!user)
                return done(null,false);
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(!passwordMatch)
                return done(null,false);
            return done(null,user);  
        }
        catch(err){
            return done(err,false);
        }  
    }
    ));
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })
    passport.deserializeUser(async (id,done)=>{
        try{
            const user=await Register.findbyId(id);
            done(null,user);
        }
        catch(err){
            done(err,false);
        }
    });

};