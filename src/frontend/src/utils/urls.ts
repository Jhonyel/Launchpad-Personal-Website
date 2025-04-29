// Urls for the backend
const BASE_URL = "http://localhost:4001";

/* USERS */
const USERS = BASE_URL + "/users/";
const LOGIN = USERS + "auth/login";

/* Images */
const IMAGES = (imagePath: string) => BASE_URL + "/" + imagePath;

// projects
export const PROJECTS = BASE_URL + "/projects";
export const CREATE_PROJECT = PROJECTS + "/new";
export const EDIT_PROJECT = (id: string) => `${PROJECTS}/${id}/update`;

export const EXPERIENCES = BASE_URL + "/experiences/";
export const CREATE_EXPERIENCE = EXPERIENCES + "new";
export const EDIT_EXPERIENCE = (id: string) => `${EXPERIENCES}/${id}/update`;

export const urls = {
  USERS,
  LOGIN,

  PROJECTS,
  CREATE_PROJECT,
  EDIT_PROJECT,

  EXPERIENCES,
  CREATE_EXPERIENCE,
  EDIT_EXPERIENCE,
  IMAGES,
};
