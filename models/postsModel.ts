import { Schema, model, Document } from "mongoose";
export interface PostsSchema extends Document {
  title: string;
  content: string;
  autherId: Schema.Types.ObjectId;
  autherName: string;
  date: Date;
  // comments: object;
  likes: number;
  dislikes: number;
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  autherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  autherName: {
    type: String,
    required : true
  },
  date: {
    type: Date,
    default: new Date(),
  },
  // comments:{
  //   type:String,
  //   required : true
  // },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});
export default model<PostsSchema>("Post", postSchema);
