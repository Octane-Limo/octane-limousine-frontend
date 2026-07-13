import {
  hourly_hire,
  chauffeur_icon,
  hotels_icon,
  airport_img,
  city_img,
  corporate_img,
  hourly_hire_img,
  chauffeur_img,
  hotels_img,
  bmw_car,
  mercedes_car,
  gmc_car,
  tesla_car,
  toyota_car,
  lexus_car,
  airport_icon,
  corporate_icon,
} from "../assets/index.jsx";

const services_data = [
  {
    id: 1,
    title: "Airport Transport",
    description:
      "We provide Airport Transport to and from all the Airports in Dubai. Our efficient service is the perfect option for when you are travelling for business or pleasure.",
    icon: airport_icon,
    image: airport_img,
  },
  {
    id: 2,
    title: "City Tours",
    description:
      "You can book your full day and half day city tours with our professional chauffeurs to drive you around the city to all major sightseeing destinations.",
    icon: chauffeur_icon,
    image: city_img,
  },
  {
    id: 3,
    title: "Hourly Hire",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
    icon: hourly_hire,
    image: hourly_hire_img,
  },
  {
    id: 4,
    title: "Corporates & Events",
    description:
      "When planning a business trip or organizing a corporate event, We provides customized solutions to meet your requirements in a very timely and efficient manner.",
    icon: corporate_icon,
    image: corporate_img,
  },
  {
    id: 5,
    title: "Hotels & Airbnb Transport",
    description:
      "We provide Airport Transport to and from all the Airports in Dubai. Our efficient service is the perfect option for when you are travelling for business or pleasure.",
    icon: hotels_icon,
    image: hotels_img,
  },
  {
    id: 6,
    title: "Chauffeur Services",
    description:
      "As with all our chauffeured services, you will only travel in your choice of the finest, latest-model luxury vehicles from the Octane Limousine Fleet.",
    icon: chauffeur_icon,
    image: chauffeur_img,
  },
];

export const fleet_car_data = [
  {
    id: 1,
    title: "mercedes",
    image: mercedes_car,
    model: "S580",
  },
  {
    id: 2,
    title: "bmw",
    image: bmw_car,
    model: "7 Series 2023",
  },
  {
    id: 3,
    title: "gmc",
    image: gmc_car,
    model: "Yukon Denali",
  },
  {
    id: 4,
    title: "tesla",
    image: tesla_car,
    model: "Model Y",
  },
  {
    id: 5,
    title: "toyota",
    image: toyota_car,
    model: "Land Cruiser gxr",
  },
  {
    id: 6,
    title: "lexus",
    image: lexus_car,
    model: "300h",
  },
];

export default services_data;
