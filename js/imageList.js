import { navigateTo } from './router.js';
import { callPostRoutingOnLoad } from './app.js';
import { handleViewImage } from './imageView.js';

export const handleUploadPageLoad = async (event) => {
    event.preventDefault();
    //alert('load upload');
    await navigateTo('/imageUpload');
    callPostRoutingOnLoad();
    
}

export const loadImageList = async () => {

      const responseMessage = document.getElementById("responseMessage");

      try {
        const signedInUserName = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:8080/getImageList?token="+token+"&username="+signedInUserName, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        const tbody = document.getElementById("imageTableBody");
        tbody.innerHTML = ""; // clear old rows

        if (data.images && data.images.length > 0) {
          var i = 1;
          data.images.forEach(img => {
            const tr = document.createElement("tr");
            tr.onclick = () => imageLoad(img.imageId);

            tr.innerHTML = `
              <td>${i++}</td>
              <td>${img.secure ? "Yes" : "No"}</td>
              <td>${img.imageFormat}</td>
              <td>${img.imageSize} KB</td>
              <td>${img.uploadDate.substring(0, 10)+"&ensp;&ensp;"+img.uploadDate.substring(11, 16)}</td>
            `;
            tbody.appendChild(tr);
          });
        } else {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td colspan="5">No images found</td>`;
          tbody.appendChild(tr);
        }

      } catch (err) {
        responseMessage.className='error';
        responseMessage.textContent = "Error loading image list.";        
        console.error("Error loading images:", err);
      }
    }

const imageLoad = async (imageId) => {
    //event.preventDefault();
    //alert('load upload');
    await navigateTo('/imageView');
    handleViewImage(imageId);
    callPostRoutingOnLoad();
    
}
