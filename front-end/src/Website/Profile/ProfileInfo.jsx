export default function ProfileInfo({ formData, handleChange, editMode }) {
  return (
    <div className="row g-3 mt-4">
      {["name", "email", "password", "gender", "age", "country"].map(
        (field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        )
      )}
    </div>
  );
}
