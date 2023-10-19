// import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
    <div className="flex flex-col mx-44">
<div className="flex flex-row mt-9 justify-between">
  {/* mini profile */}
  <div className="flex flex-col">
    <img
      src="/Profile Photo.png"
      alt="ProfilePicture"
      className="w-16 h-16"
    />
    <h3 className="text-2xl mt-3">Selamat datang,</h3>
    <h1 className="text-3xl font-bold">Kristanto Wibowo</h1>
  </div>
  {/* saldo */}
  <div className="px-5 py-6 flex flex-col bg-[url('/Background%20Saldo.png')] bg-cover bg-center w-[670px] h-[161px]">
  <h3 className="text-white text-md mt-3">Saldo anda</h3>
  <h1 className="text-white text-3xl font-bold mt-1">Rp 0</h1>
  <h3 className="text-white text-sm mt-4">Lihat Saldo</h3>
</div>

</div>
    </div>
  );
}
