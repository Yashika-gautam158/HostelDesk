import { useEffect, useState } from "react";
import FeeService from "../../../services/FeeService";

export default function StudentFees() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [fee, setFee] = useState(null);

    useEffect(() => {

        loadFee();

    }, []);

    async function loadFee() {

        const data = await FeeService.getByStudent(
            currentUser.id
        );

        setFee(data);

    }

    if (!fee) {

        return (

            <div className="container py-5">

                <div className="alert alert-info">

                    No fee record found.

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h2 className="fw-bold">

                    Hostel Fees

                </h2>

                <p className="text-muted">

                    View your hostel fee details.

                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-6">

                    <div className="card shadow-sm border-0 rounded-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Fee Details

                            </h5>

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th>Total Fee</th>

                                        <td>₹{fee.amount}</td>

                                    </tr>

                                    <tr>

                                        <th>Paid</th>

                                        <td>₹{fee.paidAmount}</td>

                                    </tr>

                                    <tr>

                                        <th>Pending</th>

                                        <td>₹{fee.pendingAmount}</td>

                                    </tr>

                                    <tr>

                                        <th>Due Date</th>

                                        <td>{fee.dueDate}</td>

                                    </tr>

                                    <tr>

                                        <th>Status</th>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    fee.status === "Paid"
                                                        ? "bg-success"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >

                                                {fee.status}

                                            </span>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}