
export function getLoggedInUser() {

    const savedUser =
        localStorage.getItem("algoarenaUser");

    if (!savedUser) {
        return null;
    }

    try {

        const user =
            JSON.parse(savedUser);

        /*
         * Backend login response uses userId.
         */
        if (!user || !user.userId) {

            localStorage.removeItem(
                "algoarenaUser"
            );

            return null;
        }

        return user;

    } catch (error) {

        console.error(
            "Invalid saved user:",
            error
        );

        localStorage.removeItem(
            "algoarenaUser"
        );

        return null;
    }
}


export function isUserLoggedIn() {

    const user =
        getLoggedInUser();

    return !!(
        user &&
        user.userId
    );
}
export function getLoggedInUserId() {

    const user =
        getLoggedInUser();

    return user
        ? user.userId
        : null;
}
