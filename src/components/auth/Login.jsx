import { useForm } from "react-hook-form";
import logo from "../../assets/images/logos/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogin } from "../../features/auth/authActions";

export default function Login() {
  const { loading, userInfo, errorMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
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
                  {errorMessage ? (
                    <div class="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  ) : (
                    ""
                  )}
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img src={logo} width="180" alt="" />
                  </a>
                  <p className="text-center">Welcome to Gear</p>
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        {...register("email")}
                      />
                      {errors.email && (
                        <span style={{ color: "red" }}>
                          Email field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        {...register("password")}
                      />
                      {errors.password && (
                        <span style={{ color: "red" }}>
                          Password field is required
                        </span>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <a className="text-primary fw-bold" href="./index.html">
                        Forgot Password ?
                      </a>
                    </div>
                    <button className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                      {loading ? "Please Wait.." : "Sign In"}
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                      <a
                        className="text-primary fw-bold ms-2"
                        href="./authentication-register.html"
                      >
                        Create an account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
