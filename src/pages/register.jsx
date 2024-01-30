import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    tickets: 1,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Form is valid, you can submit the data
      submitForm(formData);
    } else {
      // Update the state with the validation errors
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.fullname.trim()) {
      errors.fullname = "Please enter your full name";
    }
    if (!data.email.trim() || !isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.phoneNumber.trim() || !isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
    if (data.tickets <= 0) {
      errors.tickets = "Please enter a valid number of tickets";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Add your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Add your phone number validation logic here
    return /^\d{10}$/.test(phoneNumber);
  };

  const submitForm = (data) => {
    // Here you can submit the form data to your server or perform any other action
    console.log("Form submitted:", data.email.toString());

    navigate("/confirm", { state: data });
  };

  return (
    <div>
      <div className="py-10 mx-[10vw] lg:mx[20vw]">
        <div className="flex justify-between items-center">
          <div className="w-[200px]">
            <img src="./pammi-logo.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-[2rem] lg:text-[2.5rem] tracking-wider">
              Digital Mastery 2024 Registration
            </h1>
            <p className="text-md text-gray-600">
              Please fill in the form below to register for the digital Mastery
              2024
            </p>
          </div>
          <div className="w-full ">
            <form
              action=""
              className="w-full flex justify-center items-center flex-col gap-3 "
              onSubmit={handleSubmit}
            >
              <div className="full ">
                <label className="block  text-gray-700 font-bold">
                  {" "}
                  Full Name{" "}
                </label>

                <input
                  type="text"
                  id="fullname"
                  placeholder="stiles madhuku"
                  className="mt-1 w-[80vw] md:w-[60vw] lg:w-[50vw] rounded-md border-gray-200 shadow-sm "
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
                {formErrors.fullname && (
                  <p className="text-red-500">{formErrors.fullname}</p>
                )}
                <p className="py-1 text-gray-600">
                  This the name that will appear on your ticket
                </p>
              </div>
              <div className="full ">
                <label className="block  font-bold text-gray-700">
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="stiles madhuku"
                  className="mt-1 w-[80vw] md:w-[60vw] lg:w-[50vw] rounded-md border-gray-200 shadow-sm "
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div className="full ">
                <label className="block  font-bold text-gray-700">
                  {" "}
                  Phone Number{" "}
                </label>

                <input
                  type="number"
                  id="phoneNumber"
                  placeholder="0771315239"
                  className="mt-1 w-[80vw] md:w-[60vw] lg:w-[50vw] rounded-md border-gray-200 shadow-sm "
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500">{formErrors.phoneNumber}</p>
                )}
              </div>
              <div className="full ">
                <label className="block  font-bold text-gray-700">
                  {" "}
                  Number of Tickets{" "}
                </label>

                <input
                  type="number"
                  id="tickets"
                  placeholder="1"
                  className="mt-1 w-[80vw] md:w-[60vw] lg:w-[50vw] rounded-md border-gray-200 shadow-sm "
                  value={formData.tickets}
                  onChange={handleInputChange}
                />
                {formErrors.tickets && (
                  <p className="text-red-500">{formErrors.tickets}</p>
                )}
              </div>
              <div className="">
                <button className="bg-black mt-1 w-[80vw] md:w-[60vw] lg:w-[50vw] text-white py-2 rounded">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
