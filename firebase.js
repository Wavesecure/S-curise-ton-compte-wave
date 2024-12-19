// Vérification que Firebase est chargé
if (typeof firebase === 'undefined') {
    throw new Error('Firebase SDK n\'est pas chargé. Vérifiez vos balises script.');
}

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCmm3_mIQijkfcqm9Z3TM2dscjgLPpx4x0",
    authDomain: "base-f4f56.firebaseapp.com",
    projectId: "base-f4f56",
    databaseURL: "https://base-f4f56-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "base-f4f56.firebasestorage.app",
    messagingSenderId: "1027578753370",
    appId: "1:1027578753370:web:a016bd5f1f60f9cd860363"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Initialiser Firestore et Storage
const db = firebase.firestore();
const storage = firebase.storage();

console.log('✅ Firebase initialisé avec succès');