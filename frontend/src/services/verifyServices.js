const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const loginUser = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        const json = await res.json();
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

const loginHost = async (host) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(host),
        });
        const json = await res.json();
        if (json.error) {
            throw new Error (json.error);
        }
        if (json.token) {
            localStorage.setItem("token", json.token);
            const host = JSON.parse(atob(json.token.split(".")[1]));
            return host;
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

const signUpUser = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.error) {
            throw new Error (json.error);
        }
        return json;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const signUpHost = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.error) {
            throw new Error (json.error);
        }
        return json;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const createEvent = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/event/create`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.error) {
            throw new Error (json.error);
        }
        return json;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getEvents = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/event/viewall`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },

        });
        const json = await res.json();
        if (json.error) {
            throw new Error (json.error);
        }
        return json;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { 
    loginUser,
    loginHost,
    verifyUser,
    signUpUser,
    signUpHost,
    createEvent,
    getEvents
}