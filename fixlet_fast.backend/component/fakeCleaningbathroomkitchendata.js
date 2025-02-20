const data = [
    {
      "serviceType": "bathroom_kitchen",
      "serviceTypeName": "Bath & kitchen cleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734702427/bathroom_ngnoob.webp",
      "serviceName": "Bathroom Cleaning",
      "servicePartName": "Bathroom",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734702699/bathromImage_r6tsul.webp",
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
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734702690/toiletImage_bs1yz7.webp",
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
      "serviceType": "bathroom_kitchen",
      "serviceTypeName": "Bath & kitchen cleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734702532/kitchen_n9azvb.webp",
      "serviceName": "Kitchen Cleaning",
      "servicePartName": "Kitchen",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734703309/kitchen_aplianc_scac1f.jpg",
          "subServiceName": "Oven & Kitchen Appliance Cleaning",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 700,
          "included": ["Cleaning of oven", "Wiping down kitchen appliances", "Sanitizing sink area", "Cleaning of ventilation hoods"],
          "note": [
            "Additional charges for removing heavy grease build-up",
            "Client must empty the oven prior to cleaning"
          ],
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734703440/kitchen_tile_f4ax4h.jpg",
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
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734703609/chimney_ttitdn.webp",
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
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734703593/kitchendeep_oiizdh.jpg",
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
  
      ],
      "price": 650,
      "rating": 0,
      "reviewCount": 0
    }
  ];
  
  export default data;
  
  