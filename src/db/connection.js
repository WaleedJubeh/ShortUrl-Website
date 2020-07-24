const mongoose = require('mongoose');
require('dotenv/config');
mongoose.connect(process.env.MONGOAPP, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(status => {
    console.log("DB connected")
});

