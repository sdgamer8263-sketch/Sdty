import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBvlOV7L3g_lBDRR7mcNincGVyM16xtd90",
  authDomain: "ska-web-168fe.firebaseapp.com",
  databaseURL: "https://ska-web-168fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ska-web-168fe",
  appId: "1:782823377176:web:e2f62ba16d5fe0af7f366d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export const auth = getAuth(app);

