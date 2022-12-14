const express = require('express')
const mongoose = require('mongoose')
const  route = require('./routes/route')
const app = express()

app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://mehwish:W6xlN2g0HqxeIte8@cluster0.vb8kq9u.mongodb.net/ma", {useNewUrlParser:true
})

.then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err))

app.use('/',route)


app.listen(process.env.PORT || 3000,() =>{
    console.log("Listening on port 3000")
})