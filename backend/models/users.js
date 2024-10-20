import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    links: [{
      name:{
        type:String,
      },
      url: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        default: 'Unsorted',
      },
    }],
  }, {
    timestamps: true,
  });

const User = mongoose.model('userDetails', UserSchema);
export default User;