import { apiDomain, navigateTo } from './router.js';
import { callPostRoutingOnLoad } from './app.js';

const SIGNIN_API = apiDomain + '/signin';

export const handleSignIn = async (event) => {
    event.preventDefault();
    // const form = event.target;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    try {
        const response = await fetch(SIGNIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const responseString = await response.text();
        const obj = JSON.parse(responseString);

        if (obj.status.includes("SUCCESS")) {
            localStorage.setItem('username', username);
            localStorage.setItem('token', obj.token);

            const linkBanner = document.getElementById("link_banner");
            linkBanner.innerHTML = `
                <ul class="menu-list">
                    <li><a href="/imageList" data-link>ImageList</a></li>
                    <li><a href="/profile" data-link>Profile</a></li>
                    <li><a href="/changePassword" data-link>ChangePassword</a></li>
                    <li><a href="/signout" data-link>Sign Out</a></li>
                </ul>
            `;


            await navigateTo('/imageList');
            callPostRoutingOnLoad();
        } else {
            errorMsg.textContent = obj.message;
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        errorMsg.textContent = 'A network error occurred. Please try again.';
    }
};

export const handleSignInPgLoad = async (event) => {
    // event.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    const linkBanner = document.getElementById("link_banner");
    linkBanner.innerHTML = `
            <ul class="menu-list">
              <li><a href="/signup" data-link>Sign up</a></li>
              <li><a href="/signin" data-link>Sign In</a></li>
            </ul>
    `;
}