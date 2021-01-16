const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')       //클라이언트에서 서버로 보내는 자료
const {User} = require("./models/User")

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended:true}));    //bodyParser를 이용하여 클라이언트에 정보를 받게해줌

app.use(bodyParser.json());

//mongoose 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>{
    console.log('MongoDB Connected...')
}).catch(err=>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕하세요~')
})

app.post('/register', (req,res) =>{
    //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어줌
    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.json({sucess: false, err})
        return res.status(200).json({
            sucess: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})