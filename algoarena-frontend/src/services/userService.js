const API_BASE_URL =
    "http://localhost:8080/api/users";


export async function loginUser(
    email,
    password
) {

    const response = await fetch(
        `${API_BASE_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );


    if (!response.ok) {

        let message =
            "Invalid email or password.";

        try {

            const data =
                await response.json();

            if (data.message) {
                message = data.message;
            }

        } catch {
            // Keep default message
        }

        throw new Error(message);
    }


    return response.json();
}


export async function registerUser(
    name,
    email,
    password
) {

    const response = await fetch(
        `${API_BASE_URL}/register`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );


    if (!response.ok) {

        throw new Error(
            "Unable to create your account."
        );
    }


    return response.json();
}


export function getLoggedInUser() {

    const user =
        localStorage.getItem(
            "algoarenaUser"
        );

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch {

        return null;
    }
}


export function getUserId() {

    return localStorage.getItem(
        "userId"
    );
}


export function logoutUser() {

    localStorage.removeItem(
        "algoarenaUser"
    );

    localStorage.removeItem(
        "userId"
    );
}