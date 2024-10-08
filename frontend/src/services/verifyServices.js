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
        const res = await fetch(`${BACKEND_URL}/api/host/event/create`, {
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
        const res = await fetch(`${BACKEND_URL}/api/publicinfo/viewall`, {
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

const getOneEvent = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/publicinfo/${params}`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const joinEvent = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings/${params}`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const userEvents = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const cancelEvent = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings/${params}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const hostEvents = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/event/hostevents`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const deleteEvent = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/event/hostevents/${params}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const editEvent = async (params, formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/event/update/${params}`, {
            method: "PUT",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData)
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

const user_attendingsCount = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/publicinfo/getuser_attendings/${params}`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const checkUser_attendingsCount = async (params) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings/${params}/checkAttendees`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const getOrganisations = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/publicinfo/organisations`, {
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

const userEventsHistory = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings/history`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const hostEventsHistory = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/event/hostevents/history`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const userStars = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/details/reputation`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const updateStars = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/update/reputation`, {
            method: "PUT",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const eventHostUserTrack = async (eventsid) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/event/getuser_attendings/${eventsid}`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const isUserAttending = async (eventsid) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/event/userattendings/${eventsid}/check`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const userFullName = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/details/fullname`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const hostOrgName = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/host/details/orgname`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
            },
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

const forgotPassword = async (userNric) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user/login/forgetpassword`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(userNric)
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
    getEvents,
    getOneEvent,
    joinEvent,
    userEvents,
    cancelEvent,
    hostEvents,
    deleteEvent,
    editEvent,
    user_attendingsCount,
    getOrganisations,
    userEventsHistory,
    hostEventsHistory,
    userStars,
    updateStars,
    eventHostUserTrack,
    isUserAttending,
    checkUser_attendingsCount,
    userFullName,
    hostOrgName,
    forgotPassword
}