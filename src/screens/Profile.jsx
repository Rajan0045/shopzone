import "./styles/profile.css";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import api from "../apis/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/user/userSlice";

function Profile() {
    const [user, setUserData] = useState({
        fullname: "",
        email: "",
        contact: "",
        picture: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const res = await api.get("/users/profile");
            if (res.data.success) {
                setUserData(res.data.user);
                if (res.data.user.image) {
                    setPreviewImage(`data:image/jpeg;base64,${res.data.user.image}`);
                }
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const updateProfile = async () => {
        try {
            setUpdating(true);
            const formData = new FormData();
            formData.append("fullname", user.fullname);
            formData.append("email", user.email);
            formData.append("contact", user.contact);
            if (imageFile) {
                formData.append("image", imageFile);
            }
            const res = await api.put("/users/update", formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            toast.success(res.data.message);
            getProfile();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: 40,
                    }}
                >
                    Loading...
                </h2>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-card">

                        <h1 className="profile-title">
                            My Profile
                        </h1>

                        <div className="profile-image-section">
                            <div className="profile-avatar-wrapper">

                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="profile"
                                        className="profile-avatar-image"
                                    />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        {user.fullname
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>
                                )}

                                <label
                                    htmlFor="profileImage"
                                    className="edit-image-btn"
                                >
                                    ✏️
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    hidden
                                />
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-form-group">
                            <label>
                                Contact Number
                            </label>
                            <input
                                type="number"
                                name="contact"
                                value={user.contact || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="profile-save-btn"
                            onClick={updateProfile}
                            disabled={updating}
                        >
                            {updating
                                ? "Updating..."
                                : "Update Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;