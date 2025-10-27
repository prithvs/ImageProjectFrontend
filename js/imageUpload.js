import { apiDomain } from './router.js';

const UPLOAD_IMAGE_API = apiDomain + '/uploadImage';


export const handlePreview = async () => {

    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
   
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
}

export const handleUpload = async (event) => {

    event.preventDefault();
    const imageInput = document.getElementById("imageInput");
    const secureCheckbox = document.getElementById("secureCheckbox");
    const responseDiv = document.getElementById("response");

    const file = imageInput.files[0];
    if (!file) return;

    const signedInUserName = localStorage.getItem('username');


    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", signedInUserName);
    formData.append("isSecure", secureCheckbox.checked); // true/false

    try {
        const res = await fetch(UPLOAD_IMAGE_API, {
            method: "POST",
            body: formData,
        });

        const result = await res.json();
        responseDiv.textContent = "Upload successful ";
        responseDiv.style.color = "green";
    } catch (err) {
        responseDiv.textContent = "Upload failed: " + err.message;
        responseDiv.style.color = "red";
    }
}

    
