# Password Generator Manager

## Overview
The Password Generator Manager is a web-based application that enables users to generate secure, customizable passwords. It provides options to include uppercase letters, numbers, and symbols in the passwords. The application also supports storing, loading, and exporting password data securely using local storage and file operations.

## Features
- **Customizable Password Length:** Choose between 8 and 128 characters for your password.
- **Character Options:** Toggle the inclusion of uppercase letters, numbers, and special characters.
- **Password Storage:** Save generated passwords along with associated usernames or emails.
- **Data Export and Import:** Export saved passwords to a JSON file and import them back into the application.
- **Encryption:** Secure your exported passwords with AES encryption before downloading.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Local Storage for data persistence
- CryptoJS for AES encryption (ensure to include the CryptoJS script in your HTML or via a CDN)

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Ali34f/COMP1004-Assignments

## Usage Instructions
-Adjust the desired password criteria using the interactive form.
-Click Generate to create a password.
-Use the Save Password button to save the password along with an optional username/email.
-Manage your saved passwords through the Load Data and Export Data buttons.
-To ensure data privacy, use the Export Encrypted Data function.

## Contributing
1) Fork the repo.
2) Create a new branch (git checkout -b your-feature).
3) Make your changes.
4) Commit your changes (git commit -am 'Add some feature').
5) Push to the branch (git push origin your-feature).
6) Open a new Pull Request.


### Additional Notes:
- Ensure all dependencies, such as CryptoJS, are correctly referenced in your project files or included via CDN if you use functions that require external libraries.
- Update repository URLs and any specific project details in the README as necessary. 
