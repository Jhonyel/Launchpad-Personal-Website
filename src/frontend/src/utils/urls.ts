// Urls for the backend
const BASE_URL = "http://localhost:4001";

/* USERS */
const USERS = BASE_URL + "/users/";
const LOGIN = USERS + "auth/login";

/* Images */
const IMAGES = (imagePath: string) => BASE_URL + "/" + imagePath;

export const urls = {

  USERS,
  LOGIN,

  IMAGES,
};
