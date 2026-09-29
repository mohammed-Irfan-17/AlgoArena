import axios from "axios";

import API_URL from "../../config/api";

export const runCode = async (problemId, code) => {
    const response = await axios.post(
        `${API_URL}/run`,
        {
            problemId: Number(problemId),
            code: code
        }
    );

    return response.data;
};