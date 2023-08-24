// Strings for each character type that a generated password can have.
var LOWERCASE_STRING = "abcdefghijklmnopqrstuvwxyz";
var UPPERCASE_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var NUMERIC_STRING = "1234567890";
var SPECIAL_STRING = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Main function
function generatePassword() {
  // Number, determines generated password length
  var criteriaLength;
  // Booleans, determines contents of generated password
  let criteriaCharType = {
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,

    isAllFalse: function() {
      if (!this.lowercase && !this.uppercase && !this.numeric && !this.special) {
        return true;
      }
      else {
        return false;
      }
    },

    totalStringSample: function() {
      var totalSample = "";
      if (this.lowercase) {
        totalSample += LOWERCASE_STRING;
      }
      if (this.uppercase) {
        totalSample += UPPERCASE_STRING;
      }
      if (this.numeric) {
        totalSample += NUMERIC_STRING;
      }
      if (this.special) {
        totalSample += SPECIAL_STRING;
      }
      return totalSample;
    },

    returnMinimumRequirement: function() {
      var minReq = "";
      if (this.lowercase) {
        minReq += this.randomFromString(LOWERCASE_STRING);
      }
      if (this.uppercase) {
        minReq += this.randomFromString(UPPERCASE_STRING)
      }
      if (this.numeric) {
        minReq += this.randomFromString(NUMERIC_STRING);
      }
      if (this.special) {
        minReq += this.randomFromString(SPECIAL_STRING);
      }
      return minReq;
    },

    randomFromString: function(sampleString) {
      return sampleString.charAt(Math.floor(Math.random() * sampleString.length));
    }
  }

  // Ask for valid character length input, repeat until valid range is given.
  do {
    criteriaLength = promptCriteriaLength();
  }
  while (criteriaLength === undefined);

  // Ask for valid character type input, repeat until at least one type is chosen.
  do {
    var criteria = promptCriteriaType();
    criteriaCharType.lowercase = criteria[0];
    criteriaCharType.uppercase = criteria[1];
    criteriaCharType.numeric = criteria[2];
    criteriaCharType.special = criteria[3];
  }
  while (criteriaCharType.isAllFalse());

  // Generate Password
  // First input one character from each type of character the password will have.
  var characterSample = criteriaCharType.totalStringSample();
  var genPass = ""; // Generated Password
  for (var i=0; i<criteriaLength; i++) {
    if (i === 0) {
      genPass += criteriaCharType.returnMinimumRequirement();
      i += genPass.length;
    }
    genPass += criteriaCharType.randomFromString(characterSample);
  }

  // Shuffle the password.
  // Ensure so up to first 4 characters of the password aren't ordered by lowercase, uppercase, number, then special character.
  // Fisher-Yates shuffle.
  var genPass = genPass.split("");
  for (var i = criteriaLength - 1; i > 0; i--) {
    var replaceIndex = Math.floor(Math.random() * (i + 1));
    var tempChar = genPass[i];
    genPass[i] = genPass[replaceIndex];
    genPass[replaceIndex] = tempChar;
  }
  
  return genPass.join("");
}

// Prompts user to input a number between a certain range.
// On valid input, returns input.
// On invalid input, alerts user then returns null.
function promptCriteriaLength() {
  var inputLength = Number(prompt("Please input your desired character length for your password (Between 8 and 128)"));

  if (inputLength >= 8 && inputLength <= 128) {
    return inputLength;
  }
  else if (inputLength <= 8 || inputLength >= 128) {
    alert("Please provide a valid range.");
  }
  else {
    alert("Please provide a valid input");
  }
}

// Series of prompts to confirm or deny including certain character types.
// Returns an array of a specific size, containing all booleans.
// If even a single index is true, returns array.
// If all contents of array are false, alert user then returns null.
function promptCriteriaType() {
  var criteria = [false, false, false, false];
  var criteriaCheck = function(message) {
    var inputBool = prompt(message + "(Y/N)");
    if (inputBool == "y" || inputBool == "Y") {
      return true;
    }
    else if (inputBool == "n" || inputBool == "N") {
      return false;
    }
    else {
      alert("Please input either Y or N in either lower or uppercase");
      return promptCriteriaType();
    }
  }

  criteria[0] = criteriaCheck("Should this password contain lowercase letters?");
  criteria[1] = criteriaCheck("Should this password contain uppercase letters?");
  criteria[2] = criteriaCheck("Should this password contain numbers?");
  criteria[3] = criteriaCheck("Should this password contain special characters?");

  for (var i in criteria) {
    if (i) {
      return criteria;
    }
  }
  alert("Please make sure at least one of the criteria types are chosen");
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  alert("Password successfully generated!\n" + password);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
