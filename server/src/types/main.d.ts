export interface Environment {
    mongodb_URI: string;
}

export interface UserInterface {
    userId: string;
    username: string;
    mobile?: string;
    email: string;
    photoURL?: string;
    isMobileVerified?: boolean;
    openToWork?: OpenToWork;
    posts?: Posts[];
}

export interface OpenToWork {
    userId: string;
    username: string;
    mobile: string;
    email: string;
    photoURL?: string;
    phoneNumberVerified: boolean;
    location: string;
    expertise: string;
}

export interface Posts {
    userId: string;
    username: string;
    mobile: string;
    email: string;
    photoURL?: string;
    title: string;
    description: string;
    mobile: number;
    phoneNumberVerified: boolean;
    location: string;
    expertiseNeeded: string;
}
