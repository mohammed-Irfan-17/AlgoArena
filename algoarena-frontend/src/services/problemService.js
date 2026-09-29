
import axios from "axios";
import API_URL from "../../config/api";


const CODE_EXECUTION_URL =
    `${API_URL}/api/code-execution`;

const SUBMISSION_URL =
    `${API_URL}/api/submissions`;

const QUIZ_QUESTION_URL =
    `${API_URL}/api/quiz-questions`;

export const getAllProblems = async () => {

    const response =
        await axios.get(API_URL);

    return response.data;
};

export const getProblemById = async (id) => {

    const response =
        await axios.get(
            `${API_URL}/${id}`
        );

    return response.data;
};

export const runCode = async (
    problemId,
    code
) => {

    const response =
        await axios.post(
            `${CODE_EXECUTION_URL}/run`,
            {
                problemId: Number(problemId),
                code: code
            }
        );

    return response.data;
};


/*
 * Save an already accepted submission.
 *
 * Code execution has already happened,
 * so this method only persists the submission.
 */
export const createAcceptedSubmission = async ({
    userId,
    problemId,
    code,
    language
}) => {

    const response =
        await axios.post(
            SUBMISSION_URL,
            {
                userId: Number(userId),
                problemId: Number(problemId),
                code: code,
                language: language,
                status: "ACCEPTED",
                executionTime: 120
            }
        );

    return response.data;
};


/*
 * Generate the conceptual quiz questions
 * for the accepted submission.
 */
export const generateQuizQuestions = async (
    submissionId,
    problemId
) => {

    const response =
        await axios.post(
            `${QUIZ_QUESTION_URL}/generate`,
            null,
            {
                params: {
                    submissionId:
                        Number(submissionId),

                    problemId:
                        Number(problemId)
                }
            }
        );

    return response.data;
};

