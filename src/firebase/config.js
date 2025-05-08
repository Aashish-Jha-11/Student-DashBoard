import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDRbTgg89KEEpojJhq-SySmG-_xq7Fgu1c",
  authDomain: "test-f54ed.firebaseapp.com",
  projectId: "test-f54ed",
  storageBucket: "test-f54ed.firebasestorage.app",
  messagingSenderId: "800243898087",
  appId: "1:800243898087:web:2fbd27bfb547d99aaeb442",
  measurementId: "G-5T0VZWYE9S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;