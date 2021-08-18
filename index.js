const express = require('express');
const cors = require('cors')
const nodemailer = require('./nodemailer')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// create an express app
const app = express();

dotenv.config()

const PORT = process.env.PORT || 3000

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'));


app.get('/', (req, res) => {
  res.render('index')
})

// mongoose
mongoose
  .connect(
    'mongodb+srv://charles:chigozie1999@cluster0.65y34.mongodb.net/portforlio?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  )
  .then(() => {
    app.listen(PORT);
    console.log('server is started at', PORT);
  })
  .catch((err) => console.log(err));

const payloadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Payload = mongoose.model('payload', payloadSchema);


app.post('/form', async (req, res) => {
  try {
    const { email, name, message } = req.body
    nodemailer(email, 'Thanks for contacting Me')
    // message to myself
    nodemailer('onedibecharles19@gmail.com', `this User Contacted You ${email}, ${name}, ${message}`)
    await Payload.create({
      email, name, message 
    })
    res.status(200).json({
      message: 'will contact you soon'
    })
  } catch (error) {
    res.json({
      error: 'an error occurred'
    })
    console.log(error)
  }
})


