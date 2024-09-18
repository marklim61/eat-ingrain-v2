import account from '../assets/account.png';

const Dropdown = () => {
  const handleChange = (event) => {
    console.log(`Selected value: ${event.target.value}`);
  };

  return (
    <div className="relative inline-block">
      <img src={account} alt="account" className="absolute top-1 left-2 z-10 h-8 w-8 mr-2" />
      <select
        name="cars"
        id="cars"
        className="relative z-0 block w-full border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE] px-4 py-2 pr-8 appearance-none focus:outline-none hover:focus:ring-2 hover:focus:ring-indigo-500"
        onChange={handleChange}
      >
        <option value="" disabled selected hidden></option>
        <option value="profile">Profile</option>
        <option value="logout">Logout</option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
