import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      databaseURL: "https://fir-firebase-3f024.firebaseio.com"
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();