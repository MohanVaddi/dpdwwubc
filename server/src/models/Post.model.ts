import { Posts } from '../types/main';
import { Schema, model } from 'mongoose';

const PostsSchema = new Schema<Posts>({
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phoneNumberVerified: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    expertiseNeeded: {
        type: String,
        required: true,
    },
});

export default model<Posts>('Post', PostsSchema);
