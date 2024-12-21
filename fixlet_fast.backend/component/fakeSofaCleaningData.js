const data = [
    {
      "serviceType": "sofaCleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734765079/sofa_ay62bk.jpg",
      "serviceName": "Sofa Cleaning",
      "servicePartName": "Sofa",
      "serviceSubType": [
        {
          "subServiceName": "Single Sofa Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766668/singleSofa_rpmjat.jpg",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 300,
          "included": ["Vacuuming of fabric", "Stain treatment", "Deep cleaning of cushions"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Double Sofa Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766666/doubleSofa_sk3e5r.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 6,
          "price": 500,
          "included": ["Vacuuming of fabric", "Stain treatment", "Deep cleaning of cushions"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Triple Sofa Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766664/TripleSofa_ipj8ab.jpg",
          "serviceTime": 120,
          "serviceRatingCount": 7,
          "price": 700,
          "included": ["Vacuuming of fabric", "Stain treatment", "Deep cleaning of cushions"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "L-Shaped Sofa Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766660/L-ShapedSofa_dakswz.jpg",
          "serviceTime": 150,
          "serviceRatingCount": 4,
          "price": 900,
          "included": ["Vacuuming of fabric", "Stain treatment", "Deep cleaning of cushions"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Sectional Sofa Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766657/SectionalSofa_o1zb6v.jpg",
          "serviceTime": 180,
          "serviceRatingCount": 8,
          "price": 1200,
          "included": ["Vacuuming of fabric", "Stain treatment", "Deep cleaning of cushions"],
          "note": ["Extra charge for deep stain removal"]
        }
      ],
      "price": 0,  // No price defined for main service
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    },
    {
      "serviceType": "carpetCleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734765076/carpeter_nsjklj.webp",
      "serviceName": "Carpet Cleaning",
      "servicePartName": "Carpet",
      "serviceSubType": [
        {
          "subServiceName": "Small Carpet Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766655/SmallCarpet_nuxnrq.jpg",
          "serviceTime": 60,
          "serviceRatingCount": 5,
          "price": 250,
          "included": ["Vacuuming of carpet", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Medium Carpet Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766652/MediumCarpet_dsjpx0.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 6,
          "price": 400,
          "included": ["Vacuuming of carpet", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Large Carpet Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766650/LargeCarpet_fpyxb7.jpg",
          "serviceTime": 120,
          "serviceRatingCount": 7,
          "price": 600,
          "included": ["Vacuuming of carpet", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        }
      ],
      "price": 0,  // No price defined for main service
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    },
    {
      "serviceType": "mattressCleaning",
      "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766648/SingleMattress_qyrfpz.jpg",
      "serviceName": "Mattress Cleaning",
      "servicePartName": "Mattress",
      "serviceSubType": [
        {
          "subServiceName": "Single Mattress Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766648/SingleMattress_qyrfpz.jpg",
          "serviceTime": 60,
          "serviceRatingCount": 4,
          "price": 250,
          "included": ["Vacuuming of mattress", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "Double Mattress Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766646/DoubleMattress_wzsuik.jpg",
          "serviceTime": 90,
          "serviceRatingCount": 5,
          "price": 400,
          "included": ["Vacuuming of mattress", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        },
        {
          "subServiceName": "King Size Mattress Cleaning",
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734766645/KingSizeMattress_rd9qrg.jpg",
          "serviceTime": 120,
          "serviceRatingCount": 6,
          "price": 600,
          "included": ["Vacuuming of mattress", "Stain treatment", "Deep cleaning of fibers"],
          "note": ["Extra charge for deep stain removal"]
        }
      ],
      "price": 0,  // No price defined for main service
      "rating": 0,
      "reviewCount": 0,
      "availability": true
    }
  ];
  
  module.exports=data;
  