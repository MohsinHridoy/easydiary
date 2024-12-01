import Card from "./Card"
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
const Dashords = () => {
  return (
    <div>
      <h2 className='text-2xl mb-4'>Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <Card icon={<IoIosSend />} title="Send" value="40"/>
            <Card icon={<MdCallReceived />} title="Received" value="20"/>
            <Card icon={<MdOutlinePendingActions />} title="Pending" value="3"/>
            <Card icon={<GrCompliance />} title="Complete" value="11"/>
        </div>
    </div>
  )
}

export default Dashords
