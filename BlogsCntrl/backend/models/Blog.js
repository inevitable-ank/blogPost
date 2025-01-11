const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
