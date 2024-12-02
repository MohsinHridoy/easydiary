import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../Navbar/Sidebar";
import Card from "../Card/Card"; // Assuming Card component is used for individual metrics
import { IoIosSend } from "react-icons/io";
import { MdCallReceived, MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { supabase } from "../../firebase/supabaseClient"; // Import Supabase client
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import for table support in jsPDF

const placeholderImage = "/path/to/local-placeholder.jpg";

// Your base64 encoded font string
const NotoSansBengaliBase64 = "../../fonts/NotoSansBengali-Regular.ttf"; // Replace this with your actual base64 string

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "",
    photo: placeholderImage,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase compose table
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

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('compose').select('*');
        if (error) {
          setError(error.message);
          console.error('Error fetching data:', error);
        } else {
          setData(data);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Log out handler
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


// Delete item handler
const handleDelete = async (id) => {
  try {
    const { error } = await supabase.from('compose').delete().match({ id });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: error.message,
      });
    } else {
      // Remove item from local state
      setData(data.filter(item => item.id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Item has been successfully deleted.",
      });
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while deleting the item.",
    });
  }
};


  // PDF download handler with custom Bengali font
 
const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Add the custom font (Noto Sans Bengali) to the jsPDF instance using base64 encoding
  doc.addFileToVFS("NotoSansBengali-Regular.ttf", NotoSansBengaliBase64);
  doc.addFont("NotoSansBengali-Regular.ttf", "NotoSansBengali", "normal");

  // Set the font before rendering the table
  doc.setFont("NotoSansBengali");

  // Prepare the table data
  const tableData = data.map((item, index) => [
    index + 1, 
    item.bishoy_biboron,
    item.upodeshtar_Depto,
    item.seniorSecretaryDepto,
    item.atik_SecretaryLaw,
    item.copy,
    item.bishoyShironam,
    item.preronerTarikh,
    item.bistariTo,
  ]);

  // Add the table to the document with the appropriate header and body
  doc.autoTable({
    head: [
      ['Serial', 'Subject / Description', 'Advisor Department', 'Senior Secretary Department', 'Additional Secretary (Law)', 'Copy', 'Subject Title', 'Date of Dispatch', 'Details']
    ],
    body: tableData,
    // Set the font size for the table (optional)
    theme: 'grid', 
    headStyles: { fontSize: 10 }, // Set the font size for header
    bodyStyles: { fontSize: 10 }, // Set the font size for body text
  });

  // Save the PDF
  doc.save('compose_data.pdf');
};
  // Search handler
  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Searching for:", query);
    // Implement search logic here if needed (e.g., filter `data` based on the search)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="grow ml-16 md:ml-64 lg:h-screen bg-gray-200 text-gray-900">
        {/* User info display */}
        <div className="flex items-center justify-between gap-4 p-3 border-b">
  {/* Left part for any other elements you might have, or just leave it empty */}
  
  <div className="flex-1 text-right">
    <h2 className="font-semibold text-lg">{userData.name}</h2>
    <p className="text-gray-500">{userData.email}</p>
  </div>
</div>

        {/* Dashboard Overview (Cards) */}
        <div className="gap-4 mb-6 px-4">
          <h2 className="text-2xl mb-4">Easy Diary Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4">
            <Card icon={<IoIosSend />} title="Send" value="40" />
            <Card icon={<MdCallReceived />} title="Received" value="120" />
            <Card icon={<MdOutlinePendingActions />} title="Pending" value="30" />
            <Card icon={<GrCompliance />} title="Completed" value="11" />
          </div>
        </div>

        {/* Compose Data List (Full Data) */}
        {/* <div className="px-4 overflow-x-auto">
  <h2 className="text-xl mb-4">Compose Data</h2>
  <button
    onClick={handleDownloadPDF}
    className="btn btn-primary mb-4"
  >
    Download PDF
  </button>
  <div className="overflow-x-auto shadow-md rounded-md bg-white">
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 border">ক্রমিক</th>
          <th className="px-4 py-2 border">বিষয়/বিবরণ</th>
          <th className="px-4 py-2 border">উপদেষ্টার দপ্তর</th>
          <th className="px-4 py-2 border">সিনিয়র সচিবের দপ্তর</th>
          <th className="px-4 py-2 border">অতিঃ সচিব (আইন)</th>
          <th className="px-4 py-2 border">যুগ্ন সচিব (আইন)</th>
          <th className="px-4 py-2 border">অতিঃ সচিব (শৃংখলা)</th>
          <th className="px-4 py-2 border">যুগ্ন সচিব (শৃংখলা)</th>
          <th className="px-4 py-2 border">আইন শাখাসমূহ</th>
          <th className="px-4 py-2 border">শৃংখলা শাখাসমূহ</th>
          <th className="px-4 py-2 border">সুপারিশ/মন্তব্য</th>
          <th className="px-4 py-2 border">ডায়রি নং</th>
          <th className="px-4 py-2 border">বিবিধ/অভ্যন্তরীণ দপ্তর</th>
          <th className="px-4 py-2 border">বিবিধ/বহিস্থ দপ্তর</th>
          <th className="px-4 py-2 border">সাক্ষর/সিল</th>
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className="px-4 py-2 border">{index + 1}</td>
            <td className="px-4 py-2 border">{item.bishoy_biboron}</td>
            <td className="px-4 py-2 border">{item.upodeshtar_depto}</td>
            <td className="px-4 py-2 border">{item.senior_secretary_depto}</td>
            <td className="px-4 py-2 border">{item.atik_secretary_law}</td>
            <td className="px-4 py-2 border">{item.anu_vibhag}</td>
            <td className="px-4 py-2 border">{item.jn_secretary_law}</td>
            <td className="px-4 py-2 border">{item.law_shakha}</td>
            <td className="px-4 py-2 border">{item.discipline_shakha}</td>
            <td className="px-4 py-2 border">{item.suparish_comment}</td>
            <td className="px-4 py-2 border">{item.diary_no}</td>
            <td className="px-4 py-2 border">{item.internal_depto}</td>
            <td className="px-4 py-2 border">{item.external_depto}</td>
            <td className="px-4 py-2 border">{item.signature_seal}</td>
            <td className="px-4 py-2 border">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> */}


<div className="px-4 h-full flex flex-col">
  <h2 className="text-xl mb-4">Diary Records</h2>
  {/* searchbar */}
<div className="flex  px-0 mb-4 border-l w-full">
  {/* Search Bar */}
  <div className="flex items-center flex-grow">
    <label className="input input-bordered flex items-center gap-4 w-full">
      <input
        type="text"
        placeholder="Search your letters..."
        onChange={handleSearch}
        className="input input-bordered w-full"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  </div>

  {/* Download PDF Button */}
  <button
    onClick={handleDownloadPDF}
    className="btn btn-primary ml-4"
  >
    Download PDF
  </button>
</div>


  {/* Table Wrapper */}
  <div className="flex-grow  max-h-[60vh] overflow-y-auto shadow-md rounded-md bg-white">
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 border">ক্রমিক</th>
          <th className="px-4 py-2 border">বিষয়/বিবরণ</th>
          <th className="px-4 py-2 border">উপদেষ্টার দপ্তর</th>
          <th className="px-4 py-2 border">সিনিয়র সচিবের দপ্তর</th>
          <th className="px-4 py-2 border">অতিঃ সচিব (আইন)অনুবিভাগ</th>
          <th className="px-4 py-2 border">যুগ্ন সচিব (আইন)অধিশাখা</th>
          <th className="px-4 py-2 border">অতিঃ সচিব (শৃংখলা)অনুবিভাগ</th>
          <th className="px-4 py-2 border">যুগ্ন সচিব (শৃংখলা)অধিশাখা</th>
          <th className="px-4 py-2 border">আইন শাখাসমূহ</th>
          <th className="px-4 py-2 border">শৃংখলা শাখাসমূহ</th>
          <th className="px-4 py-2 border">সুপারিশ/মন্তব্য</th>
          <th className="px-4 py-2 border">ডায়রি নং</th>
          <th className="px-4 py-2 border">বিবিধ/অভ্যন্তরীণ দপ্তর</th>
          <th className="px-4 py-2 border">বিবিধ/বহিস্থ দপ্তর</th>
          <th className="px-4 py-2 border">সাক্ষর/সিল</th>
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
          <td className="px-4 py-2 border">{index + 1}</td>
  <td className="px-4 py-2 border text-center">{item.bishoy_biboron || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.upodeshtar_depto || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.senior_secretary_depto || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.atik_secretary_law || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.anu_vibhag || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.atik_secretary_discipline || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.anu_vibhag_discipline || "-"}</td>

  <td className="px-4 py-2 border text-center">{item.law_shakha || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.discipline_shakha || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.suparish_comment || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.diary_no || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.internal_depto || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.external_depto || "-"}</td>
  <td className="px-4 py-2 border text-center">{item.signature_seal || "-"}</td>

            <td className="px-4 py-2 border">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


</div>


      </div>
    </>
  );
};

export default Dashboard;
