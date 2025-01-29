export default function SafetyMeasures() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        {/* Back Button */}
        <button onClick={() => window.history.back()} className="text-xl mb-4">
          ←
        </button>
  
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4">
          Know more about Urban Company’s safety measures
        </h1>
  
        {/* Description */}
        <p className="text-lg text-gray-700 mb-4">
          At Urban Company, the safety of customers and professionals is taken extremely seriously. 
          To ensure this, we have taken the following precautionary measures:
        </p>
  
        {/* Safety Measures List */}
        <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
          <li>We conduct background verification on all our professionals.</li>
          <li>In case of any critical support, the SOS button is available in the app for both our customers and professionals.</li>
        </ul>
  
        {/* New Creative Paragraph */}
        <p className="text-lg text-gray-700 mt-6">
          Your safety is our top priority! We go the extra mile by offering real-time tracking of 
          professionals and ensuring 24/7 customer support. With Urban Company, trust and security come first.
        </p>
      </div>
    );
  }
  