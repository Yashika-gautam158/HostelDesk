import { Link } from "react-router-dom";

export default function Roomcard({ room, onDelete }) {

    const percentage =
        room.capacity > 0
            ? (room.occupiedBeds / room.capacity) * 100
            : 0;

    function progressColor() {

        if (percentage <= 30)
            return "bg-success";

        if (percentage <= 70)
            return "bg-warning";

        return "bg-danger";

    }

    function statusBadge() {

        if (room.status === "Available")
            return "bg-success";

        if (room.status === "Occupied")
            return "bg-danger";

        return "bg-warning text-dark";

    }

    return (

        <div className="col-lg-4 col-md-6 mb-4">

            <div className="card room-card border-0 h-100">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h4 className="fw-bold mb-0">

                            <i className="bi bi-door-open-fill me-2 text-primary"></i>

                            Room {room.roomNumber}

                        </h4>

                        <span className={`badge ${statusBadge()} px-3 py-2`}>

                            {room.status}

                        </span>

                    </div>

                    <div className="room-info">

                        <p>

                            <i className="bi bi-building me-2 text-secondary"></i>

                            <strong>Block :</strong>

                            {` ${room.blockName}`}

                        </p>

                        <p>

                            <i className="bi bi-layers-fill me-2 text-secondary"></i>

                            <strong>Floor :</strong>

                            {` ${room.floor}`}

                        </p>

                        <p>

                            <i className="bi bi-house-door-fill me-2 text-secondary"></i>

                            <strong>Room Type :</strong>

                            {` ${room.roomType}`}

                        </p>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-between mb-2">

                        <span className="fw-semibold">

                            Occupancy

                        </span>

                        <span>

                            {room.occupiedBeds}/{room.capacity}

                        </span>

                    </div>

                    <div className="progress mb-3" style={{ height: "10px" }}>

                        <div

                            className={`progress-bar ${progressColor()}`}

                            style={{

                                width: `${percentage}%`

                            }}

                        ></div>

                    </div>

                    <div className="d-flex justify-content-between text-muted">

                        <small>

                            Capacity

                        </small>

                        <small>

                            {room.capacity} Beds

                        </small>

                    </div>

                </div>

                <div className="card-footer bg-white border-0">

                    <div className="d-flex gap-2">

                        <Link

                            to={`/admin/edit-room/${room.id}`}

                            className="btn btn-outline-primary w-100"

                        >

                            <i className="bi bi-pencil-square me-2"></i>

                            Edit

                        </Link>

                        <button

                            className="btn btn-outline-danger w-100"

                            onClick={() => onDelete(room.id)}

                        >

                            <i className="bi bi-trash-fill me-2"></i>

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}