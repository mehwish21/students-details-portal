const { Schema, default: mongoose } = require("mongoose");

const studentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    marks: { type: Number, required: true },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('students', studentSchema)