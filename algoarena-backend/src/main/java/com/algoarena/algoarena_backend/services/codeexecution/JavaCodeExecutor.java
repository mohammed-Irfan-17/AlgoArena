package com.algoarena.algoarena_backend.services.codeexecution;

import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

@Component
public class JavaCodeExecutor {

    public ExecutionResponse execute(
            Long problemId,
            String userCode,
            String input,
            String expectedOutput
    ) {

        Path tempDirectory = null;

        try {

            tempDirectory =
                    Files.createTempDirectory("algoarena-java-");

            /*
             * User submits:
             *
             * public class Solution {
             *     ...
             * }
             *
             * We create:
             *
             * Solution.java
             * Main.java
             */

            Path solutionFile =
                    tempDirectory.resolve("Solution.java");

            Files.writeString(
                    solutionFile,
                    userCode
            );

            String mainCode =
                    generateMain(problemId, input);

            Path mainFile =
                    tempDirectory.resolve("Main.java");

            Files.writeString(
                    mainFile,
                    mainCode
            );

            /*
             * Compile both files
             */

            Process compileProcess =
                    new ProcessBuilder(
                            "javac",
                            "Solution.java",
                            "Main.java"
                    )
                            .directory(tempDirectory.toFile())
                            .redirectErrorStream(true)
                            .start();

            String compileOutput =
                    readOutput(
                            compileProcess.getInputStream()
                    );

            boolean compiled =
                    compileProcess.waitFor(
                            5,
                            TimeUnit.SECONDS
                    );

            if (!compiled) {

                compileProcess.destroyForcibly();

                return new ExecutionResponse(
                        "TIME_LIMIT",
                        1,
                        0,
                        "Compilation timed out."
                );
            }

            if (compileProcess.exitValue() != 0) {

                return new ExecutionResponse(
                        "COMPILE_ERROR",
                        1,
                        0,
                        compileOutput
                );
            }

            /*
             * Run Main
             */

            Process runProcess =
                    new ProcessBuilder(
                            "java",
                            "-cp",
                            tempDirectory.toString(),
                            "Main"
                    )
                            .directory(tempDirectory.toFile())
                            .redirectErrorStream(true)
                            .start();

            boolean finished =
                    runProcess.waitFor(
                            3,
                            TimeUnit.SECONDS
                    );

            if (!finished) {

                runProcess.destroyForcibly();

                return new ExecutionResponse(
                        "TIME_LIMIT",
                        1,
                        0,
                        "Program exceeded the time limit."
                );
            }

            String actualOutput =
                    readOutput(
                            runProcess.getInputStream()
                    );

            if (normalize(actualOutput)
                    .equals(normalize(expectedOutput))) {

                return new ExecutionResponse(
                        "ACCEPTED",
                        1,
                        1,
                        "Test case passed."
                );
            }

            return new ExecutionResponse(
                    "WRONG_ANSWER",
                    1,
                    0,
                    "Expected: "
                            + expectedOutput
                            + " | Received: "
                            + actualOutput
            );

        } catch (Exception e) {

            return new ExecutionResponse(
                    "ERROR",
                    1,
                    0,
                    e.getMessage()
            );

        } finally {

            if (tempDirectory != null) {
                deleteDirectory(tempDirectory);
            }
        }
    }

    private String generateMain(
            Long problemId,
            String input
    ) {

        switch (problemId.intValue()) {

            case 1:
                return generateTwoSumMain(input);

            case 2:
                return generateFirstUniqueCharacterMain(input);

            case 3:
                return generateBinarySearchMain(input);

            case 4:
                return generateRotatedArrayMain(input);

            case 5:
                return generateMaximumSubarrayMain(input);

            case 6:
                return generateMoveZeroesMain(input);

            case 7:
                return generateLongestSubstringMain(input);

            case 8:
                return generateValidParenthesesMain(input);

            case 9:
                return generateMergeIntervalsMain(input);

            case 10:
                return generateReverseLinkedListMain(input);

            default:
                throw new IllegalArgumentException(
                        "Unsupported problem ID: " + problemId
                );
        }
    }

    /*
     * Problem 1
     * Two Sum
     */

    private String generateTwoSumMain(String input) {

        String[] lines = input.split("\\n");

        String nums = lines[0].trim();
        String target = lines[1].trim();

        return """
            public class Main {

                public static void main(String[] args) {

                    int[] nums = {%s};

                    int target = %s;

                    Solution solution =
                            new Solution();

                    int[] result =
                            solution.twoSum(
                                    nums,
                                    target
                            );

                    for (int i = 0; i < result.length; i++) {

                        if (i > 0) {
                            System.out.print(" ");
                        }

                        System.out.print(result[i]);
                    }
                }
            }
            """.formatted(
                convertArray(nums),
                target
        );
    }

    /*
     * Problem 2
     */

    private String generateFirstUniqueCharacterMain(
            String input
    ) {

        return """
                public class Main {

                    public static void main(String[] args) {

                        String input = "%s";

                        Solution solution =
                                new Solution();

                        int result =
                                solution.firstUniqChar(input);

                        System.out.print(result);
                    }
                }
                """.formatted(
                escapeJava(input.trim())
        );
    }

    /*
     * Problem 3
     */

    private String generateBinarySearchMain(
            String input
    ) {

        String[] lines = input.split("\\n");

        return """
                public class Main {

                    public static void main(String[] args) {

                        int[] nums = {
                %s
                        };

                        int target = %s;

                        Solution solution =
                                new Solution();

                        int result =
                                solution.binarySearch(
                                        nums,
                                        target
                                );

                        System.out.print(result);
                    }
                }
                """.formatted(
                convertArray(lines[0]),
                lines[1].trim()
        );
    }

    /*
     * Problem 4
     */

    private String generateRotatedArrayMain(
            String input
    ) {

        String[] lines = input.split("\\n");

        return """
                public class Main {

                    public static void main(String[] args) {

                        int[] nums = {
                %s
                        };

                        int target = %s;

                        Solution solution =
                                new Solution();

                        int result =
                                solution.search(
                                        nums,
                                        target
                                );

                        System.out.print(result);
                    }
                }
                """.formatted(
                convertArray(lines[0]),
                lines[1].trim()
        );
    }

    /*
     * Problem 5
     */

    private String generateMaximumSubarrayMain(
            String input
    ) {

        return """
                public class Main {

                    public static void main(String[] args) {

                        int[] nums = {
                %s
                        };

                        Solution solution =
                                new Solution();

                        int result =
                                solution.maxSubArray(nums);

                        System.out.print(result);
                    }
                }
                """.formatted(
                convertArray(input)
        );
    }

    /*
     * Problem 6
     */

    private String generateMoveZeroesMain(
            String input
    ) {

        return """
                public class Main {

                    public static void main(String[] args) {

                        int[] nums = {
                %s
                        };

                        Solution solution =
                                new Solution();

                        solution.moveZeroes(nums);

                        for (int i = 0;
                             i < nums.length;
                             i++) {

                            if (i > 0) {
                                System.out.print(" ");
                            }

                            System.out.print(nums[i]);
                        }
                    }
                }
                """.formatted(
                convertArray(input)
        );
    }

    /*
     * Problem 7
     */

    private String generateLongestSubstringMain(
            String input
    ) {

        return """
                public class Main {

                    public static void main(String[] args) {

                        String input = "%s";

                        Solution solution =
                                new Solution();

                        int result =
                                solution.lengthOfLongestSubstring(
                                        input
                                );

                        System.out.print(result);
                    }
                }
                """.formatted(
                escapeJava(input.trim())
        );
    }

    /*
     * Problem 8
     */

    private String generateValidParenthesesMain(
            String input
    ) {

        return """
                public class Main {

                    public static void main(String[] args) {

                        String input = "%s";

                        Solution solution =
                                new Solution();

                        boolean result =
                                solution.isValid(input);

                        System.out.print(result);
                    }
                }
                """.formatted(
                escapeJava(input.trim())
        );
    }

    /*
     * Problem 9
     */

    private String generateMergeIntervalsMain(
            String input
    ) {

        String[] lines = input.split("\\n");

        int count =
                Integer.parseInt(
                        lines[0].trim()
                );

        StringBuilder intervals =
                new StringBuilder();

        for (int i = 0; i < count; i++) {

            String[] values =
                    lines[i + 1]
                            .trim()
                            .split("\\s+");

            intervals.append(
                    "{"
                            + values[0]
                            + ","
                            + values[1]
                            + "}"
            );

            if (i < count - 1) {
                intervals.append(",");
            }
        }

        return """
                public class Main {

                    public static void main(String[] args) {

                        int[][] intervals = {
                            %s
                        };

                        Solution solution =
                                new Solution();

                        int[][] result =
                                solution.merge(intervals);

                        for (int i = 0;
                             i < result.length;
                             i++) {

                            if (i > 0) {
                                System.out.print("\\n");
                            }

                            System.out.print(
                                    result[i][0]
                                    + " "
                                    + result[i][1]
                            );
                        }
                    }
                }
                """.formatted(
                intervals
        );
    }

    /*
     * Problem 10
     *
     * We will use the common:
     *
     * ListNode reverseList(ListNode head)
     */

    private String generateReverseLinkedListMain(
            String input
    ) {


        String values = input.trim();

        return """
        public class Main {

            public static void main(String[] args) {

                String input = "%s";

                if (input.isEmpty()) {
                    return;
                }

                String[] values =
                        input.split("\\\\s+");

                ListNode head = null;
                ListNode tail = null;

                for (String value : values) {

                    ListNode node =
                            new ListNode(
                                    Integer.parseInt(value)
                            );

                    if (head == null) {

                        head = node;
                        tail = node;

                    } else {

                        tail.next = node;
                        tail = node;
                    }
                }

                Solution solution =
                        new Solution();

                ListNode result =
                        solution.reverseList(head);

                boolean first = true;

                while (result != null) {

                    if (!first) {
                        System.out.print(" ");
                    }

                    System.out.print(result.val);

                    first = false;

                    result = result.next;
                }
            }
        }
        """.formatted(
                escapeJava(values)
        );


    }


    private String convertArray(String values) {

        String[] parts =
                values.trim().split("\\s+");

        StringBuilder result =
                new StringBuilder();

        for (int i = 0; i < parts.length; i++) {

            if (i > 0) {
                result.append(",");
            }

            result.append(parts[i]);
        }

        return result.toString();
    }

    private String escapeJava(String value) {

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }

    private String readOutput(
            InputStream inputStream
    ) throws IOException {

        return new String(
                inputStream.readAllBytes()
        );
    }

    private String normalize(String value) {

        if (value == null) {
            return "";
        }

        return value
                .trim()
                .replaceAll("\\s+", " ");
    }

    private void deleteDirectory(
            Path directory
    ) {

        try {

            Files.walk(directory)
                    .sorted(
                            (a, b) ->
                                    b.compareTo(a)
                    )
                    .forEach(path -> {

                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException ignored) {
                        }

                    });

        } catch (IOException ignored) {
        }
    }
}