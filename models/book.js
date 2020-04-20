const mongoose = require('mongoose');
// const path = require('path');

// const coverImageBasePath = 'uploads/bookCovers';

// biến lưu trong db
const  bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
})

bookSchema.virtual('coverImagePath').get(function(){
  if( this.coverImage != null && this.coverImageType != null ) {
    // return path.join('/', coverImageBasePath, this.coverImageName)
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Book', bookSchema,'books'); // Biến dk trả về, tham số lưu, Tên thư mục
// module.exports.coverImageBasePath = coverImageBasePath