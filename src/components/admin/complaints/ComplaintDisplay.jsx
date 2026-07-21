import { useEffect, useState } from "react";
import ComplaintService from "../../../services/ComplaintService";

export default function ComplaintDisplay(){

    const [complaints,setComplaints]=useState([]);
const [search, setSearch] = useState("");
    useEffect(()=>{

        loadComplaints();

    },[]);

    async function loadComplaints(){

        const data=await ComplaintService.getAll();

        setComplaints(data);

    }

    async function changeStatus(id,status){

        await ComplaintService.updateStatus(id,status);

        loadComplaints();

    }
    const filteredComplaints = complaints.filter(c => {

    const keyword = search.toLowerCase();

    return (

        c.studentName?.toLowerCase().includes(keyword) ||

        c.roomNumber?.toLowerCase().includes(keyword) ||

        c.category?.toLowerCase().includes(keyword)

    );

});

    return(

        <div className="container-fluid py-4">
<div className="d-flex justify-content-between align-items-center mb-4">

    <div>

        <h2 className="fw-bold">

            Complaints

        </h2>

        <p className="text-muted">

            Manage student complaints

        </p>

    </div>

</div>
<div className="row mb-4">

    <div className="col-md-3">

        <div className="metric-card metric-primary">

            <span>Total Complaints</span>

            <h2>{complaints.length}</h2>

        </div>

    </div>

    <div className="col-md-9">

        <input

            className="form-control"

            placeholder="Search by Student, Room or Category..."

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

                                    <th>Block</th>

                                    <th>Room</th>

                                    <th>Category</th>

                                    <th>Priority</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    complaints.length>0 ?
filteredComplaints.map(c=>(

                                        <tr key={c.id}>

                                            <td>{c.studentName}</td>

                                            <td>{c.blockName}</td>

                                            <td>{c.roomNumber}</td>

                                            <td>{c.category}</td>

                                           <td>

    <span
        className={`badge ${
            c.priority === "High"
                ? "bg-danger"
                : c.priority === "Medium"
                ? "bg-warning text-dark"
                : "bg-success"
        }`}
    >
        {c.priority}
    </span>

</td>

                                            <td>

                                                <select

                                                    className="form-select"

                                                    value={c.status}

                                                    onChange={(e)=>

                                                        changeStatus(

                                                            c.id,

                                                            e.target.value

                                                        )

                                                    }

                                                >

                                                    <option>

                                                        Pending

                                                    </option>

                                                    <option>

                                                        In Progress

                                                    </option>

                                                    <option>

                                                        Resolved

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

                                            No complaints found.

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