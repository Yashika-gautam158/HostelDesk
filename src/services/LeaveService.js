import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";

class LeaveService {

    async getAll() {

        const snapshot = await getDocs(
            collection(db, "leaveRequests")
        );

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

    }

    async updateStatus(id, status) {

        await updateDoc(

            doc(db, "leaveRequests", id),

            {

                status: status,

                updatedAt: Date.now()

            }

        );

    }

}

export default new LeaveService();