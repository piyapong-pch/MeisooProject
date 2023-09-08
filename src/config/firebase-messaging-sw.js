import { async } from "@firebase/util";
import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
// Add the public key generated from the console here.

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const app = initializeApp(firebaseConfig);
  
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            process.env.REACT_APP_FIREBASE_KEY_PAIR,
        }).then((currentToken) => {
          if (currentToken) {
            console.log("currentToken: ", currentToken);
          } else {
            console.log("Can not get token");
          }
        });
      } else {
        console.log("Do not have permission!");
      }
    });
  }
  
  requestPermission();