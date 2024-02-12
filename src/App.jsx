import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdAlarm, IoIosPerson } from "react-icons/io";

const App = () => {
  return (
    <div>
      <div className="py-10 mx-[10vw] lg:mx[20vw]">
        <div className="flex md:justify-between items-center flex-col md:flex-row gap-5">
          <div className="w-[150px]">
            <img src="./pammi-logo.png" alt="" />
          </div>
          <div className="flex gap-5">
            <Link to={"/register"} className="hover:underline text-lg ">
              Register Now
            </Link>
            <Link to={"/admin"} className="hover:underline text-lg ">
              Admin
            </Link>
          </div>
        </div>
        <div className="text-center md:py-10 py-5">
          <h1 className="lg:text-[4rem] md:text-[3.5rem] text-[3rem]">
            Digital Mastery <span className="text-blue-500">2024</span>
          </h1>
          <p className="text-xl text-gray-600">Craft, connect & conquer</p>
          <p className="text-xl text-gray-900 tracking-wider">
            Digital Strategy and Personal Branding for Business Executives
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-5">
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
          <div className="flex w-full flex-col-reverse md:flex-row">
            <div className="text-center py-5 flex flex-col gap-5 flex-1">
              <div>
                <h1 className="font-bold">Registration Fee</h1>
                <p>$150 </p>
              </div>

              <p>For Enquiries Contact +263772300101 </p>
              <p className="text-blue-500">
                Act Swiftly before the window closes
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center flex-col items-center ">
            <p className="text-gray-400">
              Secure Online Registration: Effortlessly register and pay online:
              Visa, MasterCard, Innbucks or Ecocash USD
            </p>

            <div className="text-center flex justify-center items-center mt-2">
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
