import mongoose, {Document, Model, Schema, } from "mongoose";

export interface PaymentDocument extends Document{
    transactionId: string;
    amount: number,
    description: string,
    status: string,
    quantity: number,
    received: number,
    images: string[],
    user: Object,
    tour: Object,
    createAt: Date,
}

export interface PaymentModel extends Model<PaymentDocument>{}

const PaymentSchema = new Schema<PaymentDocument, PaymentModel>({
    transactionId: { 
        type: String, 
        required: [true, "Please enter Transaction id"]
    },
    amount: { 
        type: Number, 
        required: [true, "Please enter amount"]
    },
    description: { 
        type: String, 
        required: [true, "Please enter description"]
    },
    status: { 
        type: String, 
        required: [true, "Please enter status"]
    },
    quantity: { 
        type: Number, 
        required: [true, "Please enter quantity"]
    },
    received: { 
        type: Number, 
        required: [true, "Please enter received"]
    },
    images: [
        {  
            type: String 
        },
    ],
    user: { 
        type: Object
    },
    tour: { 
        type: Object, 
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model<PaymentDocument, PaymentModel>("payment", PaymentSchema);