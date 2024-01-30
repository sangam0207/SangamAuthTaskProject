const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const secretKey = "mynameissangamshuklaandiloveagirlhernameisshreyadixitsheissolovely";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tasks: [
    {
      description: {
        type: String,
        required: true,
        trim: true,
      }
    }
      
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(this.password, 12);
    this.password = hashPassword;
    const hashcpassword = await bcrypt.hash(this.cpassword, 12);
    this.cpassword = hashcpassword;
  }
  
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretKey, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log('Token not generated');
  }
}

const userdb = mongoose.model("userdb", userSchema);

module.exports = { userdb, secretKey };
