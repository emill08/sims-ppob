import { useEffect, useState } from "react";
import {
  handleProfile,
  getBalance,
  fetchHistory,
} from "../redux/action/userAction";

export default function HistoryPage() {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevVisibility) => !prevVisibility);
  };

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
        console.log(profile, "ini profile");
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
        console.log(response, "ini di useEffect");
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
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate.replace("pukul", "");
  };

  const formatToIDR = (amount) => {
    if (typeof amount !== "number") {
      return "Loading...";
    }
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount);
  };

  return (
    <div className="flex flex-col mt-9 gap-3 mx-44">
      <div className="flex flex-row justify-between">
        {/* mini profile */}
        <div className="flex flex-col">
          <img
            src={userData ? userData.profile_image : "/Profile Photo.png"}
            alt="ProfilePicture"
            className="h-20"
          />
          <h3 className="text-2xl mt-3">Selamat datang,</h3>
          <h1 className="text-3xl font-bold">
            {userData
              ? userData.first_name + " " + userData.last_name
              : "Loading..."}
          </h1>
        </div>

        {/* saldo */}
        <div className="px-5 py-6 flex flex-col bg-[url('/Background%20Saldo.png')] bg-cover bg-center w-[670px] h-[161px]">
          <h3 className="text-white text-md mt-3">Saldo anda</h3>
          {isBalanceVisible ? (
            <h1 className="text-white text-3xl font-bold mt-1">
              {formatToIDR(balance ? balance.balance : "Loading...")}
            </h1>
          ) : (
            <h1 className="text-white text-3xl font-bold mt-1">●●●●●●●●</h1>
          )}
          <div className="flex items-center mt-4 mr">
            <button
              className="text-white text-sm bg-red-500"
              onClick={toggleBalanceVisibility}
            >
              {isBalanceVisible ? (
                <div className="flex items-center">
                  <p className="mr-1">Lihat Saldo</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="mr-1">Tutup Saldo</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </div>
              )}
            </button>
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
                <p
                  className={`text-xl font-bold ${
                    record.description === "Top Up Balance"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {record.description === "Top Up Balance" ? "+ Rp " : "- Rp "}
                  {new Intl.NumberFormat("id-ID").format(record.total_amount)}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {formatDate(record.created_on)}
                </p>
              </div>
              <p className="text-black text-sm font-semibold flex items-center">
                {record.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={fetchMoreHistory}
        className="flex justify-center text-error font-bold hover:scale-105"
      >
        Show More
      </button>
    </div>
  );
}
