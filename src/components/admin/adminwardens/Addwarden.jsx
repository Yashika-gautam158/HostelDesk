import { useState } from "react";
import './warden.css'

export default function AddWarden() {

  const [warden, setWarden] = useState({
    name: "",
    email: "",
    phone: "",
    block: "",
    wardenId: "",
  });

  function handleChange(e) {
    setWarden({
      ...warden,
      [e.target.name]: e.target.value,
    });
  }

  function saveWarden(e) {
    e.preventDefault();

    console.log(warden);

    
  }

  return (
    <div className="container py-4">

      <div className="card shadow-sm border-0 rounded-4">

        <div className="card-header bg-white py-3">
          <h3 className="mb-0 fw-bold">Add Warden</h3>
        </div>

        <div className="card-body">

          <form onSubmit={saveWarden}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  value={warden.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={warden.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="+91"
                  name="phone"
                  value={warden.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Assigned Block
                </label>

                <select
                  className="form-select"
                  name="block"
                  value={warden.block}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Block</option>
                  <option>Block A</option>
                  <option>Block B</option>
                  <option>Block C</option>
                  <option>Block D</option>
                </select>

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label">
                  Warden ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="WAR-A001"
                  name="wardenId"
                  value={warden.wardenId}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="text-end">

              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                Save Warden
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}