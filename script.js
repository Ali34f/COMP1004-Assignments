// Function to generate a password based on user criteria
function generatePassword() {
	const length = parseInt(document.getElementById('length').value);
	const includeUppercase = document.getElementById('uppercase').checked;
	const includeNumbers = document.getElementById('numbers').checked;
	const includeSymbols = document.getElementById('symbols').checked;
	const charset = 'abcdefghijklmnopqrstuvwxyz' +
		(includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
		(includeNumbers ? '0123456789' : '') +
		(includeSymbols ? '!@#$%^&*()_+-=[]{}|;\'":\\,.<>/?' : '');
	let password = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	document.getElementById('generatedPassword').value = password;
}

// Function to save a generated password to localStorage
function savePassword() {
	const password = document.getElementById('generatedPassword').value;
	if (!password) {
		alert("No password generated!");
		return;
	}
	let passwords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	passwords.push(password);
	localStorage.setItem('savedPasswords', JSON.stringify(passwords));
	displaySavedPasswords(); // Update the list of displayed passwords
}

// Function to display saved passwords along with username/email
function displaySavedPasswords() {
	const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	const listElement = document.getElementById('savedPasswordList');
	listElement.innerHTML = ''; // Clear current list
	savedPasswords.forEach(entry => {
		const item = document.createElement('li');
		// Check if username/email and password are defined before displaying
		const usernameEmail = entry.username ? `Username/Email: ${entry.username}, ` : '';
		const password = entry.password ? `Password: ${entry.password}` : '';
		item.textContent = `${usernameEmail}${password}`;
		listElement.appendChild(item);
	});
}


// Function to initialize the page
function initializePage() {
	if (typeof(Storage) === "undefined") {
		alert("Sorry, your browser does not support Web Storage. Some features may not work properly.");
		return;
	}
	displaySavedPasswords();
	document.getElementById('length').value = passwordConfig.length;
	document.getElementById('lengthValue').textContent = passwordConfig.length.toString();
	document.getElementById('uppercase').checked = passwordConfig.includeUppercase;
	document.getElementById('numbers').checked = passwordConfig.includeNumbers;
	document.getElementById('symbols').checked = passwordConfig.includeSymbols;
}

// Event listeners for changes in password criteria
document.getElementById('length').addEventListener('input', function() {
	document.getElementById('lengthValue').textContent = this.value;
});

document.getElementById('uppercase').addEventListener('change', function() {
	passwordConfig.includeUppercase = this.checked;
});

document.getElementById('numbers').addEventListener('change', function() {
	passwordConfig.includeNumbers = this.checked;
});

document.getElementById('symbols').addEventListener('change', function() {
	passwordConfig.includeSymbols = this.checked;
});

// Attach the initializePage function to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', initializePage);


// Function to save a generated password along with username/email to localStorage
function savePassword() {
	const password = document.getElementById('generatedPassword').value;
	const username = document.getElementById('username').value;
	if (!password) {
		alert("No password generated!");
		return;
	}
	let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	savedPasswords.push({ password, username }); // Store password and username together
	localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
	displaySavedPasswords(); // Update the list of displayed passwords
}

// Function to display saved passwords along with username/email
function displaySavedPasswords() {
	const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	const listElement = document.getElementById('savedPasswordList');
	listElement.innerHTML = ''; // Clear current list
	savedPasswords.forEach(entry => {
		const item = document.createElement('li');
		item.textContent = `Username/Email: ${entry.username}, Password: ${entry.password}`;
		listElement.appendChild(item);
	});
}

// Function to load saved passwords and usernames/email from a JSON file
function loadData(event) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';

	input.onchange = function(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');

		reader.onload = function(event) {
			const data = JSON.parse(event.target.result);
			localStorage.setItem('savedPasswords', JSON.stringify(data));
			displaySavedPasswords();
		};
	};

	input.click();
}

// Function to export saved passwords and usernames/email as a JSON file
function exportData() {
	const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	const data = JSON.stringify(savedPasswords, null, 2);

	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
	element.setAttribute('download', 'saved_passwords.json');
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

// Clear localStorage when the page is reloaded
window.addEventListener('beforeunload', function() {
	localStorage.removeItem('savedPasswords');
});
// Function to encrypt data using AES encryption
function encryptData(data, passphrase) {
	// Use a library like CryptoJS for AES encryption
	// Example: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
	const encryptedData = CryptoJS.AES.encrypt(data, passphrase).toString();
	return encryptedData;
}

// Function to decrypt data using AES decryption
function decryptData(encryptedData, passphrase) {
	// Use a library like CryptoJS for AES decryption
	// Example: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
	const decryptedData = CryptoJS.AES.decrypt(encryptedData, passphrase).toString(CryptoJS.enc.Utf8);
	return decryptedData;
}

// Function to export encrypted saved passwords and usernames/email as a JSON file
function exportEncryptedData(passphrase) {
	const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
	const data = JSON.stringify(savedPasswords, null, 2);
	const encryptedData = encryptData(data, passphrase);

	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(encryptedData));
	element.setAttribute('download', 'encrypted_saved_passwords.json');
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

// Function to load and decrypt saved passwords and usernames/email from an encrypted JSON file
function loadAndDecryptData(event, passphrase) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';

	input.onchange = function(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');

		reader.onload = function(event) {
			const encryptedData = event.target.result;
			const decryptedData = decryptData(encryptedData, passphrase);
			const data = JSON.parse(decryptedData);
			localStorage.setItem('savedPasswords', JSON.stringify(data));
			displaySavedPasswords();
		};
	};

	input.click();
}
