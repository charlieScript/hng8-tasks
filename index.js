const express = require('express');
const cors = require('cors')
const nodemailer = require('./nodemailer')
// create an express app
const app = express();

const PORT = process.env.PORT || 3000

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'));


app.get('/', (req, res) => {
  res.render('index')
})


app.post('/form', (req, res) => {
  try {
    const { email, name, message } = req.body
    nodemailer(email, 'Thanks for contacting Me')
    // message to myself
    nodemailer('onedibecharles19@gmail.com', `${email}, ${name}, ${message}`)
    res.status(200).json({
      message: 'sent'
    })
  } catch (error) {
    res.json({
      error: 'an error occurred'
    })
    console.log(error)
  }
})



// listen to port
app.listen(PORT, () => console.log('server started'));
