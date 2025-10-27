

export const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    // const username = document.getElementById("username").value;
    const signedInUserName = localStorage.getItem('username');
    const username = signedInUserName;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const retypePassword = document.getElementById("retypePassword").value;

    const responseMessage = document.getElementById("responseMessage");

    if (!validateNewPassword()) {
        responseMessage.className='error';
        responseMessage.textContent = "Password does not meet the requirements.";
        return;
    }

    if(newPassword != retypePassword){
        responseMessage.className='error';
        responseMessage.textContent = "New Password and Re-Enter new password does not match.";
        return;       
    }

    try {
        const response = await fetch("http://localhost:8080/editPassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, oldPassword, newPassword}),
        });

        const message = await response.text();

        if (message.includes("User Password Edited Successfully!")) {
            responseMessage.className='success';
            responseMessage.textContent = "Password changed successfully!";
    
        } else if (message.includes("Wrong Old Password Entered!")) {
            responseMessage.className='error';
            responseMessage.textContent = "Wrong Old Password Entered!";
        } else {
            responseMessage.className='error';
            responseMessage.textContent = "Something went wrong. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        responseMessage.className='error';        
        responseMessage.textContent = "Unable to connect to the server.";
    }
};

export const validateNewPassword = () => {
    const value = document.getElementById("newPassword").value;
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

function updateColorPwdRule(element, isValid) {
    if (isValid) {
        element.classList.add("valid");
        element.classList.remove("invalid");
    } else {
        element.classList.add("invalid");
        element.classList.remove("valid");
    }
}