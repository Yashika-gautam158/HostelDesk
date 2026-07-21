import { useEffect, useState } from "react";
import StudentService from "../../../services/Studentservice";

export default function Profile() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [student, setStudent] = useState(null);

    useEffect(() => {

        loadStudent();

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

    if (!student) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Profile

                </h2>

                <p className="text-muted">

                    View your personal and hostel information.

                </p>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <h5 className="mb-4 text-success">

                        Personal Information

                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Name</strong>

                            <p>{student.name}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Email</strong>

                            <p>{student.email}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Phone</strong>

                            <p>{student.phone}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Gender</strong>

                            <p>{student.gender}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Course</strong>

                            <p>{student.course}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Year</strong>

                            <p>{student.year}</p>

                        </div>

                    </div>

                    <hr />

                    <h5 className="mb-4 text-success">

                        Hostel Information

                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Block</strong>

                            <p>{student.blockName || "-"}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Room Number</strong>

                            <p>{student.roomNumber || "-"}</p>

                        </div>

                    </div>

                    <hr />

                    <h5 className="mb-4 text-success">

                        Guardian Information

                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Guardian Name</strong>

                            <p>{student.guardianName}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Guardian Phone</strong>

                            <p>{student.guardianPhone}</p>

                        </div>

                    </div>

                    <hr />

                    <h5 className="mb-3 text-success">

                        Address

                    </h5>

                    <p>{student.address}</p>

                </div>

            </div>

        </div>

    );

}