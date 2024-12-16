const data = [
  {
    "serviceType": "electrician",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734340451/light_k3dqxe.jpg",
    "serviceName": "Light Installation",
    "servicePartName": "Light",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_wall_light",
        "subServiceName": "Wall Light Installation",
        "serviceTime": 30,
        "serviceRatingCount": 1,
        "price": 200
      },
      {
        "subServiceImage": "url_for_ceiling_light",
        "subServiceName": "Ceiling Light Installation",
        "serviceTime": 40,
        "serviceRatingCount": 0,
        "price": 250
      },
      {
        "subServiceImage": "url_for_chandelier",
        "subServiceName": "Chandelier Installation",
        "serviceTime": 60,
        "serviceRatingCount": 0,
        "price": 400
      },
      {
        "subServiceImage": "url_for_led_strip",
        "subServiceName": "LED Strip Installation",
        "serviceTime": 45,
        "serviceRatingCount": 0,
        "price": 180
      }
    ],
    "included": ["Installation of light fixture", "Post-service cleaning"],
    "note": [
      "Wiring over 2 meters will incur additional charges",
      "Warranty does not cover customer-sourced spare parts"
    ],
    "price": 200,
    "rating": 0,
    "reviewCount": 0
  },
  {
    "serviceType": "electrician",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734340546/fan_eq3g9n.jpg",
    "serviceName": "Fan Installation",
    "servicePartName": "Fan",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_ceiling_fan",
        "subServiceName": "Ceiling Fan Installation",
        "serviceTime": 50,
        "serviceRatingCount": 0,
        "price": 150
      },
      {
        "subServiceImage": "url_for_wall_fan",
        "subServiceName": "Wall Fan Installation",
        "serviceTime": 40,
        "serviceRatingCount": 0,
        "price": 140
      },
      {
        "subServiceImage": "url_for_exhaust_fan",
        "subServiceName": "Exhaust Fan Installation",
        "serviceTime": 30,
        "serviceRatingCount": 0,
        "price": 160
      },
      {
        "subServiceImage": "url_for_decorative_fan",
        "subServiceName": "Decorative Fan Installation",
        "serviceTime": 60,
        "serviceRatingCount": 0,
        "price": 300
      },
      {
        "subServiceImage": "url_for_oscillating_fan",
        "subServiceName": "Oscillating Fan Installation",
        "serviceTime": 35,
        "serviceRatingCount": 0,
        "price": 180
      },
      {
        "subServiceImage": "url_for_table_fan",
        "subServiceName": "Table Fan Installation",
        "serviceTime": 20,
        "serviceRatingCount": 0,
        "price": 100
      }
    ],
    "included": ["Installation of fan", "Post-service cleaning"],
    "note": [
      "Wiring over 2 meters will incur additional charges",
      "Warranty does not cover customer-sourced spare parts"
    ],
    "price": 150,
    "rating": 0,
    "reviewCount": 0
  },
  {
    "serviceType": "electrician",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734340652/switch_pxaszz.jpg",
    "serviceName": "Switchboard Installation",
    "servicePartName": "Switchboard",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_basic_switchboard",
        "subServiceName": "Basic Switchboard Installation",
        "serviceTime": 30,
        "serviceRatingCount": 0,
        "price": 180
      },
      {
        "subServiceImage": "url_for_smart_switchboard",
        "subServiceName": "Smart Switchboard Installation",
        "serviceTime": 50,
        "serviceRatingCount": 0,
        "price": 300
      },
      {
        "subServiceImage": "url_for_modular_switchboard",
        "subServiceName": "Modular Switchboard Installation",
        "serviceTime": 40,
        "serviceRatingCount": 0,
        "price": 250
      },
      {
        "subServiceImage": "url_for_ac_switchboard",
        "subServiceName": "AC Switchboard Installation",
        "serviceTime": 60,
        "serviceRatingCount": 0,
        "price": 350
      }
    ],
    "included": ["Installation of switchboard", "Post-service cleaning"],
    "note": [
      "Wiring over 2 meters will incur additional charges",
      "Warranty does not cover customer-sourced spare parts"
    ],
    "price": 180,
    "rating": 0,
    "reviewCount": 0
  },
  {
    "serviceType": "electrician",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734341010/fan_repair_bzpfhh.jpg",
    "serviceName": "Fan Repair",
    "servicePartName": "Fan",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_ceiling_fan_repair",
        "subServiceName": "Ceiling Fan Repair",
        "serviceTime": 50,
        "serviceRatingCount": 0,
        "price": 180
      },
      {
        "subServiceImage": "url_for_wall_fan_repair",
        "subServiceName": "Wall Fan Repair",
        "serviceTime": 40,
        "serviceRatingCount": 0,
        "price": 160
      },
      {
        "subServiceImage": "url_for_exhaust_fan_repair",
        "subServiceName": "Exhaust Fan Repair",
        "serviceTime": 30,
        "serviceRatingCount": 0,
        "price": 150
      },
      {
        "subServiceImage": "url_for_decorative_fan_repair",
        "subServiceName": "Decorative Fan Repair",
        "serviceTime": 60,
        "serviceRatingCount": 0,
        "price": 250
      },
      {
        "subServiceImage": "url_for_oscillating_fan_repair",
        "subServiceName": "Oscillating Fan Repair",
        "serviceTime": 40,
        "serviceRatingCount": 0,
        "price": 180
      },
      {
        "subServiceImage": "url_for_table_fan_repair",
        "subServiceName": "Table Fan Repair",
        "serviceTime": 25,
        "serviceRatingCount": 0,
        "price": 100
      }
    ],
    "included": ["Diagnosis and repair of fan", "Post-service cleaning"],
    "note": [
      "Additional parts may incur extra charges",
      "Warranty does not cover customer-sourced spare parts"
    ],
    "price": 180,
    "rating": 0,
    "reviewCount": 0
  },
  {
    "serviceType": "electrician",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734341550/wiring_xwftz7.jpg",
    "serviceName": "Wiring Installation",
    "servicePartName": "Wiring",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_interior_wiring",
        "subServiceName": "Interior Wiring Installation",
        "serviceTime": 60,
        "serviceRatingCount": 0,
        "price": 500
      },
      {
        "subServiceImage": "url_for_exterior_wiring",
        "subServiceName": "Exterior Wiring Installation",
        "serviceTime": 80,
        "serviceRatingCount": 0,
        "price": 700
      }
    ],
    "included": ["Wiring installation", "Post-service inspection"],
    "note": [
      "Additional wiring length may incur extra charges",
      "Warranty does not cover customer-sourced materials"
    ],
    "price": 500,
    "rating": 0,
    "reviewCount": 0
  },
  {
    "serviceType": "general",
    "serviceImage": "https://res.cloudinary.com/dcsmp3yjk/image/upload/v1734344997/service_man_txqrn2.jpg",
    "serviceName": "Book Visit",
    "servicePartName": "Appointment",
    "serviceSubType": [
      {
        "subServiceImage": "url_for_general_visit",
        "subServiceName": "General Visit",
        "serviceTime": 30,
        "serviceRatingCount": 0,
        "price": 100
      }
    ],
    "included": ["On-site assessment of service requirements"],
    "note": [
      "Visit charges are non-refundable and will be adjusted in final service cost"
    ],
    "price": 100,
    "rating": 0,
    "reviewCount": 0
  }
];

export default data;
