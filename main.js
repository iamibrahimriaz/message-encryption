// Tab Part JS
var tabButtons = document.querySelectorAll(".tab-btn");

function tabButton(btn_class) {
    var tab_btn = document.querySelectorAll(".tab-btn");
    tab_btn.forEach((btn) => {
        if(btn.className.includes(btn_class)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function tabContent(content_class) {
    var tab_contents = document.querySelectorAll(".tab-content");
    tab_contents.forEach((content) => {
        if(content.className.includes(content_class)) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
}

tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (this.className.includes("encrypt_tab")) {
            tabButton('encrypt_tab');
            tabContent('encrypt-message');
        }
        if (this.className.includes("decrypt_tab")) {
            tabButton('decrypt_tab');
            tabContent('decrypt-message');
        }
        if (this.className.includes("details_tab")) {
            tabButton('details_tab');
            tabContent('details-message');
        }
    });
});


// Encryption Part JS
var encrypt_btn = document.querySelector("#encrypt_btn");
var decrypt_btn = document.querySelector("#decrypt_btn");
var details_btn = document.querySelector("#details_btn");

encrypt_btn.addEventListener('click', function () {
    var input_message = document.querySelector("#input_message").value;
    var input_key = document.querySelector("#input_key").value;

    var showEncryptedMessage = document.querySelector("#encrypted_message");

    var encrypted_message = encrypt(input_message, input_key)

    showEncryptedMessage.innerHTML = encrypted_message;
});

decrypt_btn.addEventListener('click', function () {
    var encrypted_message = document.querySelector("#encrypted_message").innerHTML;
    var decryption_key = document.querySelector("#encryption_key").value;
    var showDecryptedMessage = document.querySelector("#decrypted_message");

    var decrypted_message = decrypt(encrypted_message, decryption_key);
	
    showDecryptedMessage.innerHTML = decrypted_message;
});

details_btn.addEventListener('click', function () {
    var input_text = document.querySelector("#input_text").value;
    var originalDetailsMessage = document.querySelector("#original_text");
    var showDetailsMessage = document.querySelector("#details_text");

    searchWikipedia(input_text)
      .then(function(details_text) {
        originalDetailsMessage.innerHTML = input_text;
        showDetailsMessage.innerHTML = details_text;
      })
      .catch(function(error) {
        console.log("Error occurred while searching:", error);
      });
});


function codeEncryption (code) {
    let shiftCodes = [];
    let shiftSum = 0;

    for (let i = 0; i < code.length; i++) {
        let shiftCode = code.charAt(i).charCodeAt(0);
        shiftCodes.push(shiftCode);
        shiftSum += shiftCode;
    }

    return parseInt(shiftSum / 10, 10);
}

function encrypt(message, shift) {
	const encryptedArray = Array.from(message);
    const encryptCode = codeEncryption (shift);
    let shiftedCode = 0;

    const asciiCodes = encryptedArray.map(char => {
		char.charCodeAt(0);
		if (encryptCode) {
			shiftedCode = char.charCodeAt(0) + encryptCode;
		} else {
			shiftedCode = char.charCodeAt(0) + 85;
		}
		
		return shiftedCode;
	});

    const encryptedMessage =  asciiCodes.map(code => String.fromCharCode(code)).join('x');
    
    return encryptedMessage;
}
  
function decrypt(encryptedMessage, shift) {
    // To decrypt, we use the negative of the shift value
    const encryptCode = codeEncryption (shift);
    const asciiCodes = encryptedMessage.split('x');

	const decryptedMessage = asciiCodes.map(code => {
		if (encryptCode) {
			shiftedCode = String.fromCharCode(code.charCodeAt(0) - encryptCode);
		} else {
			shiftedCode = String.fromCharCode(code.charCodeAt(0) - 85);
		}
		
		return shiftedCode;
	}).join('');
	
	return decryptedMessage;
}

// Function to search Wikipedia for a query
function searchWikipedia(query) {
    var corsProxy = 'https://api.allorigins.win/get?url='; // CORS proxy URL
    var apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${encodeURIComponent(query)}`;
  
    var proxyUrl = corsProxy + encodeURIComponent(apiUrl);

    return fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            var responseData = JSON.parse(data.contents);
            var searchResults = responseData.query.search;
			
            var resultText = "";
            for (var i = 0; i < searchResults.length; i++) {
                resultText += searchResults[i].snippet + " ";
            }
            return resultText;
        });
}
  



  