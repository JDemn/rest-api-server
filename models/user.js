const { Schema, model } = require('mongoose');
const { USER_ROLES } = require('../constants/constants');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: false
    },
    surnames: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    role : {
        type : String,
        required : true,
        enum : Object.values(USER_ROLES)
    },
    phoneNumber: {
        type : Number,
        required: false
    },
    email :  {
        type : String,
        required : true
    }
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.methods.toJSON =  function(){
    const {__v,password,_id,...user} = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model( 'User', UserSchema );
