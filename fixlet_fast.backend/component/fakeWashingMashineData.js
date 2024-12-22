const data = [
    {
      "serviceType": "washingmachine",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847196/repair_pihhd0.webp",
      "serviceName": "Repair",
      "servicePartName": "Repair",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847196/repair_pihhd0.webp",
          "subServiceName": "Washing Machine Repair",
          "serviceTime": 90,
          "serviceRatingCount": 0,
          "price": 1000,  
          "included": ["Diagnosis and repair of washing machine", "Post-service cleaning"],
          "note": [
            "Parts replacement may incur additional charges",
            "Warranty does not cover customer-sourced spare parts"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847651/fullAutomatic_q50zp4.webp",
          "subServiceName": "Fully Automatic Washing Machine Checkup",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 599,  
          "included": ["Comprehensive checkup of washing machine","No issue","power issue","unknown issue", "Testing all functions", "Cleaning of key components"],
          "note": [
            "Any issues identified will be communicated with the customer",
            "Additional charges may apply for parts replacement"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847647/automaticfront_kk8ysk.webp",
          "subServiceName": "Fully Automatic Washing Machine Checkup (Front Load)",
          "serviceTime": 75,
          "serviceRatingCount": 0,
          "price": 600,  // Increased price
          "included": ["Comprehensive checkup for front-load washing machines", "Testing of front-load specific components", "Cleaning and maintenance of front-load features"],
          "note": [
            "Any issues identified will be communicated with the customer",
            "Additional charges may apply for parts replacement"
          ],
        },
        {
          "subServiceImage": "https://your-image-url.com/semi-automatic-checkup.jpg",
          "subServiceName": "Semi Automatic Washing Machine Checkup",
          "serviceTime": 65,
          "serviceRatingCount": 0,
          "price": 500,  // Increased price
          "included": ["Comprehensive checkup of semi-automatic washing machine", "Testing all functions", "Cleaning of key components"],
          "note": [
            "Any issues identified will be communicated with the customer",
            "Additional charges may apply for parts replacement"
          ],
        }
      ],
      "price": 600,  // Base price for repair
      "rating": 0,
      "reviewCount": 0
    },
  
    {
      "serviceType": "washingmachine",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847193/installation_nl8qr4.webp",
      "serviceName": "Installation",
      "servicePartName": "Installation",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847641/installation-image_ab63v3.webp",
          "subServiceName": "Complete Installation",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 500,  // Increased price
          "included": ["Complete installation of washing machine", "Connection to water and electricity", "Testing post-installation"],
          "note": [
            "Installation is limited to standard hookups only",
            "Additional charges for custom installations"
          ],
        }
      ],
      "price": 500,  // Base price for installation
      "rating": 0,
      "reviewCount": 0
    },
  
   
    {
      "serviceType": "washingmachine",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734847638/uninstallaytion_w67xxz.webp",
      "serviceName": "Uninstallation",
      "servicePartName": "Uninstallation",
      "serviceSubType": [
        {
          "subServiceImage": "https://your-image-url.com/complete-uninstallation.jpg",
          "subServiceName": "Complete Uninstallation",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 450,  // Increased price
          "included": ["Complete removal of washing machine", "Disconnection from water and electricity", "Post-uninstallation cleaning"],
          "note": [
            "Additional charges for difficult-to-reach installations",
            "Warranty does not cover customer-sourced spare parts"
          ],
        }
      ],
      "price": 450,  // Base price for uninstallation
      "rating": 0,
      "reviewCount": 0
    }
  ];
  
  module.exports= data;
  