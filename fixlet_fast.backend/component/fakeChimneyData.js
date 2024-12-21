const chimneyServiceData = [
    {
      "serviceType": "chimney",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734779086/chimneyCleaning.._z4gbec.webp",
      "serviceName": "Chimney Cleaning",
      "servicePartName": "Chimney",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780055/deepChimney_we6ktd.jpg",
          "subServiceName": "Chimney Deep Cleaning",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 500,  // Price increased
          "included": ["Deep cleaning of chimney flue", "Cleaning of chimney caps and grates", "Inspection of chimney"],
          "note": ["Additional charges may apply for extra work or parts."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780052/chimneyInspection_f0gleo.jpg",
          "subServiceName": "Chimney Inspection",
          "serviceTime": 45,
          "serviceRatingCount": 4,
          "price": 400,  // Price increased
          "included": ["Visual inspection of chimney", "Check for blockages", "Examine chimney structure"],
          "note": ["Charges may apply for further inspection or repairs."]
        }
      ],
      "price": 600,  // Price increased
      "rating": 4,
      "reviewCount": 10
    },
    {
      "serviceType": "chimney",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734779088/chimneyCleaning_apwzyw.webp",
      "serviceName": "Chimney Repair",
      "servicePartName": "Repair",
      "serviceSubType": [
  
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780049/flue_yo0ba7.jpg",
          "subServiceName": "Chimney Flue Repair",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 700,  // Price increased
          "included": ["Repair of chimney flue", "Inspection of interior structure", "Safety checks"],
          "note": ["Charges may apply for additional work."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780047/cap_jmkzel.jpg",
          "subServiceName": "Chimney Cap Repair",
          "serviceTime": 90,
          "serviceRatingCount": 7,
          "price": 1000,  // Price increased
          "included": ["Repair or replacement of chimney cap", "Inspection for obstructions", "Test for airflow"],
          "note": ["Replacement parts may incur additional costs."]
        }
      ],
      "price": 900,  // Price increased
      "rating": 5,
      "reviewCount": 12
    },
    {
      "serviceType": "chimney",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734779084/chimneyInstallation_socey2.jpg",
      "serviceName": "Chimney Installation",
      "servicePartName": "Installation",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780044/installation_f2h8ke.jpg",
          "subServiceName": "Chimney Installation",
          "serviceTime": 90,
          "serviceRatingCount": 4,
          "price": 1200,  // Price increased
          "included": ["Complete chimney installation", "Positioning and mounting", "Basic inspection and testing"],
          "note": ["Additional charges for complex installations."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734780042/removal_bfzwof.jpg",
          "subServiceName": "Chimney Removal",
          "serviceTime": 60,
          "serviceRatingCount": 3,
          "price": 900,  // Price increased
          "included": ["Safe removal of chimney unit", "Disposal of old materials", "Sealing exposed areas"],
          "note": ["Charges for disposal may apply."]
        }
      ],
      "price": 1500,  // Price increased
      "rating": 4,
      "reviewCount": 8
    }
  ];
  
module.exports= chimneyServiceData;
  