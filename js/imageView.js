
import { apiDomain, navigateTo } from './router.js';
import { callPostRoutingOnLoad } from './app.js';

const VIEW_IMAGE_API = apiDomain + '/viewImage';

export const handleViewImage = async (imageId) => {
    const imageElement = document.getElementById('apiImage');
    const statusElement = document.getElementById('status');

      try {

        const signedInUserName = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        const response = await fetch(VIEW_IMAGE_API+"?imageId="+imageId+"&token="+token+"&username="+signedInUserName, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();

        // Extract the base64Image string from the JSON response
        const base64Image = data.base64Image;

        if (base64Image) {
            // Set the image src. The prefix "data:image/png;base64," is required.
            // Change "png" to "jpeg" or "gif" if your image format is different.
            imageElement.src = `data:image/png;base64,${base64Image}`;
            imageElement.style.display = 'block'; // Make the image visible
            statusElement.style.display = 'none'; // Hide the loading status
        } else {
            statusElement.textContent = 'Error: Image data not found in response.';
        }

      } catch (err) {
        console.error("Error loading images:", err);
      }
}

export const handleBackToImgList = async (event) => {
    event.preventDefault();
    //alert('load upload');
    await navigateTo('/imageList');
    callPostRoutingOnLoad();
    
}
