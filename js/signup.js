import { apiDomain } from './router.js';

const SIGNUP_API = apiDomain + '/signup';
const CHECK_USERNAME_API = apiDomain + '/checkUsername';

// Function for handling the sign-up form submission
export const handleSignUp = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const homeAddress = document.getElementById("homeAddress").value;
    const errorMessage = document.getElementById("errorMessage");

    if (!validatePassword()) {
        errorMessage.textContent = "Password does not meet the requirements.";
        return;
    }

    try {
        const response = await fetch(SIGNUP_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, firstName, lastName, email, homeAddress, password }),
        });

        const message = await response.text();

        if (message.includes("Signed Up successfully!")) {
            alert("User Signed up successfully!");
            //await navigateTo('/signin');
            
        } else if (message.includes("Username already taken")) {
            errorMessage.textContent = "Username already taken!";
        } else {
            errorMessage.textContent = "Something went wrong. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = "Unable to connect to the server.";
    }
};

// Function for checking if a username exists
export const checkUsrExists = async () => {
    const usernameInput = document.getElementById("username");
    const usernameMessage = document.getElementById("usernameMessage");
    const username = usernameInput.value.trim();

    if (username.length === 0) {
        usernameMessage.textContent = "";
        return;
    }

    try {
        const response = await fetch(CHECK_USERNAME_API+"?username="+username, {
            method: "GET",
        });
        const result = await response.text();
        if (result.includes("Username already taken")) {
            usernameMessage.textContent = "Username already taken!";
            usernameMessage.style.color = "red";
        } else if (result.includes("Username available")) {
            usernameMessage.textContent = "Username is available";
            usernameMessage.style.color = "green";
            usernameMessage.style.fontWeight = "500";
        } else {
            usernameMessage.textContent = "";
        }
    } catch (error) {
        console.error("Error checking username:", error);
        usernameMessage.textContent = "Error checking username availability";
        usernameMessage.style.color = "red";
    }
};

// Function for validating password rules
export const validatePassword = () => {
    const value = document.getElementById("password").value;
    const ruleLength = document.getElementById("ruleLength");
    const ruleNumber = document.getElementById("ruleNumber");
    const ruleSpecial = document.getElementById("ruleSpecial");
    const ruleNoSpaces = document.getElementById("ruleNoSpaces");

    const hasLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const noSpaces = !/\s/.test(value);

    updateColorPwdRule(ruleLength, hasLength);
    updateColorPwdRule(ruleNumber, hasNumber);
    updateColorPwdRule(ruleSpecial, hasSpecial);
    updateColorPwdRule(ruleNoSpaces, noSpaces);

    return hasLength && hasNumber && hasSpecial && noSpaces;
};

// Helper function for updating password rule color
function updateColorPwdRule(element, isValid) {
    if (isValid) {
        element.classList.add("valid");
        element.classList.remove("invalid");
    } else {
        element.classList.add("invalid");
        element.classList.remove("valid");
    }
}
