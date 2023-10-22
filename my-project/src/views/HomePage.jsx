// import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleProfile, getBalance } from "../redux/action/userAction";

export default function HomePage() {
  const [userData, setUserData] = useState(null)
  const [balance, setBalance] = useState(0)

  // loop menu icon
  const startNumber = 1;
  const endNumber = 12;

  const menuIcon = [];

  for (let i = startNumber; i <= endNumber; i++) {
    menuIcon.push(
      <Link to="/payment" className="hover:scale-125">
        <img
          src={`/menu (${i}).png`}
          key={i}
          alt="menuIcon"
          className="w-24 h-24"
        />
      </Link>
    );
  }

  // looping banner
  const currentNumber = 1;
  const lastNumber = 5;
  const bannerPromo = [];

  for (let i = currentNumber; i <= lastNumber; i++) {
    bannerPromo.push(
      <div className="carousel-item" key={i}>
        <img
          src={`/Banner ${i}.png`}
          alt={`Banner ${i}`}
          className="rounded-box"
        />
      </div>
    );
  }
  
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
  

    return (
    <div className="flex flex-col mt-9 gap-3 mx-44">
      <div className="flex flex-row justify-between">
        {/* mini profile */}
        <div className="flex flex-col">
          <img
            src={userData ? userData.profile_image : '/Profile Photo.png'}
            // src="{userData.profile}"
            alt="ProfilePicture"
            className="w-16 h-16"
          />
          <h3 className="text-2xl mt-3">Selamat datang,</h3>
          <h1 className="text-3xl font-bold">
  {userData ? userData.first_name + " " + userData.last_name : "Loading..."}
</h1>
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
      <div className="flex flex-row justify-between mt-11">{menuIcon}</div>
      <p className="font-bold mt-5">Temukan promo menarik</p>
      <div className="carousel carousel-center space-x-16 rounded-box">
        {bannerPromo}
      </div>
      {/* <button onClick={handleProfile} className="flex justify-center">test</button> */}
    </div>
  );
}
