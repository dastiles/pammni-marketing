import { useEffect, useMemo, useState } from "react";
import { appwriteDatabase, client } from "../utils/appwrite";
import DataTable from "react-data-table-component";
import { CSVDownload, CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [clients, setClients] = useState();
  let newData;
  const navigate = useNavigate();
  const columns = [
    {
      name: "Fullname",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Paid Status",
      selector: (row) => row.paidStatus,
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amountPaid,
      sortable: true,
    },
    {
      name: "Number of Tickets",
      selector: (row) => row.numberOfTickets,
      sortable: true,
    },

    {
      name: "Bank Account",
      selector: (row) => row.bank_account,
      sortable: true,
    },
    {
      name: "Transaction Type",
      selector: (row) => row.transactionType,
      sortable: true,
    },
    {
      name: "Transaction Online Status",
      selector: (row) => row.transactionsStatus,
      sortable: true,
    },
  ];

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    appwriteDatabase
      .listDocuments("65b7a264bdbc83edc4e1", "65b7a27ba15d2a23890f")
      .then((res) => {
        setClients(res);
      })
      .catch((error) => {
        navigate("/");
        console.error("Error fetching data:", error);
      });
  };

  if (!clients) {
    return <p>fetching data</p>;
  }

  newData = clients.documents.map((item) => ({
    fullname: item.fullname,
    email: item.email,
  }));
  console.log(newData);
  return (
    <div className="py-10 mx-[10vw] lg:mx[20vw]">
      <div className="flex justify-between items-center">
        <div className="w-[200px]">
          <img src="./pammi-logo.png" alt="" />
        </div>
      </div>
      <div className="full flex justify-end mt-5">
        <CSVLink
          data={newData}
          filename={"my-file.csv"}
          className="bg-gray-900 text-white px-5 py2 rounded"
          target="_blank"
        >
          Download
        </CSVLink>
      </div>

      <DataTable
        title="Registered Users"
        columns={columns}
        data={clients.documents}
      />
    </div>
  );
};

export default Admin;
