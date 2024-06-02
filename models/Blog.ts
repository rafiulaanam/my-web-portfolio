import mongoose from "mongoose";

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    
    title: {
      type: String,
      required: [true, "title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required!"],
      trim: true,
    },
    Tags: {
      type: String,
      required: [true, "Tags is required!"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "thumbnail is required!"],
      trim: true,
    },
    

  },
  { timestamps: true }
);

const Blog =
  mongoose.models.Blog ?? mongoose.model("Blog", BlogSchema);

export default Blog;
