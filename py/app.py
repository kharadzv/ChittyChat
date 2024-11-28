from flask import Flask, render_template, request
from datetime import datetime
import os
import threading
import time
import webbrowser

app = Flask(__name__)

# Function to open the browser automatically
def open_browser():
    time.sleep(1)  # Wait for the server to start
    webbrowser.open("http://127.0.0.1:21900")

# Handle the root route
@app.route("/", methods=["GET", "POST"])
def index():
    current_time = datetime.now()
    formatted_time = current_time.strftime("%H:%M:%S")  # Format time as HH:MM:SS

    # Time-based greeting
    hour = current_time.hour
    if 5 <= hour <= 11:
        greeting = "Good Morning"
    elif 12 <= hour <= 15:
        greeting = "Good Afternoon"
    elif 16 <= hour <= 19:
        greeting = "Good Evening"
    else:
        greeting = "Good Night"

    # Handle the POST request (when the user submits their name)
    if request.method == "POST":
        name = request.form.get("name")  # Get the user's name from the form
        message = f"Time as per the app.py: {formatted_time}, {greeting} {name}. We are currently in the learning process. Please visit us later. Thank you!"
        return render_template("message.html", message=message)

    # Handle the GET request (initial page load)
    return render_template("index.html", greeting=greeting)

# Shutdown the server after the tab is closed
@app.route("/shutdown", methods=["POST"])
def shutdown():
    shutdown_function = request.environ.get("werkzeug.server.shutdown")
    if shutdown_function:
        shutdown_function()
    return "Server shutting down..."

# Run the app
if __name__ == "__main__":
    # Start the browser in a separate thread
    threading.Thread(target=open_browser).start()
    app.run(port=21900)