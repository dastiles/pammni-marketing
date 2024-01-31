import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as CryptoJS from "crypto-js";
import { decryptData } from "../utils/decryptData";
import { account, appwriteDatabase } from "../utils/appwrite";
import { Permission, Role } from "appwrite";
import { useEffect, useState } from "react";

const Confirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const secretKey = "5e69d915924e4c5c9b4f7dab88dab2d5";

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      account.createEmailSession(state.email, "pannimarketing02");
      setUser(null);
    }
  };

  if (!user) {
    return navigate("/");
  }
  console.log(user);

  const payOffline = () => {
    appwriteDatabase
      .createDocument(
        "65b7a264bdbc83edc4e1",
        "65b7a27ba15d2a23890f",
        user.$id,
        {
          fullname: state.fullname,
          email: state.email,
          phone: state.phoneNumber,
          numberOfTickets: state.tickets.toString(),
        }
      )
      .then(() => {
        console.log("saved successfully");
        navigate("/offline");
      })
      .catch(() => {
        appwriteDatabase
          .updateDocument(
            "65b7a264bdbc83edc4e1",
            "65b7a27ba15d2a23890f",
            user.$id,
            {
              fullname: state.fullname,
              email: state.email,
              phone: state.phoneNumber,
              numberOfTickets: state.tickets.toString(),
            }
          )
          .then(() => {
            console.log("saved successfully");
            navigate("/offline");
          })
          .catch(() => {});
      });
  };
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
            user.$id,
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
              <div className="bg-slate-600 h-[1px] w-full"></div>
              <div className="  flex gap-5">
                <button
                  className="bg-black w-[40vw] md:w-[30vw] lg:w-[10vw] text-white py-2 rounded"
                  onClick={initiatePayment}
                >
                  Pay online
                </button>

                <button
                  className="bg-black w-[40vw] md:w-[30vw] lg:w-[10vw] text-white py-2 rounded"
                  onClick={payOffline}
                >
                  Pay offline
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
