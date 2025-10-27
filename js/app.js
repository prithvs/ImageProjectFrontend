// js/app.js

import { router, navigateTo, isLoggedIn } from './router.js';
import { updateNavigation } from './navigation.js';
import { handleSignIn, handleSignInPgLoad } from './signin.js';
import { handleSignUp, checkUsrExists, validatePassword } from './signup.js';
import { loadProfile, handleProfileUpdate } from './profile.js';
import { loadImageList, handleUploadPageLoad } from './imageList.js';
import { handleBackToImgList } from './imageView.js';
import { handlePreview, handleUpload } from './imageUpload.js';
import { handlePasswordUpdate, validateNewPassword } from './changePwd.js';


const postRoutingActions = () => {


    const signInForm = document.getElementById('signin-form');
    if (signInForm) {
        handleSignInPgLoad()        
        signInForm.addEventListener('submit', handleSignIn);
    }

    const signUpForm = document.getElementById('signupForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', handleSignUp);

        const usernameInput = document.getElementById("username");
        usernameInput.addEventListener("keyup",checkUsrExists);

        const userPwd = document.getElementById("password");
        userPwd.addEventListener("keyup",validatePassword);

    }

    const profileForm = document.getElementById('profileForm');
    if(profileForm){
        loadProfile();
        profileForm.addEventListener('submit', handleProfileUpdate);
    }


    const changePwdForm = document.getElementById('changePwdForm');
    if (changePwdForm) {
        changePwdForm.addEventListener('submit', handlePasswordUpdate);

        const userPwd = document.getElementById("newPassword");
        userPwd.addEventListener("keyup",validateNewPassword);

    }

    const imglistForm = document.getElementById('imglist-form');
    if(imglistForm){
        loadImageList();
        imglistForm.addEventListener("submit", handleUploadPageLoad);

    }

    const imgViewForm = document.getElementById('viewImageForm');
    if(imgViewForm){
        imgViewForm.addEventListener("submit", handleBackToImgList);
    }    
    const uploadForm = document.getElementById('uploadForm');
    if(uploadForm){
        const imageInput = document.getElementById("imageInput");
        imageInput.addEventListener("change", handlePreview);
        uploadForm.addEventListener("submit", handleUpload);
    }
    
    
};


document.addEventListener("DOMContentLoaded", async () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
        nav.classList.add('invisible');
    }

    document.body.addEventListener("click", async e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            const url = e.target.getAttribute('href');
            await navigateTo(url);
            postRoutingActions();
        }
    });

    
    window.addEventListener("popstate", async () => {
        //alert('Browser back or foward button is not allowed, use the navigation links instead.')
        await router();
        postRoutingActions();
    });

    await router();
    updateNavigation();
    postRoutingActions();
});

export const callPostRoutingOnLoad = async (event) => {
        postRoutingActions();
}