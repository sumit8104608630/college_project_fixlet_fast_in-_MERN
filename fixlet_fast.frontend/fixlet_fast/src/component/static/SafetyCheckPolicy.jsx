import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function SafetyMeasures() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-gray-700 hover:text-black">
        <FaArrowLeftLong size={25} className="" />
      </button>

      {/* Heading */}
      <h1 className="text-2xl font-bold">
        Know more about Fixlet Fast’s safety measures
      </h1>

      {/* Description */}
      <p className="text-gray-700 mt-4">
        At Fixlet Fast, the safety of customers and professionals is taken extremely seriously. 
        To ensure this, we have taken the following precautionary measures:
      </p>

      {/* List of Measures */}
      <ul className="list-disc list-inside mt-4 text-gray-700">
        <li>We conduct background verification on all our professionals.</li>
        <li>In case of any critical support, an SOS button is available in the app for both customers and professionals.</li>
      </ul>
    </div>
  );
}
