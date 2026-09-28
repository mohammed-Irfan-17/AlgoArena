
        package com.algoarena.algoarena_backend.services;

import com.algoarena.algoarena_backend.entity.Submission;
import org.springframework.stereotype.Service;

@Service
public class SimpleJudgeService {

    public String judge(Submission submission) {

        /*
         * TEMPORARY JUDGE
         *
         * We are NOT executing student code here.
         * A real secure code execution service will be connected later.
         *
         * For now:
         * - code containing "return new int[]{0,1}"
         *   is treated as ACCEPTED
         * - everything else is treated as WRONG
         */

        if (submission.getCode() != null
                && submission.getCode().contains("return new int[]{0,1}")) {

            return "ACCEPTED";
        }

        return "WRONG";
    }
}

