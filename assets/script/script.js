// Assignment code here
function generatePassword() {
  // Number
  var passwordLength;
  // Booleans
  let passwordChar = {
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
    }
  }

  // Ask for valid character length input, repeat until valid range is given.
  do {
    passwordLength = passwordCriteriaLength();
  }
  while (passwordLength === undefined);
  // console.log(passwordLength);

  // Ask for valid character type input, repeat until at least one type is chosen.
  do {
    var criteria = passwordCriteriaType();
    passwordChar.lowercase = criteria[0];
    passwordChar.uppercase = criteria[1];
    passwordChar.numeric = criteria[2];
    passwordChar.special = criteria[3];
    // console.log(passwordChar);
    // console.log(criteria);
  }
  while (passwordChar.isAllFalse());
  

  
}

function passwordCriteriaLength() {
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

function passwordCriteriaType() {
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
      return passwordCriteriaType();
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

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
