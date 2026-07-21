import { useEffect, useState } from "react";
import ComplaintService from "./ComplaintService";
import StudentService from "../../../services/Studentservice";

export default function Complaints() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [student, setStudent] = useState(null);

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(false);

    const [complaint, setComplaint] = useState({

        category: "",

        priority: "Medium",

        title: "",

        description: ""

    });

    useEffect(() => {

        loadStudent();

        loadComplaints();

    }, []);

    async function loadStudent() {

        try {

            const students = await StudentService.getAll();

            const loggedStudent = students.find(

                s => s.id === currentUser.id

            );

            setStudent(loggedStudent);

        }

        catch(err){

            console.log(err);

        }

    }

    async function loadComplaints() {

        try{

            const data = await ComplaintService.getMyComplaints(

                currentUser.id

            );

            setComplaints(data);

        }

        catch(err){

            console.log(err);

        }

    }

    function handleChange(e){

        setComplaint({

            ...complaint,

            [e.target.name]:e.target.value

        });

    }

    async function submitComplaint(e){

        e.preventDefault();

        if(

            !complaint.category ||

            !complaint.title ||

            !complaint.description

        ){

            alert("Please fill all fields.");

            return;

        }

        if(!student){

            return;

        }

        try{

            setLoading(true);

            await ComplaintService.add({

                ...complaint,

                studentId:student.id,

                studentName:student.name,

                blockId:student.blockId,

                blockName:student.blockName,

                roomId:student.roomId,

                roomNumber:student.roomNumber

            });

            alert("Complaint submitted successfully!");

            setComplaint({

                category:"",

                priority:"Medium",

                title:"",

                description:""

            });

            loadComplaints();

        }

        catch(err){

            console.log(err);

            alert("Unable to submit complaint.");

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    Complaints

                </h2>

                <p className="text-muted">

                    Submit and track your hostel complaints.

                </p>

            </div>

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body">

                    <form onSubmit={submitComplaint}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <select

                                    className="form-select"

                                    name="category"

                                    value={complaint.category}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    <option>

                                        Electricity

                                    </option>

                                    <option>

                                        Water

                                    </option>

                                    <option>

                                        Internet

                                    </option>

                                    <option>

                                        Furniture

                                    </option>

                                    <option>

                                        Cleanliness

                                    </option>

                                    <option>

                                        Other

                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Priority

                                </label>

                                <select

                                    className="form-select"

                                    name="priority"

                                    value={complaint.priority}

                                    onChange={handleChange}

                                >

                                    <option>

                                        Low

                                    </option>

                                    <option>

                                        Medium

                                    </option>

                                    <option>

                                        High

                                    </option>

                                </select>

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Title

                                </label>

                                <input

                                    className="form-control"

                                    name="title"

                                    value={complaint.title}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="description"

                                    value={complaint.description}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="text-end">

                            <button

                                className="btn btn-primary"

                                disabled={loading}

                            >

                                {

                                    loading

                                    ?

                                    "Submitting..."

                                    :

                                    "Submit Complaint"

                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>
                        <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <h5 className="mb-3">

                        My Complaints

                    </h5>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>Category</th>

                                    <th>Title</th>

                                    <th>Priority</th>

                                    <th>Status</th>

                                    <th>Date</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    complaints.length > 0

                                    ?

                                    [...complaints]

                                    .reverse()

                                    .map(c => (

                                        <tr key={c.id}>

                                            <td>

                                                {c.category}

                                            </td>

                                            <td>

                                                {c.title}

                                            </td>

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

                                                <span

                                                    className={`badge ${

                                                        c.status === "Resolved"

                                                        ? "bg-success"

                                                        : c.status === "In Progress"

                                                        ? "bg-primary"

                                                        : "bg-warning text-dark"

                                                    }`}

                                                >

                                                    {c.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    c.createdAt

                                                    ?

                                                    new Date(

                                                        c.createdAt

                                                    ).toLocaleDateString()

                                                    :

                                                    "-"

                                                }

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td

                                            colSpan="5"

                                            className="text-center py-4"

                                        >

                                            No complaints submitted.

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