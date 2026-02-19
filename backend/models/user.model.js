const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profilePic:{
        type:String
    },
   
}, {timestamps:true});



UserSchema.pre("save", async function () {
      if (!this.isModified("password")) return next();
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      
})

UserSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

module.exports = mongoose.model('User', UserSchema);