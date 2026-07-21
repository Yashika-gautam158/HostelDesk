import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../firebaseConfig/firebaseConfig";
import RoomService from "../../../services/Roomservice";

export default function AddRoom() {

    const navigate = useNavigate();

    const [blocks, setBlocks] = useState([]);

    const [room, setRoom] = useState({

        blockId: "",

        blockName: "",

        roomNumber: "",

        roomType: "",

        capacity: "",

        occupiedBeds: 0,

        floor: "",

        status: "Available"

    });

    useEffect(() => {

        loadBlocks();

    }, []);

    async function loadBlocks() {

        try {

            const snapshot = await getDocs(
                collection(db, "hostelblocks")
            );

            const blockList = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data()

            }));

            setBlocks(blockList);

        }

        catch (err) {

            console.log(err);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "blockId") {

            const selectedBlock = blocks.find(
                block => block.id === value
            );

            setRoom({

                ...room,

                blockId: value,

                blockName: selectedBlock.blockName

            });

            return;

        }

        setRoom({

            ...room,

            [name]:
                name === "capacity" ||
                name === "occupiedBeds"
                    ? Number(value)
                    : value

        });

    }

    async function saveRoom(e) {

        e.preventDefault();

        if (
            room.blockId === "" ||
            room.roomNumber === "" ||
            room.roomType === "" ||
            room.capacity === "" ||
            room.floor === ""
        ) {

            alert("Please fill all required fields.");

            return;

        }

        try {

            await RoomService.add(room);

            alert("Room Added Successfully!");

            setRoom({

                blockId: "",

                blockName: "",

                roomNumber: "",

                roomType: "",

                capacity: "",

                occupiedBeds: 0,

                floor: "",

                status: "Available"

            });

        }

        catch (err) {

            console.log(err);

            alert("Unable to Add Room");

        }

    }

    return (

        <div className="container-fluid py-4">

            <div className="student-form-card">

                <div className="student-form-header d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Add Room
                        </h2>

                        <p className="text-muted mb-0">
                            Create a new hostel room
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/admin/rooms")}
                    >
                        View Rooms
                    </button>

                </div>

                <div className="student-form-body">

                    <form onSubmit={saveRoom}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Hostel Block

                                </label>

                                <select
                                    className="form-select"
                                    name="blockId"
                                    value={room.blockId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Block
                                    </option>

                                    {
                                        blocks.map(block => (

                                            <option
                                                key={block.id}
                                                value={block.id}
                                            >

                                                {block.blockName}

                                            </option>

                                        ))
                                    }

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Room Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="roomNumber"
                                    value={room.roomNumber}
                                    onChange={handleChange}
                                />

                            </div>
                                                        <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Room Type
                                </label>

                                <select
                                    className="form-select"
                                    name="roomType"
                                    value={room.roomType}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Room Type
                                    </option>

                                    <option value="Single">
                                        Single
                                    </option>

                                    <option value="Double">
                                        Double
                                    </option>

                                    <option value="Triple">
                                        Triple
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="capacity"
                                    value={room.capacity}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Occupied Beds
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="occupiedBeds"
                                    value={room.occupiedBeds}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Floor
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="floor"
                                    value={room.floor}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={room.status}
                                    onChange={handleChange}
                                >

                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Occupied">
                                        Occupied
                                    </option>

                                    <option value="Maintenance">
                                        Maintenance
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="text-end">

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >

                                Save Room

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}