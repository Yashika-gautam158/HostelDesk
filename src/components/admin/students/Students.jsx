import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../../../services/Studentservice";

export default function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",

        course: "",
        year: "",

        guardianName: "",
        guardianPhone: "",

        address: ""

    });

    function handleChange(e) {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    }

    async function saveStudent(e) {

        e.preventDefault();

        if (
            student.name === "" ||
            student.email === "" ||
            student.phone === "" ||
            student.gender === "" ||
            student.course === "" ||
            student.year === ""
        ) {

            alert("Please fill all required fields.");

            return;

        }

        try {

            await StudentService.add(student);

alert(
    "Student account created successfully!\n\nPlease login again as Admin."
);

navigate("/");

            setStudent({

                name: "",
                email: "",
                   password: "",  
                phone: "",
                gender: "",

                course: "",
                year: "",

                guardianName: "",
                guardianPhone: "",

                address: ""

            });

        }

        catch (err) {

            console.log(err);

            alert("Unable to add student.");

        }

    }

    return (

        <div className="container-fluid py-4">

            <div className="student-form-card">

                <div className="student-form-header d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Add Student

                        </h2>

                        <p className="text-muted mb-0">

                            Register a new hostel student

                        </p>

                    </div>

                    <button

                        className="btn btn-outline-primary"

                        onClick={() => navigate("/admin/studentdisplay")}

                    >

                        <i className="bi bi-people-fill me-2"></i>

                        View Students

                    </button>

                </div>

                <div className="student-form-body">

                    <form onSubmit={saveStudent}>

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

                                    type="text"

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

    <label>Password</label>

    <input
        type="password"
        className="form-control"
        name="password"
        value={student.password}
        onChange={handleChange}
    />

</div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <input

                                    type="text"

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

                                    type="text"

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

                                    <option value="">Select Year</option>

                                    <option value="1st Year">1st Year</option>

                                    <option value="2nd Year">2nd Year</option>

                                    <option value="3rd Year">3rd Year</option>

                                    <option value="4th Year">4th Year</option>

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

                                    type="text"

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

                                    type="text"

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

                                    placeholder="Enter student's address"

                                    name="address"

                                    value={student.address}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="text-end">

                            <button

                                className="btn btn-primary px-4"

                                type="submit"

                            >

                                Save Student

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}