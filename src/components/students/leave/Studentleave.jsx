import { useEffect, useState } from "react";
import LeaveService from "./LeaveService";
import StudentService from "../../../services/Studentservice";

export default function Studentleave() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [student, setStudent] = useState(null);

    const [leave, setLeave] = useState({

        fromDate: "",

        toDate: "",

        reason: ""

    });

    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {

        loadStudent();

        loadLeaves();

    }, []);

    async function loadStudent() {

        const data = await StudentService.getById(currentUser.id);

        setStudent(data);

    }

    async function loadLeaves() {

        const data = await LeaveService.getMyLeaves(currentUser.id);

        setLeaveRequests(data);

    }

    function handleChange(e) {

        setLeave({

            ...leave,

            [e.target.name]: e.target.value

        });

    }

    async function submitLeave(e) {

        e.preventDefault();

        if (!student) {

            alert("Student not found.");

            return;

        }

        try {

            await LeaveService.add({

                ...leave,

                studentId: student.id,

                studentName: student.name,

                blockName: student.blockName,

                roomNumber: student.roomNumber

            });

            alert("Leave request submitted!");

            setLeave({

                fromDate: "",

                toDate: "",

                reason: ""

            });

            loadLeaves();

        }

        catch (err) {

            console.log(err);

            alert("Unable to submit leave request.");

        }

    }

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    Leave Requests

                </h2>

                <p className="text-muted">

                    Apply for hostel leave and track your requests.

                </p>

            </div>

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body">

                    <form onSubmit={submitLeave}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    From Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="fromDate"

                                    value={leave.fromDate}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    To Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="toDate"

                                    value={leave.toDate}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Reason

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="reason"

                                    value={leave.reason}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="text-end">

                            <button

                                className="btn btn-primary"

                                type="submit"

                            >

                                Submit Leave Request

                            </button>

                        </div>

                    </form>

                </div>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <h5 className="mb-3">

                        My Leave Requests

                    </h5>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>

                                <tr>

                                    <th>From</th>

                                    <th>To</th>

                                    <th>Reason</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    leaveRequests.length > 0 ?

                                    leaveRequests.map(item => (

                                        <tr key={item.id}>

                                            <td>{item.fromDate}</td>

                                            <td>{item.toDate}</td>

                                            <td>{item.reason}</td>

                                            <td>

                                                <span className={`badge ${

                                                    item.status === "Approved"

                                                    ? "bg-success"

                                                    : item.status === "Rejected"

                                                    ? "bg-danger"

                                                    : "bg-warning text-dark"

                                                }`}>

                                                    {item.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td

                                            colSpan="4"

                                            className="text-center py-4"

                                        >

                                            No leave requests submitted.

                                        </td>

                                    </tr>

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}