import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter your email to reset the password.",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "A password reset link has been sent to your email.",
        });
        navigate("/"); // Redirect to the login page
      })
      .catch((error) => {
        console.error("Error sending reset email:", error.message);
        Swal.fire({
          icon: "error",
          title: "Failed to Send Email",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border-2 border-green-700 rounded-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-green-800"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-red-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
