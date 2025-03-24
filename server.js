const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Corrected the typo

const connectDb = require('./consfig/connectDb');
const userRouter = require('./routes/userRouter');
const urlRouter = require('./routes/urlRouter');
const verifytoken = require('./middlerware/auth');
const URL = require('./models/urlModel');

const PORT = process.env.PORT || 4000;

// Database connection
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5000",
  credentials: true // Corrected typo from Credential to credentials
}));

app.use('/api/user', userRouter);
app.use('/api/url', verifytoken, urlRouter);

app.get('/:shortid', verifytoken, async (req, res) => {
  const shortid = req.params.shortid;

  try {
    const data = await URL.findOneAndUpdate(
      { shortid },
      {
        $push: {
          History: {
            timestamp: Date.now()
          }
        }
      },
      { new: true } // Ensures you get the updated document
    );

    if (data) {
      res.redirect(data.redirectURL);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




