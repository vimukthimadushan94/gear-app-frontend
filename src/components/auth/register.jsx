import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoding] = useState(false);

  const onSubmit = async (data) => {
    setLoding(true);
    const response = await fetch(`http://localhost:8080/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoding(false);
    }
  };

  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width="180"
                        alt=""
                      />
                    </a>
                    <p className="text-center">Gear App</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          className="form-control"
                          {...register("first_name", {
                            required: "First name is required",
                          })}
                        />
                        {errors.first_name && (
                          <span style={{ color: "red" }}>
                            First name is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          className="form-control"
                          {...register("last_name", {
                            required: "Last name is required",
                          })}
                        />
                        {errors.last_name && (
                          <span style={{ color: "red" }}>
                            Last name is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          className="form-control"
                          {...register("email", {
                            required: "Name is required",
                          })}
                        />
                        {errors.email && (
                          <span style={{ color: "red" }}>
                            Email field is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                          className="form-control"
                          type="number"
                          {...register("age")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          {...register("password")}
                        />
                        {errors.password && (
                          <span style={{ color: "red" }}>
                            Password field is required
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                        disabled={loading}
                      >
                        {loading === true ? "Please Wait.." : "Sign Up"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
