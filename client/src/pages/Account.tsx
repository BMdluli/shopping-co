import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWithLabel from "../components/InputWithLabel";
import { fetchUserById, modifyAddress } from "../services/user";
import { getUserIdFromToken } from "../services/jwt";

const Account = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!city || !streetAddress || !postalCode || !country) {
      return;
    }

    try {
      await modifyAddress({ country, city, streetAddress, postalCode });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const userId = getUserIdFromToken();
        const data = await fetchUserById(userId);
        const formattedDob = data.dob?.slice(0, 10);

        setName(data.name);
        setSurname(data.surname);
        setDob(formattedDob);
        setEmail(data.email);
        setPhone(data.phone);

        if (data.address) {
          setCountry(data.address.country);
          setCity(data.address.city);
          setStreetAddress(data.address.streetAddress);
          setPostalCode(data.address.postalCode);
        }

        console.log(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />
      <h2 className="mb-4">My Account</h2>

      <hr />

      <div className="bg-white shadow-2xl p-4 rounded-2xl mt-4 flex gap-2 items-center h-32">
        <div className="bg-gray-400 h-20 w-20 rounded-full flex justify-center items-center">
          <p className="text-2xl font-bold text-white">
            {name.substring(0, 1)}
          </p>
        </div>

        <div className="text-sm">
          <p>
            {name} {surname}
          </p>

          <p>
            {city}, {country}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-2xl p-4 rounded-2xl mt-4">
        <div className="flex items-center justify-between mt-4">
          <h3 className="font-semibold">Personal Information</h3>

          <button className="bg-orange-500 shadow-lg rounded-md flex items-center gap-2 h-10 px-2 text-white">
            Save <img src="/icon-edit.svg" alt="edit" />
          </button>
        </div>

        <hr className="text-gray-200 mt-4" />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <InputWithLabel
              label="First Name"
              placeholder="First Name"
              value={name}
              setValue={setName}
              type="text"
            />
            <InputWithLabel
              label="Last Name"
              placeholder="Last Name"
              value={surname}
              setValue={setSurname}
              type="text"
            />
            <InputWithLabel
              label="Date of Birth"
              placeholder="Date of Birth"
              value={dob}
              setValue={setDob}
              type="date"
            />
            <InputWithLabel
              label="Email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <InputWithLabel
              label="Phone Number"
              placeholder="Phone Number"
              value={phone}
              setValue={setPhone}
              type="text"
            />
          </form>
        )}
      </div>

      <form
        className="bg-white shadow-2xl p-4 rounded-2xl mt-4"
        onSubmit={handleAddressSubmit}
      >
        <div className="flex items-center justify-between mt-4">
          <h3 className="font-semibold">Address</h3>

          <button
            className="bg-blue-500 shadow-lg rounded-md flex items-center gap-2 h-10 px-2 text-white"
            type="submit"
          >
            Save <img src="/icon-edit.svg" alt="edit" />
          </button>
        </div>

        <hr className="text-gray-200 mt-4" />

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <InputWithLabel
            label="Country"
            placeholder="Country"
            value={country}
            setValue={setCountry}
            type={"text"}
          />
          <InputWithLabel
            label="City"
            placeholder="City"
            value={city}
            setValue={setCity}
            type={"text"}
          />
          <InputWithLabel
            label="Street Address"
            placeholder="Street Address"
            value={streetAddress}
            setValue={setStreetAddress}
            type={"text"}
          />
          <InputWithLabel
            label="Postal Code"
            placeholder="Postal Code"
            value={postalCode}
            setValue={setPostalCode}
            type={"text"}
          />
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Account;
