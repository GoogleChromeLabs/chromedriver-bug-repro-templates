# Gemini CLI Prompt for ChromeDriver Bug Triage

Your task is to triage a ChromeDriver bug report using this pre-configured bug reproduction template. The goal is to confirm the bug's presence by writing a test that is expected to fail.

**Bug to Triage:** `b/<BUG_ID>` (Please provide the actual bug ID in your prompt)

**Workflow:**

1.  Read the bug description for the provided bug ID to understand the reproduction steps.
2.  Modify the `test.js` file in the current directory to add a new test case that attempts to reproduce this bug.
3.  **Crucially, the test must be written to fail if the bug exists.** The assertion in the test should check for the correct behavior, which will fail if the bug is present.
4.  The new test code must be thoroughly commented, explaining the reproduction steps, what the test is doing, and why it is expected to fail in the presence of the bug. **Specifically, justify the `expected` value in the assertion using details from the bug description and, if relevant, the WebDriver specification.**
5.  After adding the test, run the test suite to confirm that the new test fails as expected, which successfully reproduces the bug.
