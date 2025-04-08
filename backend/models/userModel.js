const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:{type:String,required:true},
    name: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type:String, require:true}
}, { timestamps: true });

module.exports = mongoose.model('auth', userSchema);
