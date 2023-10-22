import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { handleProfile, editProfile } from "../redux/action/userAction";
import Swal from "sweetalert2"

export default function EditPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [data, setData] = useState({ email: '', first_name: '', last_name: ''})

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const profile = await handleProfile();
          console.log(profile, 'ini profile di edit page');
          setUserData(profile.data);
        } catch (error) {
          console.error("Error fetching profile:", error.message);
        }
      };
    
      fetchProfile();
    }, []);
  

    function changeValue(event) {
      let { name, value } = event.target
      setData({
          ...data,
          [name]: value
      })
  }

  function handleEdit(event) {
    event.preventDefault()
    dispatch(editProfile(data))
        .then(() => {
            navigate('/akun')
            Swal.fire({
                icon: 'success',
                text: `Profile has been updated`,
              })
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
              })
        })
}

    return (
      <form onSubmit={handleEdit} className="flex flex-col items-center gap-5 mt-9">
  <div className="relative">
    <img
      src="/Profile Photo.png"
      alt="ProfilePicture"
      className="w-36 h-36"
    />
    <button className="absolute bottom-0 right-3 bg-base-100 border border-black rounded-full w-6 h-6 cursor-pointer ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4 ml-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </button>
  </div>
  
        <p className="text-3xl font-bold mb-4">
        {userData ? userData.first_name + " " + userData.last_name : "Loading..."}
        </p>
  
        <div className="w-1/2">
          <div className="flex flex-col">
            <p className="mb-2 font-bold">Email</p>
            <div className="relative mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder={userData ? userData.email : "Loading..."}
                onChange={changeValue}
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <p className="mb-2 font-bold">Nama Depan</p>
            <div className="relative mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <input
                type="text"
                name="first_name"
                placeholder={userData ? userData.first_name : "Loading..."}
                onChange={changeValue}
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <p className="mb-2 font-bold">Nama Belakang</p>
            <div className="relative mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <input
                type="text"
                name="last_name"
                placeholder={userData ? userData.last_name : "Loading..."}
                onChange={changeValue}
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="w-1/2 mt-4 p-2 font-bold text-white bg-error text-center rounded">
          Simpan
        </button>
        <Link to="/akun" className="w-1/2 mt-4 p-2 font-bold border border-error text-error bg-base-100 text-center rounded">
          Batalkan
        </Link>
      </form>
    );
  }
  