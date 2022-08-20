export const NEW_USER = {
  name: "",
  email: "",
  passwordCurrent: "",
  password: "",
  passwordConfirm: "",
  contact_number: "",
  otp: "",
  photo: "",
  role: "user",
};

export const CREDENTIALS = {
  email: "",
  password: "",
};

export const NEW_HOTEL = {
  name: "",
  description: "",
  basePrice: 0,
  cover_pic: "",
  location: {
    address: "",
    coordinates: [],
  },
  latitude: "",
  longitude: "",
  city: "",
  images: [],
};

export const NEW_ROOM = {
  title: "",
  price: 0,
  maxPeople: 0,
  desc: "",
  hotel: "",
  roomNumbers: [],
  rooms: "",
};
