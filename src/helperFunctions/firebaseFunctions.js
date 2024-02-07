import {getStorage, listAll, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {getApps, initializeApp} from "firebase/app";
import firebaseConfig from "./FirebaseConfig";

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}
const listFiles = async () => {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "images");

    // Find all the prefixes and items.
    const listResp = await listAll(listRef);
    return listResp.items;
};

const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                reject(error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({
                    downloadUrl,
                    metadata: uploadTask.snapshot.metadata,
                });
            }
        );
    });
};

module.exports = {
    listFiles, uploadToFirebase
}