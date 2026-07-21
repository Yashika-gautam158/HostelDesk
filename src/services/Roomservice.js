import {
    addDoc,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";
import RoomModel from "../components/admin/rooms/RoomModel";

class RoomService {

    async updateOccupiedBeds(roomId, occupiedBeds) {

    await updateDoc(
        doc(db, "rooms", roomId),
        {
            occupiedBeds: occupiedBeds,
            updatedAt: Date.now()
        }
    );

}
    // Add Room
    async add(data) {

        let newRoom = new RoomModel();

        newRoom.blockId = data.blockId;
        newRoom.blockName = data.blockName;
        newRoom.roomNumber = data.roomNumber;
        newRoom.roomType = data.roomType;
        newRoom.capacity = Number(data.capacity);
        newRoom.occupiedBeds = Number(data.occupiedBeds);
        newRoom.floor = data.floor;
        newRoom.status = data.status;
        newRoom.createdAt = Date.now();
        newRoom.updatedAt = Date.now();

        const docRef = await addDoc(
            collection(db, "rooms"),
            { ...newRoom }
        );

        return docRef;
    }

    // Get All Rooms
    async getAll() {

        const snapshot = await getDocs(collection(db, "rooms"));

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    }

    // Update Room
    async update(id, data) {

        const roomRef = doc(db, "rooms", id);

        await updateDoc(roomRef, {
            ...data,
            capacity: Number(data.capacity),
            occupiedBeds: Number(data.occupiedBeds),
            updatedAt: Date.now()
        });

    }

    // Delete Room
    async delete(id) {

        await deleteDoc(doc(db, "rooms", id));

    }
    async assignStudent(room) {

    const roomRef = doc(db, "rooms", room.id);

    const occupied = Number(room.occupiedBeds) + 1;

    await updateDoc(roomRef, {

        occupiedBeds: occupied,

        status:
            occupied >= Number(room.capacity)
                ? "Occupied"
                : "Available",

        updatedAt: Date.now()

    });

}
async getAvailableRooms(blockId) {

    console.log("Block ID:", blockId);

    const snapshot = await getDocs(
        collection(db, "rooms")
    );

    console.log("Documents found:", snapshot.docs.length);

    const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log("Rooms:", rooms);
return rooms.filter(room =>

    room.blockId === blockId &&

    Number(room.occupiedBeds) < Number(room.capacity)

);
}

}


export default new RoomService();