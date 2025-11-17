import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ImageIcon,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  Trash,
} from "lucide-react";

export default function Profile() {
  // -----------------------------
  // STATES
  // -----------------------------

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Profile Image State
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState(null);

  // Password Section State
  const [passwordData, setPasswordData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const [showPass, setShowPass] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passErrors, setPassErrors] = useState({});
  const [passSuccess, setPassSuccess] = useState("");

  // -----------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setPassErrors({ ...passErrors, [e.target.name]: "" });
  };

  // -----------------------------
  // VALIDATION
  // -----------------------------

  const validate = () => {
    let newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format.";

    if (!form.phone.trim()) newErrors.phone = "Phone number required.";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits.";

    if (!form.username.trim()) newErrors.username = "Username required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // SUBMIT BASIC INFO
  // -----------------------------

  const handleSubmit = () => {
    if (!validate()) return;

    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // -----------------------------
  // HANDLE IMAGE UPLOAD
  // -----------------------------

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images allowed!");
      return;
    }

    setProfileImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setProfileImg(null);
    setPreview(null);
  };

  // -----------------------------
  // PASSWORD VALIDATION
  // -----------------------------

  const validatePassword = () => {
    let err = {};

    if (!passwordData.oldPass.trim())
      err.oldPass = "Enter your old password.";

    if (!passwordData.newPass.trim())
      err.newPass = "Enter a new password.";
    else if (passwordData.newPass.length < 6)
      err.newPass = "Password must be at least 6 characters.";

    if (passwordData.confirmPass !== passwordData.newPass)
      err.confirmPass = "Passwords do not match.";

    setPassErrors(err);
    return Object.keys(err).length === 0;
  };

  const updatePassword = () => {
    if (!validatePassword()) return;

    setPassSuccess("Password updated successfully!");
    setTimeout(() => setPassSuccess(""), 3000);
  };

  // -----------------------------
  // UI RETURN
  // -----------------------------

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">

        {/* TITLE */}
        <div>
          <h1>Profile Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* BASIC INFO */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5" /> Basic Information
          </h2>

          {successMsg && (
            <p className="text-green-600 text-sm">{successMsg}</p>
          )}

          {/* FULL NAME */}
          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-2 mt-1"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-2 mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm">Phone Number</label>
            <input
              type="text"
              placeholder="9876543210"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-2 mt-1"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm">Username</label>
            <input
              type="text"
              placeholder="yourusername"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-2 mt-1"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Update Profile
          </button>
        </div>

        {/* PROFILE IMAGE */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5" /> Profile Picture
          </h2>

          <div className="flex items-center gap-6">
            {/* PREVIEW */}
            <div className="w-28 h-28 border rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <p className="text-gray-400 text-sm">No image</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="space-y-2">
              <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md inline-flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Upload
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>

              {preview && (
                <button
                  onClick={removeImage}
                  className="text-red-600 flex items-center gap-2"
                >
                  <Trash className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <KeyRound className="w-5 h-5" /> Change Password
          </h2>

          {passSuccess && (
            <p className="text-green-600 text-sm">{passSuccess}</p>
          )}

          {/* OLD PASSWORD */}
          <div>
            <label className="text-sm">Old Password</label>
            <div className="relative">
              <input
                type={showPass.old ? "text" : "password"}
                name="oldPass"
                placeholder="Old password"
                value={passwordData.oldPass}
                onChange={handlePasswordChange}
                className="w-full border border-gray-200 rounded-md p-2 mt-1"
              />
              <button
                type="button"
                className="absolute right-2 top-3"
                onClick={() =>
                  setShowPass({ ...showPass, old: !showPass.old })
                }
              >
                {showPass.old ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passErrors.oldPass && (
              <p className="text-red-500 text-xs">{passErrors.oldPass}</p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm">New Password</label>
            <div className="relative">
              <input
                type={showPass.new ? "text" : "password"}
                name="newPass"
                placeholder="New password"
                value={passwordData.newPass}
                onChange={handlePasswordChange}
                className="w-full border border-gray-200 rounded-md p-2 mt-1"
              />
              <button
                type="button"
                className="absolute right-2 top-3"
                onClick={() =>
                  setShowPass({ ...showPass, new: !showPass.new })
                }
              >
                {showPass.new ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passErrors.newPass && (
              <p className="text-red-500 text-xs">{passErrors.newPass}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showPass.confirm ? "text" : "password"}
                name="confirmPass"
                placeholder="Confirm new password"
                value={passwordData.confirmPass}
                onChange={handlePasswordChange}
                className="w-full border border-gray-200 rounded-md p-2 mt-1"
              />
              <button
                type="button"
                className="absolute right-2 top-3"
                onClick={() =>
                  setShowPass({
                    ...showPass,
                    confirm: !showPass.confirm,
                  })
                }
              >
                {showPass.confirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passErrors.confirmPass && (
              <p className="text-red-500 text-xs">
                {passErrors.confirmPass}
              </p>
            )}
          </div>

          <button
            onClick={updatePassword}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Update Password
          </button>
        </div>
      </div>
    </main>
  );
}
