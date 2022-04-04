interface addressInterface {
    door_no: string;
    street: string;
    village: string;
    city: string;
    district: string;
    state: string;
    pincode: number;
}

export interface Worker {
    uuid: number;
    fullname: string;
    profileImage: string;
    age: number;
    sex: 'male' | 'female' | 'prefer not to say';
    expertise: 'Barber' | 'Carpenter' | 'Painter' | 'Mason' | 'Physical Labour';
    mobile: number;
    fromTime: string;
    toTime: string;
    address: addressInterface;
    location: string;
}
