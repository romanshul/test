
const LocalStorageService = (function() {
    function setToken(access_token: string) {
        localStorage.setItem("access_token", access_token);
    }

    function getToken() {
        return localStorage.getItem("access_token");
    }

    function clearToken() {
        localStorage.removeItem("access_token")
    }

    return {
        setToken : setToken,
        getToken : getToken,
        clearToken : clearToken
    }
})()

export default LocalStorageService

