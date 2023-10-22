import { useEffect, useState } from "react";
import { handleProfile, getBalance, fetchHistory } from "../redux/action/userAction";

export default function HistoryPage() {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchMoreHistory = async () => {
    try {
      const response = await fetchHistory(offset, limit);
      setHistory([...history, ...response.data.records]);
      setOffset(offset + limit);
    } catch (error) {
      console.error("Error fetching more history:", error.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await handleProfile();
        console.log(profile, 'ini profile');
        setUserData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        console.log(response, 'ini di useEffect');
        setBalance(response.data);
      } catch (error) {
        console.error("Error di useEffect:", error.message);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    fetchMoreHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString("id-ID", options);
    return formattedDate.replace("pukul", "");
  };

  return (
    <div className="flex flex-col mt-9 gap-3 mx-44">
      <div className="flex flex-row justify-between">
        {/* mini profile */}
        <div className="flex flex-col">
          <img
            src="/Profile Photo.png"
            alt="ProfilePicture"
            className="w-16 h-16"
          />
          <h3 className="text-2xl mt-3">Selamat datang,</h3>
          <h1 className="text-3xl font-bold">{userData ? userData.first_name + " " + userData.last_name : "Loading..."}</h1>
        </div>

        {/* saldo */}
        <div className="px-5 py-6 flex flex-col bg-[url('/Background%20Saldo.png')] bg-cover bg-center w-[670px] h-[161px]">
          <h3 className="text-white text-md mt-3">Saldo anda</h3>
          <h1 className="text-white text-3xl font-bold mt-1">Rp {balance ? balance.balance : "Loading..."}</h1>
          <div className="flex items-center mt-4 mr">
            <h3 className="text-white text-sm">Lihat Saldo</h3>
          </div>
        </div>
      </div>

      {/* history */}
      <div className="mt-11 flex flex-col">
        <p className="font-bold text-xl">Semua Transaksi</p>
        <div className="mt-8 w-full">
          {history.map((record, index) => (
            <div
              key={index}
              className={`mb-8 border border-gray-200 rounded-xl px-4 p-2 flex justify-between`}
            >
              <div>
                <p className={`text-xl font-bold ${record.description === "Top Up Balance" ? "text-green-500" : "text-red-500"}`}>
                  {record.description === "Top Up Balance" ? "+ Rp " : "- Rp "}
                  {new Intl.NumberFormat("id-ID").format(record.total_amount)}
                </p>
                <p className="text-gray-400 text-sm mt-2">{formatDate(record.created_on)}</p>
              </div>
              <p className="text-black text-sm font-semibold flex items-center">{record.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={fetchMoreHistory} className="flex justify-center text-error font-bold hover:scale-105">
        Show More
      </button>
    </div>
  );
}
