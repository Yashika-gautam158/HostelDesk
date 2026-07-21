import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";

class ComplaintService {

    async getAll() {

        const snapshot = await getDocs(
            collection(db, "complaints")
        );

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

    }

    async updateStatus(id, status) {

        await updateDoc(
            doc(db, "complaints", id),
            {

                status: status,

                updatedAt: Date.now()

            }
        );

    }

}

export default new ComplaintService();