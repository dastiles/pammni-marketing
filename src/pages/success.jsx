import { Link, useNavigate } from "react-router-dom";
import { decryptData } from "../utils/decryptData";
import { useEffect, useState } from "react";
import { appwriteDatabase } from "../utils/appwrite";

const Success = () => {
  const navigate = useNavigate();
  const reference = localStorage.getItem("reference") || null;
  const secretKey = "5e69d915924e4c5c9b4f7dab88dab2d5";
  const [referencedata, setReferenceData] = useState({});

  if (!reference) {
    navigate("/");
  }
  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = () => {
    fetch(
      `https://api.pesepay.com/api/payments-engine/v1/payments/check-payment?referenceNumber=${reference}`,
      {
        method: "GET",
        headers: {
          authorization: `14579676-ec5c-456c-8b7a-f983c92e7155`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Form submitted successfully");
        return response.json();
      })
      .then((data) => {
        let decrypted = decryptData(data.payload, secretKey);
        setReferenceData(decrypted);
        console.log(decrypted, "real data");
        appwriteDatabase
          .updateDocument(
            "65b7a264bdbc83edc4e1",
            "65b7a27ba15d2a23890f",
            decrypted.referenceNumber,
            {
              amountPaid:
                decrypted.transactionStatus === "SUCCESS"
                  ? referencedata.amountDetails.amount.toString()
                  : "0",
              paidStatus:
                decrypted.transactionStatus === "SUCCESS" ? true : false,
              transactionsStatus: decrypted.transactionStatus,
            }
          )
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // Handle errors from fetch or server
        console.error("Error:", error);
      });
  };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isObjEmpty(referencedata)) {
    return <p>waiting for data</p>;
  }

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
            <h1 className="font-bold text-4xl">Transactions Details</h1>
            <div className="w-full">
              <p className="text-balance  text-center py-5"></p>
            </div>
            <div className="w-full flex text-center items-center justify-center flex-col gap-2">
              <div className="w-5/6  lg:w-4/6  flex justify-between">
                <h1 className="">Transaction Amount</h1>
                <p className="tracking-wide text-base font-bold">
                  {" "}
                  {referencedata.amountDetails.amount}
                </p>
              </div>
              <div className="w-5/6  lg:w-4/6  flex justify-between">
                <h1 className="">Transaction Status</h1>
                <p className="tracking-wide text-base font-bold">
                  {referencedata.transactionStatus}
                </p>
              </div>
              <div className="w-5/6  lg:w-4/6  flex justify-between">
                <h1 className="">Transaction Description</h1>
                <p className="tracking-wide text-base font-bold">
                  {referencedata.transactionStatusDescription}
                </p>
              </div>
              <div className="w-5/6  lg:w-4/6  flex justify-between">
                <Link to={"/"}>
                  <button className="bg-black w-[50vw] text-white py-2 rounded">
                    Continue To Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
