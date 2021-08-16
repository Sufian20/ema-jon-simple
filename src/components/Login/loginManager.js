import firebase, { getApp,  } from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { updateProfile } from "firebase/auth";

        
 

export const initilaizeFrameWork = () => {
    
    
        const firebaseApp = initializeApp(firebaseConfig);
 
          
}



export const handelGoogleSignIn = () => {

    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            }
            return signInUser;

        })

        .catch(err => {
            console.log(err);
            console.log(err.message);
        })

}


export const handelGoogleSingOut = () => {

    const auth = getAuth();
    return signOut(auth).then(res => {
        const signOutUser = {
            isSignIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false,
        }
        return signOutUser;
    }).catch((err) => {
        console.log(err);
        console.log(err.message);
    });

}

export const CreateUserWithEmailAndPassword = (name, email, password) => {
    const auth = getAuth();
   return createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
           
        })
        .catch((error) => {
            const newUserInfo = { };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
           return newUserInfo;
            
        });
}

export const SignInWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
  return  signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            // Signed in 
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            // ...
        })
        .catch((error) => {
            const newUserInfo = { };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });

}



    const updateUserName = name => {
        const auth = getAuth();
        const user = auth.currentUser;

        user.updateProfile({
            displayName: name,

        }).then(res => {
            console.log('User Updated Successfully');
            // ...
        }).catch((error) => {
            console.log(error);
            // ...
        });
    }

