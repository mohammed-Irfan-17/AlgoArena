package com.algoarena.algoarena_backend.services.codeexecution;

import org.springframework.stereotype.Component;

@Component
public class JavaTestRunnerGenerator {

    public String generateTwoSumRunner(String input) {

        String[] lines = input.trim().split("\\R");

        String[] numbers = lines[0].trim().split("\\s+");

        String target = lines[1].trim();

        StringBuilder arrayBuilder = new StringBuilder();

        for (String number : numbers) {

            if (arrayBuilder.length() > 0) {
                arrayBuilder.append(", ");
            }

            arrayBuilder.append(number);
        }

        return """
                import java.util.Arrays;

                public class Main {

                    public static void main(String[] args) {

                        Solution solution = new Solution();

                        int[] nums = new int[]{%s};

                        int target = %s;

                        int[] result =
                                solution.twoSum(nums, target);

                        System.out.println(
                                Arrays.toString(result)
                        );
                    }
                }
                """.formatted(
                arrayBuilder,
                target
        );
    }
}