import mongoose from 'mongoose';
import { UserInterface } from '../types/main';

const UserSchema = new mongoose.Schema<UserInterface>({
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
    },
    photoURL: {
        type: String,
    },
    isMobileVerified: {
        type: Boolean,
        required: true,
    },
    openToWork: {
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
    },
    posts: [
        {
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
        },
    ],
});

export default mongoose.model<UserInterface>('User', UserSchema);
