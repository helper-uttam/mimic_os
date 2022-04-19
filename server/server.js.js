const jwt = require('jsonwebtoken');
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Get request")
})

var JSONtoken = '';
app.post('/signin', async(req, res) => {
    const user = req.body.user;
    //perform checking operations from DB

    //if successfull
    try {
        jwt.verify(JSONtoken, 'uttam') 
        res.send(true);
    } catch (error) {
        //check session
        JSONtoken = await jwt.sign({user}, 'uttam', {expiresIn:'5 m'})  
        res.send(true)
    }

    //else return('Something went wrong')
})

app.post('/signup', async (req, res) => {
    const user = req.body.user;
    JSONtoken = await jwt.sign({user}, 'uttam', {expiresIn:'5 m'})  
    const response = {
        user,
        token: JSONtoken
    }
    //save details in Databse

    res.send(true);
})


app.listen(3001, ()=>{
    console.log('Server is up at port : '+ (process.env.PORT || 3001));
})