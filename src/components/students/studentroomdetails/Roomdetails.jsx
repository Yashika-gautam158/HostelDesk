import { useEffect, useState } from "react";
import StudentService from "../../../services/Studentservice";
import RoomService from "../../../services/Roomservice";

export default function RoomDetails() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [room, setRoom] = useState(null);

    useEffect(() => {

        loadRoom();

    }, []);

    async function loadRoom() {

        try {

            const students = await StudentService.getAll();

            const student = students.find(

                s => s.id === currentUser.id

            );

            if (!student.roomId) {

                return;

            }

            const rooms = await RoomService.getAll();

            const assignedRoom = rooms.find(

                r => r.id === student.roomId

            );

            setRoom(assignedRoom);

        }

        catch(err){

            console.log(err);

        }

    }

    if (!room) {

        return (

            <div className="container-fluid py-4">

                <div className="alert alert-warning">

                    No room assigned.

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Room

                </h2>

                <p className="text-muted">

                    View your assigned hostel room.

                </p>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <strong>Block</strong>

                            <p>{room.blockName}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Room Number</strong>

                            <p>{room.roomNumber}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Room Type</strong>

                            <p>{room.roomType}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Floor</strong>

                            <p>{room.floor}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Capacity</strong>

                            <p>{room.capacity}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Occupied Beds</strong>

                            <p>{room.occupiedBeds}</p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <strong>Status</strong>

                            <p>{room.status}</p>

                        </div>

                    </div>

                    <hr />

                    <h5 className="text-success mb-3">

                        Facilities

                    </h5>

                    {

                        room.facilities?.length > 0 ?

                        <ul>

                            {

                                room.facilities.map((facility,index)=>(

                                    <li key={index}>

                                        {facility}

                                    </li>

                                ))

                            }

                        </ul>

                        :

                        <p>

                            No facilities added.

                        </p>

                    }

                </div>

            </div>

        </div>

    );

}