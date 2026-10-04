
import axios from "axios";

import API_URL from "../config/api";
import { getLoggedInUserId } from "./authUtils";


export const runCode = async (
    problemId,
    code
) => {

    const userId =
        getLoggedInUserId();


    console.log(
        "Logged in user ID:",
        userId
    );


    if (!userId) {

        throw new Error(
            "User is not logged in."
        );
    }


    const requestData = {

        problemId: Number(problemId),

        code: code,

        userId: Number(userId)

    };


    console.log(
        "Sending code execution request:",
        requestData
    );


    const response =
        await axios.post(
            `${API_URL}/api/code-execution/run`,
            requestData
        );


    console.log(
        "Code execution response:",
        response.data
    );


    return response.data;
};

