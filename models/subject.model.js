const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    topicCount : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
        default: 'No Description Available!'
    },
}, {
    timestamps: true,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;