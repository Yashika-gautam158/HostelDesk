import { useEffect, useState } from "react";
import LeaveService from "../../../services/LeaveService";

export default function LeaveRequests() {

    const [leaves, setLeaves] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        const data = await LeaveService.getAll();

        setLeaves(data);

    }

    async function changeStatus(id, status) {

        await LeaveService.updateStatus(id, status);

        loadLeaves();

    }

    const filteredLeaves = leaves.filter(item => {

        const keyword = search.toLowerCase();

        return (

            item.studentName?.toLowerCase().includes(keyword) ||

            item.roomNumber?.toLowerCase().includes(keyword)

        );

    });

    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Leave Requests

                    </h2>

                    <p className="text-muted">

                        Manage student leave requests

                    </p>

                </div>

            </div>

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="metric-card metric-primary">

                        <span>Total Requests</span>

                        <h2>{leaves.length}</h2>

                    </div>

                </div>

                <div className="col-md-9">

                    <input

                        className="form-control"

                        placeholder="Search student or room..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>

                                <tr>

                                    <th>Student</th>

                                    <th>Room</th>

                                    <th>From</th>

                                    <th>To</th>

                                    <th>Reason</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredLeaves.length > 0 ?

                                    filteredLeaves.map(item => (

                                        <tr key={item.id}>

                                            <td>{item.studentName}</td>

                                            <td>{item.roomNumber}</td>

                                            <td>{item.fromDate}</td>

                                            <td>{item.toDate}</td>

                                            <td>{item.reason}</td>

                                            <td>

                                                <select

                                                    className="form-select"

                                                    value={item.status}

                                                    onChange={(e)=>

                                                        changeStatus(

                                                            item.id,

                                                            e.target.value

                                                        )

                                                    }

                                                >

                                                    <option>

                                                        Pending

                                                    </option>

                                                    <option>

                                                        Approved

                                                    </option>

                                                    <option>

                                                        Rejected

                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >

                                            No leave requests found.

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