import mongoose from 'mongoose';

const postSchema = new mongoose.Schema( {
  title: String,
  message: String,
  name: String,
  creator: String,
  selectedFile: String,
  tags: [ String ],
  likes: { type: [ String ], default: [] },
  comments: { type: [ String ], default: [] }
}, { timestamps: true } )

export default mongoose.model( 'Post', postSchema );
