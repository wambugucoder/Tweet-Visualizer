const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: {
    type: String,
    
  } ,
  photo: {
      type: String,
     
    },
    name: {
        type: String,
       
      },
     email: {
        type: String,
       
      },
      twitterId: {
        type: String,
       
      },
});

module.exports = User = mongoose.model("users", UserSchema);