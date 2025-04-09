import { useState } from "react";
import { updateUserApi, updatePictureApi } from "../../api/Api";
import ProfileInfo from "./ProfileInfo";
import { Axios } from "../../api/axios";
import Cookies from "js-cookie";

export default function ProfileForm({ user, setAuth }) {
  const [formData, setFormData] = useState({ ...user });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.patch(
        `${updateUserApi}/${user._id}`,
        formData
      );
      setAuth((prev) => ({ ...prev, user: data.user }));
      Cookies.set("userData", JSON.stringify(data.user), { expires: 7 });

      setEditMode(false);
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const form_Data = new FormData();
      form_Data.append("photo", file);

      setLoading(true);
      Axios.patch(`${updatePictureApi}/${user._id}`, form_Data)
        .then((response) => {
          // setProfilePic(response.data.url); // Assuming API returns the URL of the uploaded image
          console.log(response);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="p-5 bg-light rounded-5 shadow-sm">
      <div className="mt-3 center-flex flex-column">
        <img
          src={profilePic}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        <input type="file" accept="image/*" onChange={updateProfilePicture} />
        {/* <button onClick={updateProfilePicture}>Update Profile Picture</button> */}
      </div>

      <ProfileInfo
        formData={formData}
        handleChange={handleChange}
        editMode={editMode}
      />

      {editMode ? (
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary mt-3 text-white"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
