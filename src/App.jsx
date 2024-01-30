import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdAlarm, IoIosPerson } from "react-icons/io";

const App = () => {
  return (
    <div>
      <div className="py-10 mx-[10vw] lg:mx[20vw]">
        <div className="flex justify-between items-center">
          <div className="w-[150px]">
            <img src="./pammi-logo.png" alt="" />
          </div>
          <div>
            <Link to={"/register"} className="hover:underline text-lg ">
              Register Now
            </Link>
          </div>
        </div>
        <div className="text-center py-10">
          <h1 className="text-[4rem]">
            Digital Mastery <span className="text-blue-500">2024</span>
          </h1>
          <p className="text-xl text-gray-600">Craft, connect & conquer</p>
          <p className="text-xl text-gray-900 tracking-wider">
            Digital Strategy and Personal Branding for Business Executives
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 place-content-center gap-5">
            <div className="border-[0.5px] border-gray-400 flex items-center gap-5 rounded py-4 px-5">
              <FaLocationDot className="text-gray-900 text-2xl" />
              <div>
                <h1 className="font-bold">Location</h1>
                <p>Ezulwini Villa Hotel Boutique</p>
              </div>
            </div>
            <div className="border-[0.5px] border-gray-400 flex items-center gap-5 rounded py-4 px-5">
              <FaCalendarAlt className="text-gray-900 text-2xl" />
              <div>
                <h1 className="font-bold">Date</h1>
                <p>22 February 2024</p>
              </div>
            </div>
            <div className="border-[0.5px] border-gray-400 flex items-center gap-5 rounded py-4 px-5">
              <IoMdAlarm className="text-gray-900 text-2xl" />
              <div>
                <h1 className="font-bold">Morning Session</h1>
                <p>9 a.m to 12 pm</p>
              </div>
            </div>
            <div className="border-[0.5px] border-gray-400 flex items-center gap-5 rounded py-4 px-5">
              <IoIosPerson className="text-gray-900 text-2xl" />
              <div>
                <h1 className="font-bold">One-on-One</h1>
                <p>1 p.m to 4 p.m</p>
              </div>
            </div>
          </div>
          <div className="text-center py-5 flex flex-col gap-5">
            <div>
              <h1 className="font-bold">Early Bird Access</h1>
              <p>$150 before 8 February 2024</p>
            </div>
            <div>
              <h1 className="font-bold">Late Registrations</h1>
              <p>$200 after 8 February 2024</p>
            </div>
            <p className="text-blue-500">
              Act Swiftly before the window closes
            </p>

            <p className="text-gray-400">
              Secure Online Registration: Effortlessly register and pay online:
              Visa, MasterCard, Innbucks or Ecocash USD
            </p>
            <div className="text-center flex justify-center items-center">
              <Link to={"/register"} className="block">
                <div className="bg-black text-white w-[150px] py-2 rounded">
                  Register Now
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
