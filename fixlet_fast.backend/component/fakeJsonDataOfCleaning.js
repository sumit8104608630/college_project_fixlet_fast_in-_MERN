const data = [
    {
      "serviceType": "bathroom&kitchen",
      "serviceTypeName": "Bathroom & kitchen cleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734340451/bathroom_kitchen_cleaning.jpg",
      "serviceName": "Bathroom Cleaning",
      "servicePartName": "Bathroom",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734437560/bathroom_cleaning_service.jpg",
          "subServiceName": "Bathroom Deep Cleaning",
          "serviceTime": 90,
          "serviceRatingCount": 0,
          "price": 300,
          "included": ["Scrubbing and cleaning tiles", "Sanitizing toilets", "Cleaning mirrors", "Dusting and wiping down surfaces", "Floor cleaning"],
          "note": [
            "Additional charges for mold removal",
            "Cleaning of glass shower panels will incur extra charges"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734440176/mini_cleaning_service.jpg",
          "subServiceName": "Mini Bathroom Cleaning",
          "serviceTime": 30,
          "serviceRatingCount": 0,
          "price": 100,
          "included": ["Wiping down sink and countertops", "Cleaning toilet surface", "Quick floor cleaning"],
          "note": [
            "Only surface-level cleaning, does not include deep cleaning"
          ],
        }
      ],
      "price": 350,
      "rating": 0,
      "reviewCount": 0
    },
    {
      "serviceType": "bathroom&kitchen",
      "serviceTypeName": "Bathroom & kitchen cleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734340451/bathroom_kitchen_cleaning.jpg",
      "serviceName": "Kitchen Cleaning",
      "servicePartName": "Kitchen",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734438853/kitchen_oven_cleaning_service.jpg",
          "subServiceName": "Oven & Kitchen Appliance Cleaning",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 150,
          "included": ["Cleaning of oven", "Wiping down kitchen appliances", "Sanitizing sink area", "Cleaning of ventilation hoods"],
          "note": [
            "Additional charges for removing heavy grease build-up",
            "Client must empty the oven prior to cleaning"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734439094/kitchen_floor_cleaning_service.jpg",
          "subServiceName": "Kitchen Floor Cleaning",
          "serviceTime": 45,
          "serviceRatingCount": 0,
          "price": 180,
          "included": ["Floor washing", "Scrubbing tiles", "Stain removal"],
          "note": [
            "Additional charges for cleaning under heavy furniture"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734439314/kitchen_chimney_cleaning_service.jpg",
          "subServiceName": "Kitchen Chimney Cleaning",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 180,
          "included": ["Chimney cleaning", "Cleaning of the filters", "Degreasing the chimney duct"],
          "note": [
            "Additional charges for heavy grease build-up",
            "Client must remove all items from the kitchen area before cleaning"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734438170/kitchen_cleaning_service.jpg",
          "subServiceName": "Kitchen Deep Cleaning",
          "serviceTime": 100,
          "serviceRatingCount": 0,
          "price": 350,
          "included": ["Cleaning of countertops", "Oven and stove cleaning", "Cabinet wiping", "Floor cleaning", "Dishwasher sanitization"],
          "note": [
            "Additional charges for appliance cleaning (fridge, microwave)",
            "Deep cleaning of kitchen tiles may incur extra cost"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734440311/mini_kitchen_cleaning_service.jpg",
          "subServiceName": "Mini Kitchen Cleaning",
          "serviceTime": 35,
          "serviceRatingCount": 0,
          "price": 120,
          "included": ["Wiping countertops", "Cleaning stove top", "Quick floor cleaning"],
          "note": [
            "Only surface-level cleaning, does not include appliance deep cleaning"
          ],
        }
      ],
      "price": 650,
      "rating": 0,
      "reviewCount": 0
    }
  ];
  
  export default data;
  