import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import { getDocs, collection, addDoc, query, orderBy, limit, where, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI91Hjo2CN0tsZGTx4esbjxAv63bgfsfU",
  authDomain: "medication-database-daafa.firebaseapp.com",
  projectId: "medication-database-daafa",
  storageBucket: "medication-database-daafa.appspot.com",
  messagingSenderId: "596453094865",
  appId: "1:596453094865:web:0cfd911a6605b299399cf0",
  measurementId: "G-V3NJ48JFZE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make Firebase services globally available
window.auth = auth;
window.db = db;

// Sign-In Form Logic
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);

    // Redirect to test.html upon successful login
    document.getElementById("login-message").innerText = "Login successful!";
    setTimeout(() => {
      window.location.href = "test.html"; // Change to the appropriate page you want to redirect
    }, 1000);
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
});

    function addPatientData() {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                    console.log("Authenticated user:", user.email);

                    try {
                        // Patient data
                        const patientData = {
                        name: "Jane Doe",
                        dob: "02/05/1961",
                        gender: "Female",
                        emergency_contact: {
                            name: "Mary Doe",
                            phone: "098-765-4321",
                            email: "mdoe@gmail.com",
                        },
                        medical_conditions: {
                            Osteoarthritis: {
                              medications: ["Acetaminophen"],
                            },
                            Hypertension: {
                              medications: ["Lisinopril"],
                            },
                        },
                        createdAt: serverTimestamp(),
                        };

                        // Step 1: Query for existing patient with the same name and age
                        const patientQuery = query(
                        collection(db, "Patient Information"),
                        where("name", "==", patientData.name),
                        where("dob", "==", patientData.dob)
                        );

                        const querySnapshot = await getDocs(patientQuery);

                        if (!querySnapshot.empty) {
                        // Step 2: If a match is found, update the first matching document
                        const docRef = querySnapshot.docs[0].ref;
                        await updateDoc(docRef, patientData);
                        console.log("Existing patient data updated successfully!");
                        } else {
                        // Step 3: If no match is found, create a new document
                        await addDoc(collection(db, "Patient Information"), patientData);
                        console.log("No match found. New patient data added successfully!");
                        }
                    } catch (error) {
                        console.error("Error adding or updating data:", error);
                    }
                    } else {
                    console.warn("No user is authenticated.");
                    }
                });
                }

                // Call addPatientData after authentication is completed
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("User is authenticated. Proceeding with adding patient data...");
                    addPatientData();
                } else {
                    console.log("User is not authenticated yet.");
                }
                });
