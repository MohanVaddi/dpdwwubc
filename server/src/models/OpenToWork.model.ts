import { Schema, model } from 'mongoose';
import { OpenToWork } from '../types/main';

const OpenToWorkSchema = new Schema<OpenToWork>({
    userId: {
        unique: true,
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
    },
    phoneNumberVerified: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,

        required: true,
    },
});

export default model<OpenToWork>('OpenToWork', OpenToWorkSchema);
