import { isLoggedIn } from './router.js';

export const updateNavigation = () => {
    const signedIn = isLoggedIn();
    const nav = document.getElementById('main-nav');
    if (nav) {
        nav.innerHTML = '';
        if (signedIn) {
            nav.classList.remove('invisible');
            nav.innerHTML = `
                <a href="/" data-link>Home</a>
                <a href="/dashboard" data-link>Dashboard</a>
                <a href="#" id="signout-link">Sign Out</a>
            `;
        } else {
            nav.classList.remove('invisible');
            nav.innerHTML = `
                <a href="/" data-link>Home</a>
                <a href="/about" data-link>About</a>
                <a href="/signin" data-link>Sign In</a>
            `;
        }
    }
};
