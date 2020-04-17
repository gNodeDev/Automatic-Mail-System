// Static messages for the response
const routes = {
    DEFAULT: '/',
    AUTH_FAILURE: '/authfailure',
    USER: {
        DEFAULT: "/user",
        CREATE: "/register",
        AUTH: "/auth",
        UPDATE:"/update_details", 
        UPDATEBYTOKEN:'/update', 
    }
}

module.exports = routes;

