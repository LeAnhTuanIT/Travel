import mongoose, {Document, Model, Schema} from "mongoose"

export interface BlogDocument extends Document {
    title: String;
    description: String;
    content: String;
    images: String[];
    reviews: mongoose.Types.ObjectId[],
    user: Object;
    status: String;
    createAt: Date;
}

export interface BlogModel extends Model<BlogDocument> {}

const BlogSchema = new Schema<BlogDocument, BlogModel>({
    title: {
        type: String,
        required: [true, "Please enter title"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    content: {
        type: String,
        required: [true, "Please enter content"],
    },
    images: [
        {
            type: String,
        },
    ],
    user: {
        type: Object,
    },
    status: {
        type: String,
        required: [true, "Please enter status"],
    },
    reviews: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Review",
          required: true
       },
      ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});


export default mongoose.model<BlogDocument, BlogModel>("blog", BlogSchema);