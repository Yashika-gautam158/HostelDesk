import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../../../services/Studentservice";
import "./Studentdisplay.css";

export default function Studentdisplay() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadStudents();

    }, []);

    async function loadStudents() {

        try {

            const studentList = await StudentService.getAll();

            setStudents(studentList);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function deleteStudent(id) {

        const confirmDelete = window.confirm(
            "Delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await StudentService.delete(id);

            loadStudents();

        }

        catch (err) {

            console.log(err);

            alert("Unable to delete student.");

        }

    }

    const filteredStudents = students.filter(student => {

        const keyword = search.toLowerCase();

        return (

            student.name?.toLowerCase().includes(keyword) ||

            student.email?.toLowerCase().includes(keyword) ||

            student.phone?.includes(keyword)

        );

    });

    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">

                        Students

                    </h2>

                    <p className="text-muted">

                        Manage hostel students

                    </p>

                </div>

                <button

                    className="btn btn-primary"

                    onClick={() => navigate("/admin/students")}

                >

                    <i className="bi bi-plus-lg me-2"></i>

                    Add Student

                </button>

            </div>

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="metric-card metric-primary">

                        <span>Total Students</span>

                        <h2>{students.length}</h2>

                    </div>

                </div>

                <div className="col-md-9">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search by Name, Email or Phone..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

            </div>

            <div className="card shadow-sm border-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th>Student</th>

                                <th>Course</th>

                                <th>Year</th>

                                <th>Block</th>

                                <th>Room</th>

                                <th>Status</th>

                                <th className="text-center">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredStudents.length > 0 ?

                                filteredStudents.map(student => (

                                    <tr key={student.id}>

                                        <td>

                                            <div className="d-flex align-items-center">

                                                <div className="student-avatar">

                                                    {

                                                        student.name

                                                        ?.charAt(0)

                                                        .toUpperCase()

                                                    }

                                                </div>

                                                <div className="ms-3">

                                                    <div className="fw-semibold">

                                                        {student.name}

                                                    </div>

                                                    <small className="text-muted">

                                                        {student.email}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {student.course}

                                        </td>

                                        <td>

                                            {student.year}

                                        </td>

                                        <td>

                                            {

                                                student.blockName ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                student.roomNumber ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <span className="badge bg-success">

                                                {

                                                    student.status ||

                                                    "Active"

                                                }

                                            </span>

                                        </td>

                                        <td className="text-center">
<button className="btn btn-outline-info btn-sm me-2">
    <i className="bi bi-eye"></i>
</button>

<button className="btn btn-outline-primary btn-sm me-2">
    <i className="bi bi-pencil"></i>
</button>

<button
    className="btn btn-outline-success btn-sm me-2"
    onClick={() => navigate(`/admin/assign-room/${student.id}`)}
>
    <i className="bi bi-house-door"></i>
</button>

<button
    className="btn btn-outline-danger btn-sm"
    onClick={() => deleteStudent(student.id)}
>
    <i className="bi bi-trash"></i>
</button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="text-center py-5"

                                    >

                                        No students found.

                                    </td>

                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}