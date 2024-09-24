import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4_eoHW4o_9TDz8EgEyYC79rNN53l9JFI",
  authDomain: "weddingguest-ab3fa.firebaseapp.com",
  projectId: "weddingguest-ab3fa",
  storageBucket: "weddingguest-ab3fa.appspot.com",
  messagingSenderId: "619234282495",
  appId: "1:619234282495:web:a0082c9643d1ee6051b5ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const guests = [
  { phone: "08080764159", name: "Mr Kazeem", type: "Single" },
  { phone: "08033792075", name: "Mr Mayowa", type: "Plus One" },
  { phone: "08147257493", name: "Nkem Tosin", type: "Plus One" },
  { phone: "07051737419", name: "Rufiat", type: "Single" },
  { phone: "09057612707", name: "Mary", type: "Single" },
  { phone: "08097360353", name: "Tokunbo", type: "Plus One" },
  { phone: "08161347742", name: "Annabel", type: "Single" },
  { phone: "09099865605", name: "Aisha", type: "Single" },
  { phone: "09076782036", name: "Chiamaka", type: "Single" },
];

// Function to add data to Firestore only if it does not already exist
export const addGuestsToFirestore = async () => {
  try {
    const guestCollectionRef = collection(db, "guests");
    const batch = writeBatch(db); // Initialize a batch write to improve efficiency

    // Get all guests' phone numbers in a single query for efficiency
    const q = query(guestCollectionRef, where("phone", "in", guests.map(g => g.phone)));
    const querySnapshot = await getDocs(q);

    // Collect existing phone numbers
    const existingPhones = querySnapshot.docs.map(doc => doc.data().phone);

    // Iterate through the guest list and add guests that are not duplicates
    guests.forEach((guest) => {
      if (!existingPhones.includes(guest.phone)) {
        const docRef = doc(guestCollectionRef); // Generate a new document reference
        batch.set(docRef, guest); // Add the guest to the batch
      }
    });

    // Commit the batch write
    await batch.commit();
    console.log("Guests added successfully!");
  } catch (error) {
    console.error("Error adding guests: ", error);
  }
};
