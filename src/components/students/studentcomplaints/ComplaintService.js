import {
    addDoc,
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../../../firebaseConfig/firebaseConfig";

import ComplaintModel from "./ComplaintModel";

class ComplaintService {

    async add(data){

        let complaint = new ComplaintModel();

        complaint.studentId = data.studentId;
        complaint.studentName = data.studentName;

        complaint.blockId = data.blockId;
        complaint.blockName = data.blockName;

        complaint.roomId = data.roomId;
        complaint.roomNumber = data.roomNumber;

        complaint.category = data.category;
        complaint.priority = data.priority;
        complaint.title = data.title;
        complaint.description = data.description;

        const docRef = await addDoc(

            collection(db,"complaints"),

            {...complaint}

        );

        return docRef;

    }

    async getMyComplaints(studentId){

        const snapshot = await getDocs(

            collection(db,"complaints")

        );

        return snapshot.docs

            .map(doc=>({

                id:doc.id,

                ...doc.data()

            }))

            .filter(c=>c.studentId===studentId);

    }

}

export default new ComplaintService();