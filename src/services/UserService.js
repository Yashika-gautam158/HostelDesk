import UserModel from "../models/UserModel";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../firebaseConfig/firebaseConfig";
import AuthService from "./AuthService";
const dbPath = 'users';
 class UserService {
      async login(data) {
        const userData = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const user = userData.user;

        const userFirestoreData = await getDoc(
            doc(db, dbPath, user.uid)
        );

        const userdata = userFirestoreData.data();

        if (userFirestoreData.exists()) {

            let authData = {
                id: user.uid,
                email: user.email,
                name: userdata.name,
                userType: userdata.userType,
                token: user.accessToken
            };

            await AuthService.setData(authData);
console.log(authData);
            return authData; // return user details, so we do not need to access localstorage in Login component

        } else {
            throw new Error("User not found!");
        }
    }


}export default new UserService();