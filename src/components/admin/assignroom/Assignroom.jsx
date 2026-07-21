import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "../../../services/Studentservice";
import RoomService from "../../../services/Roomservice";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig'

export default function AssignRoom() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const [blocks, setBlocks] = useState([]);

    const [rooms, setRooms] = useState([]);

    const [selectedBlock, setSelectedBlock] = useState("");

    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {

        loadStudent();

        loadBlocks();

    }, []);

    async function loadStudent() {

        const data = await StudentService.getById(id);

        setStudent(data);

    }

    async function loadBlocks() {

        const snapshot = await getDocs(
            collection(db, "hostelblocks")
        );

        const blockList = snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

        }));

        setBlocks(blockList);

    }

   async function handleBlockChange(e) {

    const blockId = e.target.value;

    setSelectedBlock(blockId);

    const availableRooms =
        await RoomService.getAvailableRooms(blockId);

    setRooms(availableRooms);

    setSelectedRoom(null);

}

    function handleRoomChange(e) {

        const room = rooms.find(
            r => r.id === e.target.value
        );

        setSelectedRoom(room);

    }

    async function assignRoom(e) {

        e.preventDefault();

        if (!selectedRoom) {

            alert("Please select a room.");

            return;

        }

        try {

            await StudentService.assignRoom(

                student.id,

                selectedRoom

            );

            await RoomService.assignStudent(

                selectedRoom

            );

            alert("Room Assigned Successfully!");

            navigate("/admin/studentdisplay");

        }

        catch (err) {

            console.log(err);

            alert("Unable to assign room.");

        }

    }

    if (!student) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container py-4">

            <div className="student-form-card">

                <div className="student-form-header">

                    <h2>

                        Assign Room

                    </h2>

                    <p>

                        Assign hostel room to student

                    </p>

                </div>

                <div className="student-form-body">

                    <form onSubmit={assignRoom}>

                        <div className="mb-4">

                            <label className="form-label">

                                Student

                            </label>

                            <input

                                className="form-control"

                                value={student.name}

                                disabled

                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Hostel Block

                            </label>

                           <select
    className="form-select"
    value={selectedBlock}
    onChange={(e) => {
    console.log("Block changed");
    console.log(e.target.value);
    handleBlockChange(e);
}}
>
    <option value="">Select Block</option>

    {blocks.map(block => (
        <option
            key={block.id}
            value={block.id}
        >
            {block.blockName}
        </option>
    ))}
</select>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Available Rooms

                            </label>

                            <select

                                className="form-select"

                                onChange={handleRoomChange}

                            >

                                <option>

                                    Select Room

                                </option>

                                {

                                    rooms.map(room => (

                                        <option
    key={room.id}
    value={room.id}
>
    {room.blockName} - {room.roomNumber}
</option>

                                    ))

                                }

                            </select>

                        </div>

                        {

                            selectedRoom && (

                                <div className="alert alert-light border">

                                    <p>

                                        <strong>

                                            Room Type:

                                        </strong>

                                        {" "}

                                        {selectedRoom.roomType}

                                    </p>

                                    <p>

                                        <strong>

                                            Floor:

                                        </strong>

                                        {" "}

                                        {selectedRoom.floor}

                                    </p>

                                    <p>

                                        <strong>

                                            Capacity:

                                        </strong>

                                        {" "}

                                        {selectedRoom.capacity}

                                    </p>

                                    <p>

                                        <strong>

                                            Occupied Beds:

                                        </strong>

                                        {" "}

                                        {selectedRoom.occupiedBeds}

                                    </p>

                                    <p>

                                        <strong>

                                            Available Beds:

                                        </strong>

                                        {" "}

                                        {

                                            Number(selectedRoom.capacity)

                                            -

                                            Number(selectedRoom.occupiedBeds)

                                        }

                                    </p>

                                </div>

                            )

                        }

                        <div className="text-end">

                            <button

                                className="btn btn-success"

                            >

                                Assign Room

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}