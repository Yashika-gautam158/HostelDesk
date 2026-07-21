import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomCard from "./RoomCard";
import RoomService from "../../../services/Roomservice";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadRooms();

    }, []);

    async function loadRooms() {

        try {

            const data = await RoomService.getAll();

            setRooms(data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load rooms.");

        }

    }

    async function deleteRoom(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this room?"
        );

        if (!confirmDelete) return;

        try {

            await RoomService.delete(id);

            loadRooms();

        }

        catch (err) {

            console.log(err);

            alert("Unable to delete room.");

        }

    }

    const filteredRooms = rooms.filter(room =>

        room.roomNumber
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Rooms
                    </h2>

                    <p className="text-muted">
                        Manage hostel rooms
                    </p>

                </div>

                <Link
                    to="/admin/addroom"
                    className="btn btn-primary"
                >
                    Add Room
                </Link>

            </div>

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="card shadow-sm text-center">

                        <div className="card-body">

                            <h3>{rooms.length}</h3>

                            <p className="mb-0">
                                Total Rooms
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-9">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Room Number..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="row">

                {

                    filteredRooms.length > 0 ?

                        filteredRooms.map(room => (

                            <RoomCard

                                key={room.id}

                                room={room}

                                onDelete={deleteRoom}

                            />

                        ))

                        :

                        <div className="col-12">

                            <div className="alert alert-info">

                                No rooms found.

                            </div>

                        </div>

                }

            </div>

        </div>

    );

}