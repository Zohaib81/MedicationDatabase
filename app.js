import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-2osTMmKPmtnZ3rSZBFSDjf6yYlggEDg",
  authDomain: "medication-database-medially.firebaseapp.com",
  projectId: "medication-database-medially",
  storageBucket: "medication-database-medially.firebasestorage.app",
  messagingSenderId: "948401223720",
  appId: "1:948401223720:web:d1fe5b64e829a018d55d1d",
  measurementId: "G-CBGRD76QR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make Firebase services globally available
window.auth = auth;
window.db = db;

// Set up Google authentication provider
const provider = new GoogleAuthProvider();

// Optional: Customize provider parameters (e.g., request additional scopes)
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// Google Sign-In button logic
document.addEventListener("DOMContentLoaded", () => {
  const googleSignInButton = document.getElementById("google-signin");
  if (googleSignInButton) {
      googleSignInButton.addEventListener("click", async () => {
          try {
              const provider = new GoogleAuthProvider();
              const result = await signInWithPopup(auth, provider);
              const user = result.user;
              console.log("User signed in with Google:", user);
              
              document.getElementById("login-message").innerText = "Google login successful!";
              setTimeout(() => {
                  window.location.href = "test.html"; // Redirect to your target page
              }, 1000);
          } catch (error) {
              console.error("Google login failed:", error.message);
              alert("Google login failed: " + error.message);
          }
      });
  } else {
      console.error("Google Sign-In button not found. Make sure the button exists in your HTML.");
  }
});


// Monitor auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Authenticated user:", user.email);
    } else {
        console.warn("No user is authenticated.");
    }
});
