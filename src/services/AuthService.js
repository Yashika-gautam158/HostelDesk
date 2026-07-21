import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

class AuthService {

    async setData(data) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(data)
        );

    }

    getData() {

        return JSON.parse(
            localStorage.getItem("currentUser")
        );

    }

    getUserType() {

        const user = this.getData();

        return user ? user.userType : null;

    }

    getEmail() {

        const user = this.getData();

        return user ? user.email : null;

    }

    isLoggedIn() {

        return this.getData() != null;

    }

    async logout() {

        await signOut(auth);

        localStorage.removeItem("currentUser");

    }

}

export default new AuthService();