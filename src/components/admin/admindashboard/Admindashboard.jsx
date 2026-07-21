import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentService from "../../../services/Studentservice";
import RoomService from "../../../services/Roomservice";
import ComplaintService from "../../../services/ComplaintService";
import LeaveService from "../../../services/LeaveService";
export default function Admindashboard() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  
  async function loadRooms() {

    const roomList = await RoomService.getAll();

    setRooms(roomList);

  }
  async function loadComplaints() {

    const complaintList =
      await ComplaintService.getAll();

    setComplaints(complaintList);

  }

  async function loadLeaveRequests() {

    const leaveList = await LeaveService.getAll();

    setLeaveRequests(leaveList);

}
  async function loadStudents() {

    const studentList = await StudentService.getAll();

    setStudents(studentList);

  }

  useEffect(() => {

    loadStudents();

    loadRooms();

    loadComplaints();

    loadLeaveRequests();

}, []);
  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">

        {/* Page Heading */}
        <div className="page-heading d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="page-heading-copy d-flex align-items-center gap-3">
            <span className="page-icon">
              <i className="bi bi-speedometer2"></i>
            </span>

            <div>
              <p className="eyebrow mb-1">Overview</p>
              <h1 className="h3 mb-1">Dashboard</h1>
              <p className="text-muted mb-0">
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="heading-actions d-flex gap-2">
            

            
          </div>
        </div>

        {/* Metric Cards */}
       <section className="row g-3 mt-3">

    {/* Total Students */}

    <div className="col-12 col-sm-6 col-xl-3">

        <article className="metric-card metric-primary">

            <div className="metric-top">

                <span className="metric-label">

                    Total Students

                </span>

            </div>

            <div className="metric-value">

                {students.length}

            </div>

            <p className="mb-0 pt-5 text-center">

                Registered Students

            </p>

        </article>

    </div>

    {/* Total Rooms */}

    <div className="col-12 col-sm-6 col-xl-3">

        <article className="metric-card metric-danger">

            <div className="metric-top">

                <span className="metric-label">

                    Total Rooms

                </span>

            </div>

            <div className="metric-value">

                {rooms.length}

            </div>

            <p className="mb-0 pt-5 text-center">

                Hostel Rooms

            </p>

        </article>

    </div>

    {/* Occupied Rooms */}

    <div className="col-12 col-sm-6 col-xl-3">

        <article className="metric-card metric-info">

            <div className="metric-top">

                <span className="metric-label">

                    Occupied Rooms

                </span>

            </div>

            <div className="metric-value">

                {

                    rooms.filter(

                        room => Number(room.occupiedBeds) > 0

                    ).length

                }

            </div>

            <p className="mb-0 pt-5 text-center">

                Rooms with Students

            </p>

        </article>

    </div>

    {/* Open Complaints */}

    <div className="col-12 col-sm-6 col-xl-3">

        <article className="metric-card metric-success">

            <div className="metric-top">

                <span className="metric-label">

                    Open Complaints

                </span>

            </div>

            <div className="metric-value">

                {

                    complaints.filter(

                        c => c.status !== "Resolved"

                    ).length

                }

            </div>

            <p className="mb-0 pt-5 text-center">

                Across All Blocks

            </p>

        </article>

    </div>

    {/* Pending Leave Requests */}

    <div className="col-12 col-sm-6 col-xl-3">

        <article className="metric-card metric-warning">

            <div className="metric-top">

                <span className="metric-label">

                    Pending Leaves

                </span>

            </div>

            <div className="metric-value">

                {

                    leaveRequests.filter(

                        leave => leave.status === "Pending"

                    ).length

                }

            </div>

            <p className="mb-0 pt-5 text-center">

                Awaiting Approval

            </p>

        </article>

    </div>

</section>

        {/* Bottom Section */}
        <section className="row g-3 mt-3">

          {/* Recent Users */}
          <div className="col-12 col-xl-8">

            <section className="panel h-100">

              <div className="panel-header d-flex justify-content-between align-items-center">

                <div>
                  <h2 className="h5 mb-1 section-title">
                    <i className="bi bi-people me-2"></i>
                    Recent Students
                  </h2>

                  <p className="text-muted mb-0">
                    Latest registered students.
                  </p>
                </div>

                <button className="btn btn-outline-secondary btn-sm">
                  Manage Students
                </button>

              </div>

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead>
                    <tr>
                      <th>Student</th>

                      <th>Course</th>

                      <th>Year</th>

                      <th>Status</th>

                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>

                    {

                      students

                        .slice()

                        .sort(

                          (a, b) =>

                            b.createdAt - a.createdAt

                        )

                        .slice(0, 5)

                        .map(student => (

                          <tr key={student.id}>

                            <td>

                              <div>

                                <p className="fw-semibold mb-0">

                                  {student.name}

                                </p>

                                <p className="text-muted small mb-0">

                                  {student.email}

                                </p>

                              </div>

                            </td>

                            <td>

                              {student.course}

                            </td>

                            <td>

                              {student.year}

                            </td>

                            <td>

                              <span className="badge bg-success">

                                Active

                              </span>

                            </td>

                            <td>

                              {

                                new Date(

                                  student.createdAt

                                ).toLocaleDateString()

                              }

                            </td>

                            <td className="text-end">

                              <Link
    to={`/admin/studentdetails/${student.id}`}
    className="btn btn-light btn-sm"
>
    View
</Link>

                            </td>

                          </tr>

                        ))

                    }

                  </tbody>
                </table>

              </div>

            </section>

          </div>
          <div className="col-12 col-xl-4">
            <div className="panel h-100">

              <div className="panel-header">
                <h2 className="h5 mb-1">Recent Complaints</h2>
                <p className="text-muted mb-0">
                  Latest hostel complaints
                </p>
              </div>

              <div className="activity-list">

                {

                  complaints

                    .slice()

                    .sort(

                      (a, b) =>

                        b.createdAt - a.createdAt

                    )

                    .slice(0, 5)

                    .map(c => (

                      <div
                        key={c.id}
                        className="activity-item"
                      >

                        <span
                          className={`activity-dot ${c.status === "Resolved"
                              ? "bg-success"
                              : c.status === "In Progress"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                        ></span>

                        <div>

                          <p className="mb-1 fw-semibold">

                            {c.title}

                          </p>

                          <p className="text-muted small mb-0">

                            {c.studentName}

                            {" • "}

                            Room {c.roomNumber}

                          </p>

                        </div>

                      </div>

                    ))

                }

              </div>
            </div>
          </div>

        </section>

      </div>

    </main>
  );
}

