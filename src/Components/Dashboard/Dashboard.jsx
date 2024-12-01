import  { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Dashords from "../Card/Dashords";
// import logo from "../../assets/images/logo/easy-diary.png";
import Sidebar from "../Navbar/Sidebar";
import Card from "../Card/Card";
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
// import Navbar from "../Navbar/Navbar";
const placeholderImage = "/path/to/local-placeholder.jpg";

const Dashboard = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "",
    photo: placeholderImage,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.displayName || "Guest User",
        email: user.email,
        photo: user.photoURL || placeholderImage,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to access the dashboard.",
        showConfirmButton: true,
      });
      navigate("/"); // Redirect to login if no user
    }
  }, [user, navigate]); // Update when `user` context changes

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/"); // Redirect after successful logout
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Searching for:", query);
    // Implement search logic here (e.g., make an API call)
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className='grow ml-16 md:ml-64 lg:h-screen bg-gray-200 text-gray-900'>
        {/* <Navbar></Navbar> */}
        <div>

        </div>


        {/* User info display */}
        <div className="items-center gap-4 grid grid-cols-3 p-3 grp-4 border-r-red-100">
          {/* <div> <img src={userData.photo} alt="User" className="w-16 h-16 rounded-full" /></div> */}
          <div>
            <h2 className="font-semibold text-lg">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                placeholder="Search you letters..."
                onChange={handleSearch}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <button
            onClick={handleLogOut}
            className="btn btn-danger ml-auto"
            aria-label="Log out"
          >
            Log Out
          </button>
        </div>
        <div className="grow gap-4">
        <h2 className='text-2xl mb-4 px-4'>Easy Diary Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4'>
            <Card icon={<IoIosSend />} title="Send" value="40"/>
            <Card icon={<MdCallReceived />} title="Received" value="120"/>
            <Card icon={<MdOutlinePendingActions />} title="Pending" value="30"/>
            <Card icon={<GrCompliance />} title="Completed" value="11"/>
        </div>
        </div>
      </div>
      < div>
      </div>
    </>
  );
};

export default Dashboard;
