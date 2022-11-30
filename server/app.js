const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./config/keys')


mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected', () => {
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(cors({
    origin: ["https://63853c5c52896371bf4dbdc3--warm-pie-b5d7c5.netlify.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
}));


if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running on", PORT)
})