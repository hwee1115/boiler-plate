const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

//스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim: true,
        unique : 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastName:{
        type: String,
        maxlength:50
    },
    role:{
        type: Number,
        default:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
            //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {        // user-> myPlaintextPassword <-postman에 넣어둔 비밀번호
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword , cb){

    //plainPassword 1234567     암호화된 비밀번호 "$2b$10$urvTG3p1ivqrbvVTSFAaSeRPvPdsvy280EgpLbPfw0U22nu/7BF36"
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 token을 생성하기
    var token= jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

const User = mongoose.model('User', userSchema) //모델로 스키마 감싸기
module.exports = {User} //다른 파일에서도 사용할 수 있도록