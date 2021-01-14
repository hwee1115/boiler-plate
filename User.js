const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema) //모델로 스키마 감싸기
module.exports = {User} //다른 파일에서도 사용할 수 있도록