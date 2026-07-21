import {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

import FeeModel from "../models/FeeModel";

class FeeService {

    async add(data) {

        let fee = new FeeModel();

        fee.studentId = data.studentId;
        fee.studentName = data.studentName;
        fee.blockName = data.blockName;
        fee.roomNumber = data.roomNumber;

        fee.amount = Number(data.amount);

        fee.paidAmount = Number(data.paidAmount);

        fee.pendingAmount =
            Number(data.amount) -
            Number(data.paidAmount);

        fee.dueDate = data.dueDate;

        fee.status =
            fee.pendingAmount === 0
                ? "Paid"
                : "Pending";

        const docRef = await addDoc(

            collection(db, "fees"),

            { ...fee }

        );

        return docRef;

    }

    async getAll() {

        const snapshot = await getDocs(

            collection(db, "fees")

        );

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

    }

    async update(id, data) {

        await updateDoc(

            doc(db, "fees", id),

            {

                ...data,

                pendingAmount:

                    Number(data.amount) -

                    Number(data.paidAmount),

                status:

                    Number(data.amount) === Number(data.paidAmount)

                        ? "Paid"

                        : "Pending",

                updatedAt: Date.now()

            }

        );

    }

    async delete(id) {

    await deleteDoc(

        doc(db, "fees", id)

    );

}

async getByStudent(studentId) {

    const snapshot = await getDocs(

        collection(db, "fees")

    );

    return snapshot.docs

        .map(doc => ({

            id: doc.id,

            ...doc.data()

        }))

        .find(

            fee => fee.studentId === studentId

        );

}

}

export default new FeeService();