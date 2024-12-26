const forgasStoveData = [
    {
      "serviceType": "gasstoverepair",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734782685/stoveRepair_mcmhbt.jpg",
      "serviceName": "Stove Cleaning",
      "servicePartName": "Cleaning",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734783268/deep_cleaning_zlz6qt.jpg",
          "subServiceName": "Deep Cleaning",
          "serviceTime": 50,
          "serviceRatingCount": 6,
          "price": 400,
          "included": ["Deep cleaning of burners", "Removal of grease and stains", "Inspection of parts"],
          "note": ["Additional charges may apply for extra cleaning requirements."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734783266/service_oosl0p.jpg",
          "subServiceName": "Inspection and Cleaning",
          "serviceTime": 30,
          "serviceRatingCount": 4,
          "price": 300,
          "included": ["Basic cleaning of stove", "Inspection of burner alignment", "Check for gas leaks"],
          "note": ["Minor repairs are charged separately."]
        }
      ],
      "price": 500,
      "rating": 4,
      "reviewCount": 8
    },
    {
      "serviceType": "gasstoverepair",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734782685/stoveRepair_mcmhbt.jpg",
      "serviceName": "Stove Repair",
      "servicePartName": "Repair",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734783263/burnner_sxdfcd.jpg",
          "subServiceName": "Burner Repair",
          "serviceTime": 40,
          "serviceRatingCount": 5,
          "price": 600,
          "included": ["Repair of faulty burners", "Replacement of burner parts", "Performance testing"],
          "note": ["Replacement parts cost extra."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734783262/leak_pwtrmh.jpg",
          "subServiceName": "Gas Leak Repair",
          "serviceTime": 60,
          "serviceRatingCount": 6,
          "price": 800,
          "included": ["Detection and sealing of gas leaks", "Testing gas flow", "Safety inspection"],
          "note": ["Additional charges for major repairs."]
        }
      ],
      "price": 700,
      "rating": 5,
      "reviewCount": 10
    }
  ];
  
  module.exports= forgasStoveData;
  