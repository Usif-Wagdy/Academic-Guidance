// Main URL
export const baseURL = `http://localhost:3000/`;

// Courses
export const coursesAPI = "courses"; //get all

// Blogs
export const blogsAPI = "blogs"; // get all

// Testimonials
export const testimonialsAPI = "testimonials"; // get all

// Users
export const usersAPI = "users"; // get all or by ID

export const updateUserApi = "users/update-user"; // patch id -- user token required

export const updatePictureApi = "users/update-image"; // patch id -- user token required

export const updatePasswordApi = "users/update-password"; // patch without id -- user token required

export const registerAPI = "users/SignUp"; // post

export const loginAPI = "users/signIn"; // post

// Internships
export const internshipsAPI = "interns";

export const tracksAPI = "tracks";
