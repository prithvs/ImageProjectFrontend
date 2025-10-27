import { apiDomain } from './router.js';

const GET_PROFILE_API = apiDomain + '/profile';
const EDIT_PROFILE_API = apiDomain + '/editProfile';

export const loadProfile = async () => {

    const responseMessage = document.getElementById("responseMessage");

    try {
      const signedInUserName = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      const response = await fetch(GET_PROFILE_API+"?token="+token+"&username="+signedInUserName, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      const firstnameInput = document.getElementById("firstName");
      firstnameInput.value = data.first_name;

      const lastnameInput = document.getElementById("lastName");
      lastnameInput.value = data.last_name;

      const emailInput = document.getElementById("email");
      emailInput.value = data.email;

      const homeAddressInput = document.getElementById("homeAddress");
      homeAddressInput.value = data.home_address;

    }catch (err) {
      responseMessage.className='error';
      responseMessage.textContent = "Error loading profile data.";
      console.error("Error loading profile data:", err);

    }
}


export const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const signedInUserName = localStorage.getItem('username');
    const username = signedInUserName;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const homeAddress = document.getElementById("homeAddress").value;
    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch(EDIT_PROFILE_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, firstName, lastName, email, homeAddress }),
        });

        const responseString = await response.text();
        const obj = JSON.parse(responseString);

        if (obj.status.includes("SUCCESS")) {
            responseMessage.className='success';
            responseMessage.textContent = 'User Profile Edited Successfully!';
            
        } else {
            responseMessage.className='error';
            responseMessage.textContent = "Problem encountered in editing profile";
        }
    } catch (error) {
        console.error("Error:", error);
        responseMessage.className='error';
        responseMessage.textContent = "Unable to connect to the server.";
    }
};