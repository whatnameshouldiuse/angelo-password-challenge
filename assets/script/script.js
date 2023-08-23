// Assignment code here
function generatePassword() {
  // Number
  var passwordLength;

  do {
    passwordLength = passwordCriteriaLength();
  }
  while (passwordLength === undefined);
  
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
