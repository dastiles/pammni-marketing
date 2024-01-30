import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as CryptoJS from "crypto-js";
import { decryptData } from "../utils/decryptData";
import { appwriteDatabase } from "../utils/appwrite";
import { Permission, Role } from "appwrite";

const Confirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const secretKey = "5e69d915924e4c5c9b4f7dab88dab2d5";

  const initiatePayment = () => {
    let price =
      new Date().getTime() < new Date(2024, 1, 8).getTime()
        ? Number(state.tickets) * 150
        : Number(state.tickets) * 200;
    let payment = {
      amountDetails: {
        amount: price,
        currencyCode: "USD",
      },
      reasonForPayment: "MARKETING",
      resultUrl: "https://pammni-marketing.vercel.app/result",
      returnUrl: "https://pammni-marketing.vercel.app/result",
    };
    let encryptedJson = CryptoJS.AES.encrypt(
      JSON.stringify(payment),
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16)),
      }
    ).toString();

    let payload = { payload: encryptedJson };
    fetch("https://api.pesepay.com/api/payments-engine/v1/payments/initiate", {
      method: "POST",
      headers: {
        authorization: `14579676-ec5c-456c-8b7a-f983c92e7155`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Form submitted successfully");
        return response.json();
      })
      .then((data) => {
        let decrypted = decryptData(data.payload, secretKey);
        localStorage.setItem("reference", decrypted.referenceNumber);
        appwriteDatabase
          .createDocument(
            "65b7a264bdbc83edc4e1",
            "65b7a27ba15d2a23890f",
            decrypted.referenceNumber,
            {
              fullname: state.fullname,
              email: state.email,
              phone: state.phoneNumber,
              numberOfTickets: state.tickets.toString(),
            }
          )
          .then((res) => {
            console.log("saved successfully");
            window.location.href = decrypted.redirectUrl;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // Handle errors from fetch or server
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="py-10 mx-[10vw] lg:mx[20vw]">
        <div className="flex justify-between items-center">
          <div className="w-[200px]">
            <img src="./pammi-logo.png" alt="" />
          </div>
        </div>

        <div className="w-full flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="font-bold text-4xl">Confirm Details</h1>
            <div className="w-full">
              <p className="text-balance  text-center py-5">
                Please confirm your details before before submission. These
                details will be used for generating your tickets
              </p>
            </div>
            <div className="w-full flex text-center items-center justify-center flex-col gap-2">
              <div className="w-full md:w-5/6  lg:w-3/6  flex justify-between">
                <h1 className="">Full name</h1>
                <p className="tracking-wide text-base font-bold">
                  {state.fullname}
                </p>
              </div>
              <div className="w-full md:w-5/6  lg:w-3/6  flex justify-between">
                <h1 className="">Email</h1>
                <p className="tracking-wide text-base font-bold">
                  {state.email}
                </p>
              </div>
              <div className="w-full md:w-5/6  lg:w-3/6  flex justify-between">
                <h1 className="">Phone Number</h1>
                <p className="tracking-wide text-base font-bold">
                  {state.phoneNumber}
                </p>
              </div>
              <div className="w-full md:w-5/6  lg:w-3/6  flex justify-between">
                <h1 className="">Number of Tickets</h1>
                <p className="tracking-wide text-base font-bold">
                  {state.tickets}
                </p>
              </div>
              <div className="w-full md:w-5/6  lg:w-3/6  flex justify-between">
                <h1 className="">Total Amount</h1>
                <p className="tracking-wide text-base font-bold">
                  $
                  {new Date().getTime() < new Date(2024, 1, 8).getTime()
                    ? Number(state.tickets) * 150
                    : Number(state.tickets) * 200}
                </p>
              </div>
              <div className="  flex justify-between">
                <button
                  className="bg-black w-[80vw] md:w-[60vw] lg:w-[20vw] text-white py-2 rounded"
                  onClick={initiatePayment}
                >
                  Continue To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
