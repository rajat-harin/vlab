const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    branch: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    introduction: {
        type: String,
        required: true,
        default: 'No introduction Available!'
    },
    theory: {
        type: String,
        required: true,
        default: 'No theory Available!'
    },
    objective: {
        type: Array,
        required: true,
        default: 'No objective Available!'
    },
    procedure: {
        type: Array,
        required: true,
        default: 'No procedure Available!'
    },
}, {
    timestamps: true,
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;