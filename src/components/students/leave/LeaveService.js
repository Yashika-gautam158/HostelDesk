import {
    addDoc,
    collection,
    getDocs
} from "firebase/firestore";

import { db } from"../../../firebaseConfig/firebaseConfig";

import LeaveModel from "./LeaveModel";

class LeaveService {

    async add(data){

        let leave = new LeaveModel();

        leave.studentId = data.studentId;
        leave.studentName = data.studentName;
        leave.blockName = data.blockName;
        leave.roomNumber = data.roomNumber;

        leave.fromDate = data.fromDate;
        leave.toDate = data.toDate;
        leave.reason = data.reason;

        const docRef = await addDoc(

            collection(db,"leaveRequests"),

            {...leave}

        );

        return docRef;

    }

    async getMyLeaves(studentId){

        const snapshot = await getDocs(

            collection(db,"leaveRequests")

        );

        return snapshot.docs

            .map(doc=>({

                id:doc.id,

                ...doc.data()

            }))

            .filter(l=>l.studentId===studentId);

    }

}

export default new LeaveService();