import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const COLLECTION_NAME = "artifacts";

/**
 * Helper: Converts an image file to a compressed Base64 string
 * This lets us store images directly in the DB without needing 'Storage' permissions.
 */
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Resize to 800px to save space
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to low-quality JPEG string (Text)
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Saves a new artifact to the database (Images saved as text)
 */
export const addArtifact = async (data, imageFile, audioFile) => {
  try {
    // 1. Convert Image to Text
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await compressImage(imageFile);
    }
    
    // 2. Audio Handling (Skip for now or strict size limit)
    // For hackathon, we will skip uploading big audio files to avoid quota limits
    // If you really need audio, we can use a similar Base64 approach but it makes DB heavy.
    
    // 3. Save Metadata + Image String to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      imageUrl: imageUrl, 
      audioUrl: "", 
      createdAt: new Date().toISOString(),
      tags: [data.title.toLowerCase(), data.region.toLowerCase()] 
    });
    
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

/**
 * Fetches all artifacts for the Archive page
 */
/**
 * Fetches all artifacts for the Archive page
 */
export const getArtifacts = async () => {
  try {
    // SIMPLIFIED: Just get everything, don't worry about sorting for now
    const q = query(collection(db, COLLECTION_NAME)); 
    
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log("Fetched Artifacts:", docs); // This will print to your F12 console
    return docs;
  } catch (e) {
    console.error("Error fetching docs: ", e);
    return [];
  }
};