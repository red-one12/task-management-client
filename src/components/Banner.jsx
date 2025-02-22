import banner from '../assets/image/banner.png';

const Banner = () => {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute"></div>

      {/* Content inside the banner */}
      <div className="relative text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4 text-black">Welcome to Our <span className='text-yellow-500'>Task Manager</span></h1>
        <p className="text-lg mb-6 text-gray-600">Organize your tasks efficiently and stay productive.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg">
          Add Your First Task
        </button>
      </div>
    </div>
  );
};

export default Banner;
