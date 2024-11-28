// Import necessary modules
import express from "express"; // Express for creating the server
import path from "path"; // Path for file handling
import { fileURLToPath } from "url"; // Required to define __dirname in ES Modules
import open from "open"; // Open to launch the browser
import fs from "fs"; // File system for writing prompts

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the current directory path

const app = express(); // Create an Express application
const PORT = 21900; // Define the custom port number

// Serve static files from the "js" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle the root URL
app.get("/", (req, res) => {
  const now = new Date(); // Get the current date and time
  const hours = now.getHours(); // Get the current hour
  const promptsDirectory = path.join(__dirname, "prompts"); // Path to the "prompts" directory

  let greeting; // Initialize greeting based on time
  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    greeting = "Good Afternoon";
  } else if (hours >= 16 && hours < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  const promptMessage = `${greeting}! We are currently in the learning process. Please visit us later. Thank you!`;

  // Save the prompt to a file in the "prompts" directory
  if (!fs.existsSync(promptsDirectory)) {
    fs.mkdirSync(promptsDirectory); // Create the "prompts" directory if it doesn't exist
  }

  const promptFileName = path.join(
    promptsDirectory,
    `${now.toLocaleDateString("en-GB").replace(/\//g, "")}-${now
      .toLocaleTimeString("en-GB", { hour12: false })
      .replace(/:/g, "")}.txt`
  );

  fs.writeFileSync(promptFileName, promptMessage); // Save the prompt to a file

  // Serve the HTML page to the user
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`); // Automatically open the app in the browser
});