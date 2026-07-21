import "./StudentDashboard.css";

export default function StudentDashboard() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    return (

        <div className="container-fluid py-4">

            <div
                className="rounded-4 p-4 mb-4 text-white"
                style={{
                    background:
                        "linear-gradient(135deg,#606c38,#87986a)"
                }}
            >

                <h2 className="fw-bold">

                    Welcome back!

                </h2>

                <h3>

                    {currentUser?.name} 👋

                </h3>

                <p className="mb-0">

                    Manage your hostel activities from one place.

                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-6 col-xl-3">

                    <div className="metric-card">

                        <span>My Room</span>

                        <h3>

                            {currentUser?.roomNumber || "--"}

                        </h3>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="metric-card">

                        <span>Pending Fees</span>

                        <h3>

                            ₹0

                        </h3>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="metric-card">

                        <span>Complaints</span>

                        <h3>

                            0

                        </h3>

                    </div>

                </div>

                <div className="col-md-6 col-xl-3">

                    <div className="metric-card">

                        <span>Leave Status</span>

                        <h3>

                            None

                        </h3>

                    </div>

                </div>

            </div>

        </div>

    );

}