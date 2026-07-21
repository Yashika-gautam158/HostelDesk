import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    setDoc
} from "firebase/firestore";

import {
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import { auth } from "../firebaseConfig/firebaseConfig";

import { db } from "../firebaseConfig/firebaseConfig";
import UserModel from "../models/UserModel";

class StudentService {

    // Add Student
   async add(data) {

    // 1. Create Authentication Account

    const userCredential =
        await createUserWithEmailAndPassword(

            auth,

            data.email,

            data.password

        );

    const user = userCredential.user;

    // 2. Create Student Object

    let newStudent = new UserModel();

    newStudent.name = data.name;
    newStudent.email = user.email;
    newStudent.phone = data.phone;
    newStudent.gender = data.gender;

    newStudent.course = data.course;
    newStudent.year = data.year;

    newStudent.address = data.address;

    newStudent.guardianName = data.guardianName;
    newStudent.guardianPhone = data.guardianPhone;

    // Save Firebase UID

    newStudent.uid = user.uid;

    // Room Details

    newStudent.roomId = "";
    newStudent.roomNumber = "";
    newStudent.blockId = "";
    newStudent.blockName = "";

    newStudent.status = "Active";
    newStudent.role ="Student";

    newStudent.createdAt = Date.now();

    newStudent.updatedAt = Date.now();

    // 3. Save Student using UID as Document ID

    await setDoc(

        doc(db, "users", user.uid),

        { ...newStudent }

    );

    // 4. Sign out (student)

    await signOut(auth);

}
    async getById(id) {

    const studentRef = doc(db, "users", id);

    const snapshot = await getDoc(studentRef);

    if (snapshot.exists()) {

        return {

            id: snapshot.id,

            ...snapshot.data()

        };

    }

    return null;

}
async assignRoom(studentId, room) {

    const studentRef = doc(db, "users", studentId);

    await updateDoc(studentRef, {

        roomId: room.id,

        roomNumber: room.roomNumber,

        blockId: room.blockId,

        blockName: room.blockName,

        updatedAt: Date.now()

    });

}

    // Get All Students
    async getAll() {

        const snapshot = await getDocs(

            collection(db, "users")

        );

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

    }

    // Update Student
    async update(id, data) {

        const studentRef = doc(

            db,
            "students",
            id

        );

        await updateDoc(studentRef, {

            ...data,

            updatedAt: Date.now()

        });

    }

    // Delete Student
    async delete(id) {

        await deleteDoc(

            doc(db, "users", id)

        );

    }

}

export default new StudentService();