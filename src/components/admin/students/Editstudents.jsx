import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "./Studentservice";

export default function EditStudent() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [student, setStudent] = useState({

        name: "",
        email: "",
        phone: "",
        gender: "",

        course: "",
        year: "",

        guardianName: "",
        guardianPhone: "",

        address: ""

    });

    useEffect(() => {

        loadStudent();

    }, []);

    async function loadStudent() {

        try {

            const data = await StudentService.getById(id);

            if (data) {

                setStudent(data);

            }

        }

        catch (err) {

            console.log(err);

            alert("Unable to load student.");

        }

    }

    function handleChange(e) {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    }

    async function updateStudent(e) {

        e.preventDefault();

        try {

            await StudentService.update(id, student);

            alert("Student Updated Successfully!");

            navigate("/admin/studentdisplay");

        }

        catch (err) {

            console.log(err);

            alert("Unable to update student.");

        }

    }

    return (

        <div className="container-fluid py-4">

            <div className="student-form-card">

                <div className="student-form-header d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Edit Student

                        </h2>

                        <p className="text-muted mb-0">

                            Update student information

                        </p>

                    </div>

                    <button

                        className="btn btn-outline-primary"

                        onClick={() => navigate("/admin/studentdisplay")}

                    >

                        Back

                    </button>

                </div>

                <div className="student-form-body">

                    <form onSubmit={updateStudent}>

                        <div className="row">

                            <div className="col-12">

                                <h5 className="mb-3">

                                    Personal Information

                                </h5>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Full Name

                                </label>

                                <input

                                    className="form-control"

                                    name="name"

                                    value={student.name}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Email

                                </label>

                                <input

                                    type="email"

                                    className="form-control"

                                    name="email"

                                    value={student.email}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Phone

                                </label>

                                <input

                                    className="form-control"

                                    name="phone"

                                    value={student.phone}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Gender

                                </label>

                                <select

                                    className="form-select"

                                    name="gender"

                                    value={student.gender}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Gender

                                    </option>

                                    <option value="Male">

                                        Male

                                    </option>

                                    <option value="Female">

                                        Female

                                    </option>

                                    <option value="Other">

                                        Other

                                    </option>

                                </select>

                            </div>

                            <div className="col-12 mt-2">

                                <h5 className="mb-3">

                                    Academic Information

                                </h5>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Course

                                </label>

                                <input

                                    className="form-control"

                                    name="course"

                                    value={student.course}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Year

                                </label>

                                <select

                                    className="form-select"

                                    name="year"

                                    value={student.year}

                                    onChange={handleChange}

                                >

                                    <option>1st Year</option>

                                    <option>2nd Year</option>

                                    <option>3rd Year</option>

                                    <option>4th Year</option>

                                </select>

                            </div>

                            <div className="col-12 mt-2">

                                <h5 className="mb-3">

                                    Guardian Details

                                </h5>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Guardian Name

                                </label>

                                <input

                                    className="form-control"

                                    name="guardianName"

                                    value={student.guardianName}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Guardian Phone

                                </label>

                                <input

                                    className="form-control"

                                    name="guardianPhone"

                                    value={student.guardianPhone}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-12 mt-2">

                                <h5 className="mb-3">

                                    Address

                                </h5>

                            </div>

                            <div className="col-12 mb-4">

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="address"

                                    value={student.address}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="text-end">

                            <button

                                className="btn btn-success px-4"

                                type="submit"

                            >

                                Update Student

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}