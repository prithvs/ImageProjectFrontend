const routes = {
    '/': '/pages/signin.html',
    '/about': '/pages/about.html',
    '/signin': '/pages/signin.html',
    '/signup': '/pages/signup.html',
    '/dashboard': '/pages/dashboard.html',
    '/imageList': '/pages/imageList.html',
    '/imageView': '/pages/imageView.html',   
    '/imageUpload': '/pages/imageUpload.html',
    '/profile': '/pages/profile.html',
    '/changePassword': '/pages/changePwd.html',
    '/signout': '/pages/signin.html'
};
export const apiDomain = 'http://localhost:8080';

export const isLoggedIn = () => {
    return !!localStorage.getItem('username');
};

const fetchAndDisplayContent = async (path) => {
    const mainContent = document.getElementById('app-content');

    // Protect internal routes
    if (!(['/', '/signup', '/signin'].includes(path)) && !isLoggedIn()) {
        mainContent.innerHTML = '<h1>Unauthorized</h1><p>Please sign in to view this page.</p>';
        return;
    }

    const routeFile = routes[path];
    if (routeFile) {
        try {
            const response = await fetch(routeFile);
            const html = await response.text();
            mainContent.innerHTML = html;
        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = '<h1>Error</h1><p>Failed to load content.</p>';
        }
    } else {
        mainContent.innerHTML = '<h1>404</h1><p>Page not found.</p>';
    }
};

export const router = async () => {
    const path = window.location.pathname;
    await fetchAndDisplayContent(path);
};

export const navigateTo = async url => {
    history.pushState(null, null, url);
    await router();
};
