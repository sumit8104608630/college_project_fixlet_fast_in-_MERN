const mixerGrinderData = [
    // Mixer Grinder Repair
    {
      "serviceType": "mixergrinder",
      "serviceTypeName": "Mixer Grinder",
      "serviceImage": "",
      "serviceName": "Mixer Grinder",
      "servicePartName": "Repair",
      "serviceSubType": [
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851494/mixer_Noise_n3zfpp.jpg",
          "subServiceName": "Noise Repair",
          "serviceTime": 45,
          "serviceRatingCount": 0,
          "price": 300,
          "included": ["Inspection and resolution of excessive noise issues", "Lubrication and motor alignment adjustments"],
          "note": [
            "Parts replacement may incur additional charges",
            "Warranty excludes customer-sourced spare parts"
          ]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851492/burning_ywqaqr.jpg",
          "subServiceName": "Burning Smell Repair",
          "serviceTime": 60,
          "serviceRatingCount": 0,
          "price": 350,
          "included": ["Inspection for electrical or mechanical faults", "Motor coil replacement if required"],
          "note": [
            "Additional charges for high-performance parts",
            "Warranty does not cover damage due to improper usage"
          ]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851489/grindingIsu_sue_ydon1d.jpg",
          "subServiceName": "Grinding Issue Repair",
          "serviceTime": 45,
          "serviceRatingCount": 0,
          "price": 300,
          "included": ["Inspection and repair of grinding performance issues", "Blade alignment and motor adjustments"],
          "note": [
            "Replacement of blades or motor incurs extra charges",
            "Ensure proper cleaning to avoid future issues"
          ]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851486/unknow_Issue_zonqkk.jpg",
          "subServiceName": "Unknown Issue Diagnosis",
          "serviceTime": 30,
          "serviceRatingCount": 0,
          "price": 200,
          "included": ["Complete diagnosis of unidentified problems", "Detailed report with resolution options"],
          "note": [
            "Charges do not include cost of repairs",
            "Additional time may be required for complex issues"
          ]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851480/waterLeakage_fkhwhl.jpg",
          "subServiceName": "Water Leakage Repair",
          "serviceTime": 45,
          "serviceRatingCount": 0,
          "price": 250,
          "included": ["Resolution of leakage from jars or machine body", "Replacement of faulty seals if required"],
          "note": [
            "Additional charges for premium seals",
            "Warranty does not cover customer-induced damage"
          ]
        },
        {
          "subServiceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734851482/jar_repair_qqlxam.jpg",
          "subServiceName": "Jar Repair",
          "serviceTime": 30,
          "serviceRatingCount": 0,
          "price": 200,
          "included": ["Repair or replacement of jar components", "Blade alignment and sealing adjustments"],
          "note": [
            "Replacement jars are charged extra",
            "Ensure proper cleaning for longevity"
          ]
        }
      ],
      "price": 300, // Base price for repair
      "rating": 0,
      "reviewCount": 0
    }
  ];
  
  module.exports= mixerGrinderData;
  