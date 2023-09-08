import { storage } from "../../../config/firebase-config"
import { ref } from "firebase/storage"
import { getDownloadURL } from "firebase/storage"

export async function uploadFile(file){
    const fileRefTrack01 = ref(storage, )
}

export const tracks = [
    { 
        title : "Good Night", 
        author: "FASSound", 
        pictureTitle: "https://cdn.pixabay.com/audio/2023/07/30/13-02-32-179_200x200.jpg", 
        src: getDownloadURL(ref(storage, "tracks/goodnight.mp3")).then((url) => {
            console.log(url);
        })

    },
    {

    }
]