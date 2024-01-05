import FileUploader from "../utils/FileUploader";

export default function MyProfile() {
  return (
    <div class="container-fluid">
      <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Profile Update</h5>
            <div class="card">
              <div class="card-body">
                <form>
                  <FileUploader />
                  <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" />
                    <div class="form-text">First name is required</div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" />
                    <div class="form-text">Last name is required</div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Age</label>
                    <input type="number" class="form-control" />
                    <div class="form-text">Age is required</div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
