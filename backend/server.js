import express from "express";
import { readdirSync, statSync } from "fs";
import { join, basename } from "path"; // Import 'basename' function from path module
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const app = express();
const port = 3001;

app.use(cors());

// Function to recursively list icons with "128" in their filenames and rename them
const listIcons = (dir, parentFolderName) => {
  const icons = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a directory, recursively list icons and pass the parent folder name
      icons.push(...listIcons(filePath, file));
    } else if (file.includes("128")) {
      // If it's an icon with "128" in the filename, add it to the list with the parent folder name
      icons.push(join(parentFolderName, file));
    }
  }

  return icons;
};

app.get("/api/icons", (req, res) => {
  const iconsDir = join(__dirname, "public", "icons");
  const icons = listIcons(iconsDir, ""); // Initialize with an empty parent folder name
  res.json(icons);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
