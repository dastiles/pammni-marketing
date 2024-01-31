import { useEffect, useState } from "react";
import { account, appwriteDatabase } from "../utils/appwrite";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Offline = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [tickets, setTickets] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  console.log(user);

  const submit = () => {
    console.log(user, "inside submit");

    if (accountNumber === "" || amount === "" || tickets === "" || !user) {
      console.log("eye");
      return;
    }

    appwriteDatabase
      .updateDocument(
        "65b7a264bdbc83edc4e1",
        "65b7a27ba15d2a23890f",
        user.$id,
        {
          transactionType: "Offline",
          bank_account: accountNumber,
          amountPaid: amount,
          numberOfTickets: tickets,
        }
      )
      .then(() => {
        toast.success("Thank you for paying");
        navigate("/");
      })
      .catch(() => {
        toast.error("OOPs something went wrong");
      });
  };
  return (
    <div>
      <div className="py-10 mx-[10vw] lg:mx[20vw]">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <div className="w-[200px]">
              <img src="./pammi-logo.png" alt="" />
            </div>
          </Link>
        </div>

        <div className="w-full flex items-center justify-center pt-16 flex-col">
          <div className="text-center">
            <h1 className="font-bold text-4xl">Use Details below to pay</h1>
            <div className="w-full">
              <p className="text-balance  text-center py-5">
                Please confirm your details before before submission. These
                details will be used for generating your tickets
              </p>
            </div>
          </div>
          <div className="w-full md:w-4/6 lg:w-3/6  flex justify-center flex-col items-center gap-10">
            <div className=" w-full border-[0.5px] border-gray-400 flex flex-col items-center gap-5 rounded py-4 px-5">
              <div>
                <h1 className="font-bold text-md">Banking Details</h1>
                <p>
                  <span className="font-semibold">
                    Nostro Account Details Bank
                  </span>
                  : CBZ Branch: SELOUS AVE A/C{" "}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Name</span>: NO WALLS MEDIA
                  (PVT) LTD A/C No: 02125655390022
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Swift Code</span>:COBZZWHAXXX
                </p>
              </div>
              <div className="w-full px-10">
                <p className="font-bold py-2">
                  Submit you account number below if u have already paid
                </p>
                <div className="w-full flex flex-col gap-4">
                  <input
                    type="text"
                    className="border-[1px] border-gray-500 py-2 w-full"
                    placeholder=" Enter Amount $150"
                    onChange={(value) => setAmount(value.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Tickets 1"
                    className="border-[1px] border-gray-500 py-2 w-full"
                    onChange={(value) => setTickets(value.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Account Name"
                    className="border-[1px] border-gray-500 py-2 w-full"
                    onChange={(value) => setAccountNumber(value.target.value)}
                  />
                  <button
                    className="bg-black  w-full text-white py-2 rounded mt-2"
                    onClick={submit}
                  >
                    Submit Details
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full border-[0.5px] border-gray-400 flex flex-col items-center gap-5 ">
              <div className="w-full">
                <div className="">
                  <img src="./innbucks.jpg" alt="" />
                </div>

                <div className="text-center text-xl py-5">
                  Account Number:{" "}
                  <span className="font-semibold">+263778793029</span>
                </div>
              </div>
            </div>

            <div className="w-full border-[0.5px] border-gray-400 flex flex-col items-center gap-5 justify-center text-center">
              <h1 className="font-bold">Other Payment Details</h1>
              <p>Please Contact +263772300101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
