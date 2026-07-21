import { useEffect, useState } from "react";
import FeeService from "../../../services/FeeService";
import StudentService from "../../../services/Studentservice";

export default function Adminfees() {

    const [fees, setFees] = useState([]);

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [fee, setFee] = useState({

        studentId: "",

        amount: "",

        paidAmount: "",

        dueDate: ""

    });

    useEffect(() => {

        loadStudents();

        loadFees();

    }, []);

    async function loadStudents() {

        const data = await StudentService.getAll();

        setStudents(data);

    }

    async function loadFees() {

        const data = await FeeService.getAll();

        setFees(data);

    }

    function handleChange(e) {

        setFee({

            ...fee,

            [e.target.name]: e.target.value

        });

    }

    async function saveFee(e) {

        e.preventDefault();

        const student = students.find(

            s => s.id === fee.studentId

        );

        if (!student) {

            alert("Select a student.");

            return;

        }

        await FeeService.add({

            studentId: student.id,

            studentName: student.name,

            blockName: student.blockName,

            roomNumber: student.roomNumber,

            amount: fee.amount,

            paidAmount: fee.paidAmount,

            dueDate: fee.dueDate

        });

        alert("Fee Added Successfully!");

        setFee({

            studentId: "",

            amount: "",

            paidAmount: "",

            dueDate: ""

        });

        loadFees();

    }

    const filteredFees = fees.filter(f =>

        f.studentName
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    Hostel Fees

                </h2>

                <p className="text-muted">

                    Manage student fee records.

                </p>

            </div>

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body">

                    <form onSubmit={saveFee}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Student

                                </label>

                                <select

                                    className="form-select"

                                    name="studentId"

                                    value={fee.studentId}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Student

                                    </option>

                                    {

                                        students.map(student => (

                                            <option

                                                key={student.id}

                                                value={student.id}

                                            >

                                                {student.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Total Amount

                                </label>

                                <input

                                    className="form-control"

                                    type="number"

                                    name="amount"

                                    value={fee.amount}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Paid Amount

                                </label>

                                <input

                                    className="form-control"

                                    type="number"

                                    name="paidAmount"

                                    value={fee.paidAmount}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Due Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="dueDate"

                                    value={fee.dueDate}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="text-end">

                            <button className="btn btn-success">

                                Save Fee

                            </button>

                        </div>

                    </form>

                </div>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between mb-3">

                        <h5>

                            Fee Records

                        </h5>

                        <input

                            className="form-control"

                            style={{width:"300px"}}

                            placeholder="Search Student..."

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>

                                <tr>

                                    <th>Student</th>

                                    <th>Total</th>

                                    <th>Paid</th>

                                    <th>Pending</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredFees.map(fee => (

                                        <tr key={fee.id}>

                                            <td>{fee.studentName}</td>

                                            <td>₹{fee.amount}</td>

                                            <td>₹{fee.paidAmount}</td>

                                            <td>₹{fee.pendingAmount}</td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        fee.status==="Paid"
                                                        ? "bg-success"
                                                        : "bg-warning text-dark"
                                                    }`}
                                                >

                                                    {fee.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}