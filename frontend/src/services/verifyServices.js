const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const login = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        const json = await res.json;
        if (json.error) {
            throw new Error (json.error);
        }
        if (json.token) {
            localStorage.setItem("token", json.token);
            const user = JSON.parse(atob(json.token.split(".")[1]));
            return user;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const verifyUser = () => {
    const token = localStorage.getItem("token");
    if(!token) return null;
    const user = JSON.parse(atob(token.split(".")[1]));
    return user;
}

export { 
    login,
    verifyUser
}