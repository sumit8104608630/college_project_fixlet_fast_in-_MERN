const acServiceData = [
    {
      "serviceType": "acservice",
      "serviceTypeName": "Ac service",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734773822/acService_f0vcsg.webp",
      "serviceName": "AC Service",
      "servicePartName": "AC",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734776010/ACdeepCleaning_lqg94v.jpg",
          "subServiceName": "AC Deep Cleaning",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 600,  // Price increased
          "included": ["Deep cleaning of AC unit", "Cleaning of filters", "Inspection of coils"],
          "note": ["Additional charges may apply for extra work or parts."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734776008/ACfilter_jva8dv.jpg",
          "subServiceName": "AC Filter Replacement",
          "serviceTime": 45,
          "serviceRatingCount": 0,
          "price": 450,  // Price increased
          "included": ["Replacement of air filters", "Inspection of AC unit for optimal performance"],
          "note": ["Charges for additional filters may apply."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734776005/ACmAINTENANCE_l1tcwv.jpg",
          "subServiceName": "AC Maintenance",
          "serviceTime": 75,
          "serviceRatingCount": 0,
          "price": 1000,  // Price increased
          "included": ["Comprehensive inspection", "Cleaning of coils and filters", "Performance testing"],
          "note": ["Additional charges may apply for extensive repairs."]
        }
      ],
      "price": 700,  // Price increased
      "rating": 0,
      "reviewCount": 10
    },
    {
      "serviceType": "acservice",
      "serviceTypeName": "Ac service",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734773819/refil_gas__ptfup3.webp",
      "serviceName": "AC Repair & Gas Refill",
      "servicePartName": "Gas",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734776004/AC_LEAK_rr8jin.jpg",
          "subServiceName": "AC Leak Repair & Gas Refill",
          "serviceTime": 75,
          "serviceRatingCount": 0,
          "price": 850,  // Price increased
          "included": ["Leak repair", "Gas refill", "AC performance check"],
          "note": ["Extra charges may apply for replacement parts."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734776001/ACgas_s34wud.jpg",
          "subServiceName": "AC Gas Refill",
          "serviceTime": 50,
          "serviceRatingCount": 0,
          "price": 550,  // Price increased
          "included": ["Refill of refrigerant gas", "Testing of gas pressure", "Leak check"],
          "note": ["Charges for additional refrigerant gas may apply."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734775999/ACcompressor_tpcdrr.jpg",
          "subServiceName": "AC Compressor Repair",
          "serviceTime": 90,
          "serviceRatingCount": 0,
          "price": 800,  // Price increased
          "included": ["Compressor repair", "Leak detection", "Performance test"],
          "note": ["Replacement parts may incur additional costs."]
        }
      ],
      "price": 800,  // Price increased
      "rating": 0,
      "reviewCount": 12
    },
    {
      "serviceType": "acservice",
      "serviceTypeName": "Ac service",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734773818/installation_apb8fs.webp",
      "serviceName": "AC Installation & Uninstallation",
      "servicePartName": "installation&uninstallation",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734775996/installation_zbnonj.jpg",
          "subServiceName": "AC Installation",
          "serviceTime": 90,
          "serviceRatingCount": 0,
          "price": 900,  // Price increased
          "included": ["Complete installation of AC unit", "Positioning and mounting", "Basic configuration and testing"],
          "note": ["Additional charges for complex installations."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734775994/uninstallation_f7savs.jpg",
          "subServiceName": "AC Uninstallation",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 800,  // Price increased
          "included": ["Safe removal of AC unit", "Sealing of exposed pipes", "Disposal of old unit"],
          "note": ["Charges for disposal of the unit are additional."]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734775992/reloxation_xuncvu.jpg",
          "subServiceName": "AC Relocation",
          "serviceTime": 120,
          "serviceRatingCount": 0,
          "price": 2000,  // Price increased
          "included": ["Relocation of AC unit", "Reinstallation at a new location", "Leak check and performance test"],
          "note": ["Extra charges may apply based on the distance."]
        }
      ],
      "price": 1000,  // Price increased
      "rating": 0,
      "reviewCount": 8
    }
  ];
  
  export default acServiceData;
  