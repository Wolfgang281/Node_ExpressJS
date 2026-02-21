# Node.js fs Module — Synchronous Operations Complete Guide

### Create, Read, Update, Delete Files & Folders (Blocking Mode)

---

## 📚 What You'll Learn

This guide covers **all fs synchronous methods** in extreme detail:

✅ What the fs module is and why it's important  
✅ All folder operations (create, delete)  
✅ All file operations (create, read, append, rename, delete)  
✅ Error handling with try-catch blocks  
✅ Error codes (EEXIST, ENOENT, etc.)  
✅ File descriptors and openSync()  
✅ File flags (r, w, a, r+, w+, a+)  
✅ Complete project workflow example

**Best for:** Understanding fs basics, file system operations, interview preparation

---

## Table of Contents

1. [What is the fs Module?](#1-what-is-the-fs-module)
2. [Importing the fs Module](#2-importing-the-fs-module)
3. [Synchronous vs Asynchronous](#3-synchronous-vs-asynchronous)
4. [Error Handling with try-catch](#4-error-handling-with-try-catch)
5. [Error Codes Reference](#5-error-codes-reference)
6. [mkdirSync — Create Folder](#6-mkdirsync--create-folder)
7. [writeFileSync — Create/Write File](#7-writefilesync--createwrite-file)
8. [readFileSync — Read File](#8-readfilesync--read-file)
9. [appendFileSync — Append to File](#9-appendfilesync--append-to-file)
10. [renameSync — Rename/Move File](#10-renamesync--renamemove-file)
11. [unlinkSync — Delete File](#11-unlinksync--delete-file)
12. [rmdirSync — Delete Folder](#12-rmdirsync--delete-folder)
13. [openSync — Advanced File Operations](#13-opensync--advanced-file-operations)
14. [File Flags Reference](#14-file-flags-reference)
15. [Complete Project Workflow](#15-complete-project-workflow)
16. [Complete Method Reference](#16-complete-method-reference)
17. [Summary](#17-summary)
18. [Revision Checklist](#18-revision-checklist)

---

## 1. What is the fs Module?

### Simple Definition

**fs stands for File System.** It's a **built-in Node.js module** that provides utilities to perform **CRUD operations** (Create, Read, Update, Delete) on files and folders in your operating system.

Think of it as:

- **Your computer's file manager** — but controlled by code
- **Windows Explorer / Mac Finder** — but automated
- **A bridge** between your Node.js code and your computer's file system

---

### What Can fs Do?

| Operation          | Example                           |
| ------------------ | --------------------------------- |
| **Create folders** | Make a "Project" folder           |
| **Create files**   | Create "index.html" inside folder |
| **Read files**     | Read contents of "config.json"    |
| **Update files**   | Add new line to "log.txt"         |
| **Delete files**   | Remove "temp.txt"                 |
| **Delete folders** | Remove "old-project" folder       |
| **Rename**         | Change "draft.txt" to "final.txt" |
| **Move**           | Move file to different folder     |
| **Copy**           | Duplicate "template.js"           |

---

### Why fs is Important

**Without fs:**

```
❌ Can't save user data to disk
❌ Can't read configuration files
❌ Can't create logs
❌ Can't generate reports
❌ Can't upload/download files
```

**With fs:**

```
✅ Save user profiles to JSON files
✅ Read database connection settings
✅ Create server logs automatically
✅ Generate PDF reports
✅ Handle file uploads/downloads
```

---

### Built-in Module = No Installation

```bash
# ❌ You DON'T need to do this:
npm install fs  # NOT needed!

# ✅ fs comes with Node.js automatically
```

**Just import and use!**

---

## 2. Importing the fs Module

### Two Ways to Import

```javascript
// Method 1: CommonJS (most common)
const fs = require("fs");

// Method 2: CommonJS with node: prefix (recommended)
const fs = require("node:fs");

// Method 3: ES Modules (if using "type": "module")
import fs from "fs";
import fs from "node:fs"; // Recommended
```

---

### Why Use `node:` Prefix?

**Benefits of `node:` prefix:**

1. **Clarity** — Immediately obvious it's a built-in module
2. **No conflicts** — Won't accidentally import a third-party package with same name
3. **Recommended by Node.js team**

```javascript
// ✅ BEST PRACTICE
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

// ⚠️ WORKS but less clear
const fs = require("fs");
const path = require("path");
const http = require("http");
```

---

### Importing fs in Your Project

```javascript
// Complete example
const fs = require("node:fs");

// Now you can use all fs methods
fs.mkdirSync("./myFolder");
fs.writeFileSync("./myFile.txt", "Hello World");
let content = fs.readFileSync("./myFile.txt", "utf-8");
console.log(content); // "Hello World"
```

---

## 3. Synchronous vs Asynchronous

### What's the Difference?

| Aspect           | Synchronous (Sync)            | Asynchronous (Async)       |
| ---------------- | ----------------------------- | -------------------------- |
| **Blocking**     | ✅ Yes — blocks execution     | ❌ No — doesn't block      |
| **Method names** | End with `Sync`               | Don't have `Sync`          |
| **Execution**    | Runs line by line             | Runs in background         |
| **Use case**     | Simple scripts, startup tasks | Servers, production apps   |
| **Example**      | `readFileSync()`              | `readFile()` with callback |

---

### Synchronous (This Guide's Focus)

```javascript
console.log("1");

let content = fs.readFileSync("./file.txt", "utf-8"); // BLOCKS here
console.log(content);

console.log("2");

// Output: 1 → file content → 2 (in order)
```

**Characteristics:**

- Waits for operation to complete
- Blocks the entire program
- Simple, easy to understand
- Perfect for scripts, CLI tools

---

### Asynchronous (Different Guide)

```javascript
console.log("1");

fs.readFile("./file.txt", "utf-8", (err, content) => {
  // NON-BLOCKING
  console.log(content);
});

console.log("2");

// Output: 1 → 2 → file content (different order!)
```

**Characteristics:**

- Doesn't wait
- Program continues immediately
- More complex (callbacks/promises)
- Perfect for servers, production

---

### When to Use Synchronous Methods

| ✅ Good Use Cases                         | ❌ Bad Use Cases                     |
| ----------------------------------------- | ------------------------------------ |
| **Startup scripts** — reading config once | **Web servers** — handling requests  |
| **CLI tools** — simple commands           | **APIs** — multiple concurrent users |
| **Build scripts** — processing files      | **Real-time apps** — chat, streaming |
| **One-time operations** — setup tasks     | **Long-running processes** — daemons |

---

### Visual: Sync vs Async

```
Synchronous (BLOCKING):
─────────────────────────────
Time →
[Start] → [Read File] → [Process] → [Done]
           ↑ BLOCKS here (waits)

Program is FROZEN during file read


Asynchronous (NON-BLOCKING):
─────────────────────────────
Time →
[Start] → [Request Read] → [Process Other] → [File Ready] → [Done]
           ↑ Doesn't wait    ↑ Keeps running   ↑ Callback fires

Program CONTINUES while file is being read
```

---

## 4. Error Handling with try-catch

### Why Error Handling is Critical

**Without error handling:**

```javascript
// ❌ DANGEROUS — No error handling
fs.mkdirSync("./Project"); // What if folder already exists?
// CRASH! Program stops with ugly error message
```

**With error handling:**

```javascript
// ✅ SAFE — Proper error handling
try {
  fs.mkdirSync("./Project");
  console.log("Folder created");
} catch (error) {
  console.log("Error:", error.message);
  // Program continues, user gets friendly message
}
```

---

### The try-catch Pattern

```javascript
try {
  // Code that might fail
  fs.mkdirSync("./Project");

  // If successful, this runs
  console.log("Success!");
} catch (error) {
  // If error occurs, this runs instead
  console.log("Failed:", error.message);
}

// Program continues regardless
console.log("Moving on...");
```

---

### What's in the Error Object?

```javascript
try {
  fs.mkdirSync("./Project");
} catch (error) {
  console.log(error.code); // Error code (e.g., "EEXIST")
  console.log(error.message); // Human-readable message
  console.log(error.path); // Path that caused the error
  console.log(error.errno); // Error number
  console.log(error.syscall); // System call that failed
}
```

**Example error object:**

```javascript
{
    errno: -17,
    code: 'EEXIST',
    syscall: 'mkdir',
    path: './Project',
    message: "EEXIST: file already exists, mkdir './Project'"
}
```

---

### Specific Error Handling

```javascript
try {
  fs.mkdirSync("./Project");
  console.log("Folder created");
} catch (error) {
  if (error.code === "EEXIST") {
    console.log("Folder already exists");
  } else if (error.code === "EACCES") {
    console.log("Permission denied");
  } else if (error.code === "ENOENT") {
    console.log("Parent folder doesn't exist");
  } else {
    console.log("Unknown error:", error.message);
  }
}
```

---

### Best Practices for Error Handling

```javascript
// ✅ GOOD — Specific error messages
try {
  fs.writeFileSync("./Project/index.txt", "data");
  console.log("✓ File created successfully");
} catch (error) {
  console.error("✗ Error creating file:", error.message);
}

// ✅ GOOD — Continue execution after error
try {
  fs.mkdirSync("./Backup");
} catch (error) {
  if (error.code !== "EEXIST") {
    console.error("Failed to create backup folder");
  }
}

// ✅ GOOD — Log errors but don't crash
try {
  fs.unlinkSync("./temp.txt");
} catch (error) {
  // File might not exist — that's OK
  if (error.code !== "ENOENT") {
    console.warn("Warning:", error.message);
  }
}
```

---

## 5. Error Codes Reference

### Common fs Error Codes

| Code        | Meaning                    | Common Cause                   | Solution                                |
| ----------- | -------------------------- | ------------------------------ | --------------------------------------- |
| `EEXIST`    | File/folder already exists | Creating duplicate             | Check if exists first, or ignore error  |
| `ENOENT`    | No such file or directory  | Wrong path, file doesn't exist | Check path, create parent folders       |
| `EACCES`    | Permission denied          | No write permission            | Check file permissions                  |
| `EISDIR`    | Is a directory             | Trying to read folder as file  | Use correct method for folders          |
| `ENOTDIR`   | Not a directory            | Treating file as folder        | Check if path is correct                |
| `ENOTEMPTY` | Directory not empty        | Deleting non-empty folder      | Delete contents first, or use recursive |
| `EMFILE`    | Too many open files        | File descriptor limit reached  | Close files after use                   |

---

### Error Code Examples

#### EEXIST — Already Exists

```javascript
// Create folder twice
try {
  fs.mkdirSync("./Project");
  fs.mkdirSync("./Project"); // ERROR!
} catch (error) {
  console.log(error.code); // "EEXIST"
}
```

#### ENOENT — Not Found

```javascript
// Try to read non-existent file
try {
  let content = fs.readFileSync("./nonexistent.txt", "utf-8");
} catch (error) {
  console.log(error.code); // "ENOENT"
}
```

#### EACCES — Permission Denied

```javascript
// Try to write to system folder without permission
try {
  fs.writeFileSync("/etc/important-config.txt", "data");
} catch (error) {
  console.log(error.code); // "EACCES" (on Linux/Mac)
}
```

#### EISDIR — Is a Directory

```javascript
// Try to read a folder as a file
try {
  let content = fs.readFileSync("./Project", "utf-8");
} catch (error) {
  console.log(error.code); // "EISDIR"
}
```

---

## 6. mkdirSync — Create Folder

### What It Does

**Creates a new directory (folder)** at the specified path.

---

### Syntax

```javascript
fs.mkdirSync(path, options);
```

**Parameters:**

- `path` (string) — Where to create the folder
- `options` (object) — Optional configuration

---

### Basic Usage

```javascript
const fs = require("node:fs");

try {
  fs.mkdirSync("./Project");
  console.log("Folder created");
} catch (error) {
  if (error.code === "EEXIST") {
    console.log("Folder already exists");
  } else {
    console.log("Error:", error.message);
  }
}
```

---

### Creating Nested Folders

**Problem:** Can't create nested folders by default

```javascript
// ❌ This will FAIL if parent doesn't exist
try {
  fs.mkdirSync("./Level1/Level2/Level3");
} catch (error) {
  console.log(error.code); // "ENOENT" — parent doesn't exist
}
```

**Solution:** Use `recursive: true` option

```javascript
// ✅ Creates ALL parent folders automatically
try {
  fs.mkdirSync("./Level1/Level2/Level3", { recursive: true });
  console.log("Nested folders created");
} catch (error) {
  console.log("Error:", error.message);
}
```

---

### Setting Permissions

```javascript
// Unix/Linux/Mac only — set folder permissions
try {
  fs.mkdirSync("./SecureFolder", {
    mode: 0o755, // Owner: rwx, Group: rx, Others: rx
  });
} catch (error) {
  console.log("Error:", error.message);
}
```

**Common permission modes:**

- `0o755` — Owner can do everything, others can read/execute
- `0o700` — Only owner can do anything
- `0o777` — Everyone can do everything (not recommended)

---

### Real-World Examples

#### Example 1: Project Setup

```javascript
// Create project structure
try {
  fs.mkdirSync("./MyProject", { recursive: true });
  fs.mkdirSync("./MyProject/src", { recursive: true });
  fs.mkdirSync("./MyProject/public", { recursive: true });
  fs.mkdirSync("./MyProject/tests", { recursive: true });
  console.log("✓ Project structure created");
} catch (error) {
  console.error("✗ Failed to create project:", error.message);
}
```

#### Example 2: Date-Based Folders

```javascript
// Create folders for today's date
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

try {
  fs.mkdirSync(`./Logs/${year}/${month}/${day}`, { recursive: true });
  console.log(`✓ Created log folder for ${year}-${month}-${day}`);
} catch (error) {
  console.error("✗ Error creating log folder:", error.message);
}
```

---

## 7. writeFileSync — Create/Write File

### What It Does

**Creates a new file and writes data to it.** If the file already exists, it **overwrites** the contents (destructive!).

---

### Syntax

```javascript
fs.writeFileSync(path, data, options);
```

**Parameters:**

- `path` (string) — Where to create the file
- `data` (string | Buffer) — What to write
- `options` (object | string) — Encoding or options

---

### Basic Usage

```javascript
try {
  fs.writeFileSync("./Project/index.txt", "This is initial data");
  console.log("File created and data written");
} catch (error) {
  console.log("Error creating file:", error.message);
}
```

**Result:** Creates `index.txt` with content "This is initial data"

---

### Important: Overwrites Existing Content

```javascript
// Create file
fs.writeFileSync("./test.txt", "Hello");
console.log(fs.readFileSync("./test.txt", "utf-8")); // "Hello"

// Write again — OVERWRITES!
fs.writeFileSync("./test.txt", "Goodbye");
console.log(fs.readFileSync("./test.txt", "utf-8")); // "Goodbye" (Hello is gone!)
```

**⚠️ Warning:** All previous content is lost! Use `appendFileSync()` to add without destroying.

---

### Encoding Options

```javascript
// Default encoding (utf-8)
fs.writeFileSync("./file.txt", "Hello World");

// Explicit encoding
fs.writeFileSync("./file.txt", "Hello World", "utf-8");

// Binary data (Buffer)
let buffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
fs.writeFileSync("./binary.bin", buffer);
```

---

### Writing Different Data Types

```javascript
// String
fs.writeFileSync("./text.txt", "Plain text");

// JSON
let data = { name: "John", age: 30 };
fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

// Array of lines
let lines = ["Line 1", "Line 2", "Line 3"];
fs.writeFileSync("./lines.txt", lines.join(" "));

// Template literals (multi-line)
fs.writeFileSync(
  "./template.html",
  `
<!DOCTYPE html>
<html>
<head><title>Page</title></head>
<body><h1>Hello World</h1></body>
</html>
`,
);
```

---

### Real-World Examples

#### Example 1: Configuration File

```javascript
const config = {
  database: {
    host: "localhost",
    port: 27017,
    name: "myapp",
  },
  server: {
    port: 3000,
  },
};

try {
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
  console.log("✓ Configuration saved");
} catch (error) {
  console.error("✗ Failed to save config:", error.message);
}
```

#### Example 2: Log File

```javascript
const timestamp = new Date().toISOString();
const logEntry = `[${timestamp}] Application started `;

try {
  fs.writeFileSync("./app.log", logEntry);
  console.log("✓ Log file created");
} catch (error) {
  console.error("✗ Failed to create log:", error.message);
}
```

---

## 8. readFileSync — Read File

### What It Does

**Reads the entire contents of a file** into memory and returns it.

---

### Syntax

```javascript
fs.readFileSync(path, options);
```

**Parameters:**

- `path` (string) — Which file to read
- `options` (object | string) — Encoding or options

**Returns:** File contents (string if encoding specified, Buffer if not)

---

### Basic Usage

```javascript
try {
  let contents = fs.readFileSync("./Project/index.txt", "utf-8");
  console.log("File contents: ", contents);
} catch (error) {
  console.log("Error reading file:", error.message);
}
```

---

### With vs Without Encoding

```javascript
// WITH encoding — returns string
let text = fs.readFileSync("./file.txt", "utf-8");
console.log(text); // "Hello World" (readable string)

// WITHOUT encoding — returns Buffer
let buffer = fs.readFileSync("./file.txt");
console.log(buffer); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
console.log(buffer.toString()); // "Hello World" (convert to string)
```

---

### Reading Different File Types

```javascript
// Text file
let text = fs.readFileSync("./notes.txt", "utf-8");

// JSON file
let json = fs.readFileSync("./data.json", "utf-8");
let data = JSON.parse(json); // Convert to JavaScript object
console.log(data.name);

// HTML file
let html = fs.readFileSync("./index.html", "utf-8");

// Binary file (image, etc.)
let imageBuffer = fs.readFileSync("./photo.jpg"); // No encoding!
```

---

### Handling Missing Files

```javascript
try {
  let content = fs.readFileSync("./nonexistent.txt", "utf-8");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("File not found");
  } else {
    console.log("Error:", error.message);
  }
}
```

---

### Real-World Examples

#### Example 1: Reading Configuration

```javascript
try {
  let configText = fs.readFileSync("./config.json", "utf-8");
  let config = JSON.parse(configText);

  console.log("Database host:", config.database.host);
  console.log("Server port:", config.server.port);
} catch (error) {
  console.error("Failed to read config:", error.message);
  process.exit(1); // Exit if config can't be read
}
```

#### Example 2: Processing Log File

```javascript
try {
  let log = fs.readFileSync("./app.log", "utf-8");
  let lines = log.split(" ");

  console.log(`Total log entries: ${lines.length}`);

  // Find error lines
  let errors = lines.filter((line) => line.includes("ERROR"));
  console.log(`Errors found: ${errors.length}`);
} catch (error) {
  console.error("Failed to read log:", error.message);
}
```

---

## 9. appendFileSync — Append to File

### What It Does

**Adds data to the end of a file** without destroying existing content. If file doesn't exist, creates it.

---

### Syntax

```javascript
fs.appendFileSync(path, data, options);
```

**Parameters:**

- `path` (string) — Which file to append to
- `data` (string | Buffer) — What to add
- `options` (object | string) — Encoding or options

---

### Basic Usage

```javascript
try {
  fs.appendFileSync("./Project/index.txt", " This is appended data");
  console.log("Data appended successfully");
} catch (error) {
  console.log("Error appending:", error.message);
}
```

**Before:**

```
This is initial data
```

**After:**

```
This is initial data
This is appended data
```

---

### writeFileSync vs appendFileSync

```javascript
// Create file
fs.writeFileSync("./test.txt", "Line 1 ");

// writeFileSync — OVERWRITES
fs.writeFileSync("./test.txt", "Line 2 ");
console.log(fs.readFileSync("./test.txt", "utf-8"));
// Output: "Line 2 "  (Line 1 is gone!)

// appendFileSync — ADDS
fs.appendFileSync("./test.txt", "Line 3 ");
console.log(fs.readFileSync("./test.txt", "utf-8"));
// Output: "Line 2 Line 3 "  (Line 2 is preserved!)
```

---

### Creates File If Doesn't Exist

```javascript
// If file doesn't exist, appendFileSync creates it
try {
  fs.appendFileSync("./newfile.txt", "First line ");
  console.log("File created with first line");
} catch (error) {
  console.log("Error:", error.message);
}
```

---

### Real-World Examples

#### Example 1: Logging System

```javascript
function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message} `;

  try {
    fs.appendFileSync("./app.log", logEntry);
  } catch (error) {
    console.error("Failed to write log:", error.message);
  }
}

// Usage
log("Application started");
log("User logged in");
log("Database connected");

// app.log contents:
// [2025-02-21T10:30:00.000Z] Application started
// [2025-02-21T10:30:01.000Z] User logged in
// [2025-02-21T10:30:02.000Z] Database connected
```

#### Example 2: CSV File Building

```javascript
// Create CSV header
fs.writeFileSync("./users.csv", "Name,Email,Age ");

// Add rows one by one
const users = [
  { name: "Alice", email: "alice@example.com", age: 30 },
  { name: "Bob", email: "bob@example.com", age: 25 },
  { name: "Charlie", email: "charlie@example.com", age: 35 },
];

users.forEach((user) => {
  const row = `${user.name},${user.email},${user.age} `;
  fs.appendFileSync("./users.csv", row);
});

console.log("CSV file created with", users.length, "users");
```

---

## 10. renameSync — Rename/Move File

### What It Does

**Renames a file or folder**, OR **moves it to a different location**.

---

### Syntax

```javascript
fs.renameSync(oldPath, newPath);
```

**Parameters:**

- `oldPath` (string) — Current path/name
- `newPath` (string) — New path/name

---

### Basic Usage — Renaming

```javascript
try {
  fs.renameSync("./Project/index.txt", "./Project/main.txt");
  console.log("File renamed successfully");
} catch (error) {
  console.log("Error renaming:", error.message);
}
```

**Before:** `./Project/index.txt`  
**After:** `./Project/main.txt`

---

### Moving to Different Folder

```javascript
try {
  // Move file to parent directory
  fs.renameSync("./Project/main.txt", "./main.txt");
  console.log("File moved successfully");
} catch (error) {
  console.log("Error moving:", error.message);
}
```

**Before:** `./Project/main.txt`  
**After:** `./main.txt`

---

### Rename AND Move Simultaneously

```javascript
try {
  // Move AND rename in one operation
  fs.renameSync("./Project/old.txt", "./Backup/new.txt");
  console.log("File moved and renamed");
} catch (error) {
  console.log("Error:", error.message);
}
```

**Before:** `./Project/old.txt`  
**After:** `./Backup/new.txt`

---

### Renaming Folders

```javascript
try {
  // Rename a folder
  fs.renameSync("./OldFolderName", "./NewFolderName");
  console.log("Folder renamed");
} catch (error) {
  console.log("Error:", error.message);
}
```

---

### Real-World Examples

#### Example 1: Backup System

```javascript
const timestamp = new Date().toISOString().replace(/:/g, "-");

try {
  // Rename current file to backup with timestamp
  fs.renameSync("./data.json", `./data-backup-${timestamp}.json`);
  console.log("Backup created");
} catch (error) {
  console.error("Backup failed:", error.message);
}
```

#### Example 2: File Processing Pipeline

```javascript
try {
  // Move processed files to "processed" folder
  const filename = "document.pdf";
  fs.renameSync(`./incoming/${filename}`, `./processed/${filename}`);
  console.log("File processed and moved");
} catch (error) {
  console.error("Failed to move file:", error.message);
}
```

---

## 11. unlinkSync — Delete File

### What It Does

**Permanently deletes a file** from the file system. There's no undo!

---

### Syntax

```javascript
fs.unlinkSync(path);
```

**Parameters:**

- `path` (string) — Which file to delete

---

### Basic Usage

```javascript
try {
  fs.unlinkSync("./Project/main.txt");
  console.log("File deleted successfully");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("File not found");
  } else {
    console.log("Error deleting file:", error.message);
  }
}
```

---

### Handling Missing Files

```javascript
try {
  fs.unlinkSync("./nonexistent.txt");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("File doesn't exist (already deleted?)");
    // Not necessarily an error — file is gone, which is the goal
  } else {
    console.error("Deletion failed:", error.message);
  }
}
```

---

### Safe Deletion Pattern

```javascript
function deleteFileIfExists(path) {
  try {
    fs.unlinkSync(path);
    console.log(`✓ Deleted: ${path}`);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`⚠ File not found: ${path}`);
      return false;
    } else {
      console.error(`✗ Error deleting ${path}:`, error.message);
      throw error;
    }
  }
}

// Usage
deleteFileIfExists("./temp.txt");
deleteFileIfExists("./cache.json");
```

---

### Real-World Examples

#### Example 1: Cleanup Temporary Files

```javascript
const tempFiles = ["./temp-data.json", "./cache.txt", "./processing.log"];

console.log("Cleaning up temporary files...");

tempFiles.forEach((file) => {
  try {
    fs.unlinkSync(file);
    console.log(`✓ Deleted: ${file}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`✗ Failed to delete ${file}`);
    }
  }
});

console.log("Cleanup complete");
```

#### Example 2: Delete Old Logs

```javascript
const fs = require("node:fs");
const path = require("node:path");

// Delete log files older than 7 days
const logDir = "./logs";
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

try {
  const files = fs.readdirSync(logDir);

  files.forEach((file) => {
    const filePath = path.join(logDir, file);
    const stats = fs.statSync(filePath);
    const age = Date.now() - stats.mtimeMs;

    if (age > maxAge) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old log: ${file}`);
    }
  });
} catch (error) {
  console.error("Cleanup failed:", error.message);
}
```

---

## 12. rmdirSync — Delete Folder

### What It Does

**Deletes a directory (folder)**. By default, only works on **empty folders**.

---

### Syntax

```javascript
fs.rmdirSync(path, options);
```

**Parameters:**

- `path` (string) — Which folder to delete
- `options` (object) — Optional configuration

---

### Basic Usage (Empty Folder Only)

```javascript
try {
  fs.rmdirSync("./Project");
  console.log("Folder deleted successfully");
} catch (error) {
  console.log("Error deleting folder:", error.message);
}
```

**⚠️ Important:** Folder must be empty or you'll get an `ENOTEMPTY` error!

---

### Deleting Non-Empty Folders

```javascript
// ❌ This FAILS if folder has files
try {
  fs.rmdirSync("./Project");
} catch (error) {
  console.log(error.code); // "ENOTEMPTY"
}

// ✅ This works even with files inside
try {
  fs.rmdirSync("./Project", { recursive: true });
  console.log("Folder and all contents deleted");
} catch (error) {
  console.log("Error:", error.message);
}
```

---

### Options

```javascript
// Option 1: recursive (delete folder + all contents)
fs.rmdirSync("./Project", { recursive: true });

// Option 2: maxRetries (if deletion fails, retry)
fs.rmdirSync("./Project", {
  recursive: true,
  maxRetries: 3, // Try 3 times if it fails
});
```

---

### Real-World Examples

#### Example 1: Clean Project Build

```javascript
// Delete build folder before rebuilding
try {
  fs.rmdirSync("./build", { recursive: true });
  console.log("✓ Old build deleted");

  // Recreate empty build folder
  fs.mkdirSync("./build");
  console.log("✓ New build folder created");
} catch (error) {
  console.error("✗ Build cleanup failed:", error.message);
}
```

#### Example 2: Delete Empty Subfolders

```javascript
const fs = require("node:fs");
const path = require("node:path");

function deleteEmptyFolders(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      const contents = fs.readdirSync(fullPath);

      if (contents.length === 0) {
        fs.rmdirSync(fullPath);
        console.log(`Deleted empty folder: ${fullPath}`);
      }
    }
  });
}

deleteEmptyFolders("./project");
```

---

## 13. openSync — Advanced File Operations

### What It Does

**Opens a file and returns a file descriptor** (a number) that you can use for low-level operations.

---

### What is a File Descriptor?

**A file descriptor is a number** that represents an open file. Think of it like:

- A **ticket number** at a restaurant
- A **reference ID** for the file
- A **handle** you can use to read/write

```javascript
const fd = fs.openSync("./file.txt", "w");
console.log(fd); // Output: 3 (a number)

// Now you can use 'fd' to work with the file
fs.writeSync(fd, "Hello");
fs.closeSync(fd); // Always close when done!
```

---

### Syntax

```javascript
fs.openSync(path, flags, mode);
```

**Parameters:**

- `path` (string) — Which file to open
- `flags` (string) — How to open (read, write, append, etc.)
- `mode` (number) — File permissions (optional, Unix/Linux/Mac only)

**Returns:** File descriptor (number)

---

### Basic Usage

```javascript
try {
  const fd = fs.openSync("./sample.txt", "w"); // Open for writing
  fs.writeSync(fd, "Writing using file descriptor");
  fs.closeSync(fd); // IMPORTANT: Always close!
  console.log("File created using openSync()");
} catch (error) {
  console.log("Error using openSync:", error.message);
}
```

---

### Why Use openSync?

**When you need:**

1. **Fine-grained control** — Read/write at specific positions
2. **Multiple operations** — Open once, do many reads/writes
3. **Performance** — Opening file once is faster than multiple times
4. **Advanced features** — Append mode, exclusive write, etc.

**Most of the time:** Use `readFileSync`/`writeFileSync` instead (simpler!)

---

### File Operations with Descriptors

```javascript
const fd = fs.openSync("./data.txt", "w+"); // Open for read/write

// Write data
fs.writeSync(fd, "Hello World", 0, "utf-8");

// Read data (need to seek back to start)
const buffer = Buffer.alloc(20);
fs.readSync(fd, buffer, 0, 20, 0);
console.log(buffer.toString()); // "Hello World"

// Close
fs.closeSync(fd);
```

---

### Writing at Specific Position

```javascript
const fd = fs.openSync("./file.txt", "r+"); // Open existing file

// Write "WORLD" starting at position 6
fs.writeSync(fd, "WORLD", 6);

fs.closeSync(fd);

// If file was "Hello     " before
// Now it's "Hello WORLD"
```

---

### Real-World Example: Log Rotation

```javascript
function rotateLog() {
  const maxSize = 1024 * 1024; // 1 MB

  try {
    const stats = fs.statSync("./app.log");

    if (stats.size > maxSize) {
      // Log is too big — start new one
      fs.renameSync("./app.log", `./app-${Date.now()}.log`);

      // Create new empty log
      const fd = fs.openSync("./app.log", "w");
      fs.closeSync(fd);

      console.log("Log rotated");
    }
  } catch (error) {
    console.error("Log rotation failed:", error.message);
  }
}
```

---

## 14. File Flags Reference

### Common Flags for openSync()

| Flag   | Mode             | Behavior                                                                  | Use Case                         |
| ------ | ---------------- | ------------------------------------------------------------------------- | -------------------------------- |
| `'r'`  | Read             | Opens for reading. Error if doesn't exist.                                | Reading existing files           |
| `'r+'` | Read/Write       | Opens for reading and writing. Error if doesn't exist.                    | Modifying existing files         |
| `'w'`  | Write            | Opens for writing. **Creates** if doesn't exist. **Truncates** if exists. | Creating new files               |
| `'w+'` | Read/Write       | Opens for reading and writing. Creates/truncates.                         | Creating and immediately reading |
| `'a'`  | Append           | Opens for appending. Creates if doesn't exist.                            | Adding to logs                   |
| `'a+'` | Read/Append      | Opens for reading and appending. Creates if doesn't exist.                | Reading logs and adding          |
| `'wx'` | Exclusive Write  | Like `'w'` but **fails** if file exists.                                  | Ensuring new file                |
| `'ax'` | Exclusive Append | Like `'a'` but fails if file exists.                                      | First-time log creation          |

---

### Flag Examples

```javascript
// 'r' — Read only (file must exist)
const fd1 = fs.openSync("./existing.txt", "r");

// 'w' — Write (creates or overwrites)
const fd2 = fs.openSync("./new.txt", "w");

// 'a' — Append (creates or adds to end)
const fd3 = fs.openSync("./log.txt", "a");

// 'r+' — Read and write (file must exist)
const fd4 = fs.openSync("./existing.txt", "r+");

// 'wx' — Exclusive write (fails if exists)
try {
  const fd5 = fs.openSync("./unique.txt", "wx");
  // Only succeeds if file didn't exist
} catch (error) {
  console.log("File already exists!");
}
```

---

## 15. Complete Project Workflow

### The Full Lifecycle Example

```javascript
const fs = require("node:fs");

console.log("=== File System Operations Demo === ");

// STEP 1: Create folder
console.log("1. Creating folder...");
try {
  fs.mkdirSync("./Project");
  console.log("   ✓ Folder created: ./Project");
} catch (error) {
  if (error.code === "EEXIST") {
    console.log("   ⚠ Folder already exists");
  } else {
    console.error("   ✗ Error:", error.message);
  }
}

// STEP 2: Create file with initial data
console.log(" 2. Creating file...");
try {
  fs.writeFileSync("./Project/index.txt", "This is initial data");
  console.log("   ✓ File created: ./Project/index.txt");
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

// STEP 3: Read the file
console.log(" 3. Reading file...");
try {
  let contents = fs.readFileSync("./Project/index.txt", "utf-8");
  console.log("   ✓ Contents:", contents);
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

// STEP 4: Append more data
console.log(" 4. Appending data...");
try {
  fs.appendFileSync("./Project/index.txt", " This is appended data");
  console.log("   ✓ Data appended");
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

// STEP 5: Read updated contents
console.log(" 5. Reading updated file...");
try {
  let updatedContents = fs.readFileSync("./Project/index.txt", "utf-8");
  console.log(
    "   ✓ Updated contents: " +
      updatedContents
        .split(" ")
        .map((line) => `      ${line}`)
        .join(" "),
  );
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

// STEP 6: Rename the file
console.log(" 6. Renaming file...");
try {
  fs.renameSync("./Project/index.txt", "./Project/main.txt");
  console.log("   ✓ File renamed: index.txt → main.txt");
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

// STEP 7: Delete the file
console.log(" 7. Deleting file...");
try {
  fs.unlinkSync("./Project/main.txt");
  console.log("   ✓ File deleted");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("   ⚠ File not found");
  } else {
    console.error("   ✗ Error:", error.message);
  }
}

// STEP 8: Delete the folder
console.log(" 8. Deleting folder...");
try {
  fs.rmdirSync("./Project");
  console.log("   ✓ Folder deleted");
} catch (error) {
  console.error("   ✗ Error:", error.message);
}

console.log(" === Demo Complete ===");
```

**Output:**

```
=== File System Operations Demo ===

1. Creating folder...
   ✓ Folder created: ./Project

2. Creating file...
   ✓ File created: ./Project/index.txt

3. Reading file...
   ✓ Contents: This is initial data

4. Appending data...
   ✓ Data appended

5. Reading updated file...
   ✓ Updated contents:
      This is initial data
      This is appended data

6. Renaming file...
   ✓ File renamed: index.txt → main.txt

7. Deleting file...
   ✓ File deleted

8. Deleting folder...
   ✓ Folder deleted

=== Demo Complete ===
```

---

## 16. Complete Method Reference

### Quick Reference Table

| Method                       | Purpose              | Overwrites? | Creates? | Example                                   |
| ---------------------------- | -------------------- | ----------- | -------- | ----------------------------------------- |
| `mkdirSync(path)`            | Create folder        | N/A         | ✅       | `fs.mkdirSync('./folder')`                |
| `writeFileSync(path, data)`  | Write file           | ✅ Yes      | ✅       | `fs.writeFileSync('./file.txt', 'data')`  |
| `readFileSync(path, enc)`    | Read file            | N/A         | ❌       | `fs.readFileSync('./file.txt', 'utf-8')`  |
| `appendFileSync(path, data)` | Append to file       | ❌ No       | ✅       | `fs.appendFileSync('./file.txt', 'more')` |
| `renameSync(old, new)`       | Rename/move          | N/A         | ❌       | `fs.renameSync('./old.txt', './new.txt')` |
| `unlinkSync(path)`           | Delete file          | N/A         | ❌       | `fs.unlinkSync('./file.txt')`             |
| `rmdirSync(path)`            | Delete folder        | N/A         | ❌       | `fs.rmdirSync('./folder')`                |
| `openSync(path, flags)`      | Open file (advanced) | Depends     | Depends  | `fs.openSync('./file.txt', 'w')`          |

---

## 17. Summary — Key Takeaways

### 🎯 Core Concepts

| Concept              | Key Point                                          |
| -------------------- | -------------------------------------------------- |
| **fs module**        | Built-in Node.js module for file system operations |
| **Synchronous**      | Blocks execution — use for scripts, not servers    |
| **Error handling**   | ALWAYS use try-catch blocks                        |
| **File descriptors** | Numbers representing open files (openSync)         |

---

### 📁 Folder Operations

```
Create: mkdirSync('./folder')
Delete: rmdirSync('./folder')
Nested: mkdirSync('./a/b/c', { recursive: true })
```

---

### 📄 File Operations

```
Create: writeFileSync('./file.txt', 'data')
Read:   readFileSync('./file.txt', 'utf-8')
Append: appendFileSync('./file.txt', 'more')
Rename: renameSync('./old.txt', './new.txt')
Delete: unlinkSync('./file.txt')
```

---

### ⚠️ Critical Warnings

```
❌ writeFileSync OVERWRITES existing content
❌ No error handling = program crashes
❌ Sync methods BLOCK execution (bad for servers)
❌ File descriptor leaks if you don't closeSync()
```

---

## 18. Revision Checklist

### Basics

- [ ] Can you explain what the fs module does?
- [ ] Can you import fs using both CommonJS and ES Modules?
- [ ] Do you know why `node:` prefix is recommended?
- [ ] Can you explain synchronous vs asynchronous?
- [ ] Do you know when to use sync methods?

### Error Handling

- [ ] Can you write a try-catch block?
- [ ] Do you know what properties are in error objects?
- [ ] Can you handle EEXIST errors?
- [ ] Can you handle ENOENT errors?
- [ ] Do you know all common error codes?

### Folders

- [ ] Can you create a folder with mkdirSync?
- [ ] Can you create nested folders?
- [ ] Can you delete a folder with rmdirSync?
- [ ] Can you delete non-empty folders?

### Files

- [ ] Can you create a file with writeFileSync?
- [ ] Do you know writeFileSync overwrites?
- [ ] Can you read a file with readFileSync?
- [ ] Can you append with appendFileSync?
- [ ] Can you rename with renameSync?
- [ ] Can you delete with unlinkSync?

### Advanced

- [ ] Can you use openSync to get a file descriptor?
- [ ] Do you know what file descriptors are?
- [ ] Can you list 5 file flags?
- [ ] Do you know when to use openSync vs writeFileSync?
- [ ] Do you always close file descriptors?

---

> **🎤 Interview Tip — "What's the difference between writeFileSync and appendFileSync?"**
>
> **Answer like this:**
>
> _"Both writeFileSync and appendFileSync are used to write data to files, but they handle existing content differently. writeFileSync is destructive — if the file already exists, it completely overwrites the content with new data. All previous content is lost. It's like using Ctrl+A and Delete before pasting new text._
>
> _appendFileSync is non-destructive — it adds new data to the end of the file, preserving all existing content. It's like pressing Ctrl+End and then typing more text._
>
> _There's one more difference: if the file doesn't exist, both methods will create it. So appendFileSync can be used for initialization as well._
>
> _In practice, I use writeFileSync when I want to create a fresh file or completely replace content, like writing a new config file. I use appendFileSync for logging systems or any scenario where I need to accumulate data over time, like adding entries to a log file throughout the day."_
>
> **Why this works:** Shows clear understanding of the key difference (destructive vs non-destructive), provides real-world use cases, and demonstrates practical knowledge.
