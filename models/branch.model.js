const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    subjectCount : {
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

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;