const data = [
    {
      "serviceType": "kitchenPestControl",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769207/kitchen_nimsbv.webp",
      "serviceName": "Kitchen Pest Control",
      "servicePartName": "Kitchen",
      "serviceSubType": [
        {
          "subServiceName": "Kitchen Pest Inspection",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769839/pestKitchen_ovdbwn.webp",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 300,
          "included": ["Inspection for pests in kitchen areas", "Identification of potential pest entry points"],
          "note": ["Extra charge for severe infestation"]
        },
        {
          "subServiceName": "Kitchen Pest Treatment",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769837/kitchen_pest_inspection_qriec2.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 6,
          "price": 400,
          "included": ["Treatment for common kitchen pests like ants and cockroaches", "Sealing potential entry points", "Sanitizing affected areas"],
          "note": ["Extra charge for deep cleaning or severe infestations"]
        }
      ],
      "price": 0,
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    },
    {
      "serviceType": "bathroomPestControl",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769204/office_grd6ap.webp",
      "serviceName": "Bathroom Pest Control",
      "servicePartName": "Bathroom",
      "serviceSubType": [
        {
          "subServiceName": "Bathroom Pest Inspection",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769204/office_grd6ap.webp",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 250,
          "included": ["Inspection for pests in bathroom areas", "Identification of moisture-related pest issues like mold and termites"],
          "note": ["Extra charge for severe infestations"]
        },
        {
          "subServiceName": "Bathroom Pest Treatment",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734770033/bathroomPest_f96fps.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 6,
          "price": 350,
          "included": ["Treatment for common bathroom pests like cockroaches and ants", "Prevention of pest entry points", "Sanitizing bathroom areas affected by pests"],
          "note": ["Extra charge for deep cleaning or heavy infestations"]
        }
      ],
      "price": 0,
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    },
    {
      "serviceType": "officePestControl",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769204/bathroom_thhjkw.jpg",
      "serviceName": "Office Pest Control",
      "servicePartName": "Office",
      "serviceSubType": [
        {
          "subServiceName": "Office Pest Inspection",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734769204/bathroom_thhjkw.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 6,
          "price": 400,
          "included": ["Inspection for office pests", "Identification of entry points and areas prone to pest infestations"],
          "note": ["Extra charge for large office spaces"]
        },
        {
          "subServiceName": "Office Pest Treatment",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734770148/officeTerminate_xywkwh.jpg",
          "serviceTime": 120,
          "serviceRatingCount": 7,
          "price": 600,
          "included": ["Treatment for pests like rodents, cockroaches, and ants", "Sealing entry points", "Prevention measures and sanitization of office areas"],
          "note": ["Extra charge for larger offices or severe infestations"]
        }
      ],
      "price": 0,
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    }
  ];
  
  module.exports=data;
  