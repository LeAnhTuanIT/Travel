import mongoose, {Document, Model, Schema} from "mongoose"

export interface BlogDocument extends Document {
    title: String;
    description: String;
    content: String;
    images: String[];
    user: Object;
    tour: Object;
    status: Boolean;
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
    tour: {
        type: Object,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});


export default mongoose.model<BlogDocument, BlogModel>("blog", BlogSchema);