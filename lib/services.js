// lib/services.js
export const services = [
  {
    id: "wildland-fire",
    title: "Wildland Fire\nSuppression",
    shortTitle: "Wildland Fire Fighting",
    slug: "wildland-fire-suppression",
    image: "/Img/Services_Pic.jpg",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
    shortDescription: "Trained crews fighting wildfires to protect land and homes.",
    fullDescription: "PatRick Environmental specializes in wildland fire suppression, deploying highly trained crews and advanced equipment to protect forests, communities, and critical infrastructure. Our teams are experienced in initial attack, extended attack, and large fire support, working alongside federal, state, and local agencies. From remote wilderness areas to urban interfaces, we respond quickly and effectively, using proven strategies and real-time decision-making to contain and control fires. Our commitment to safety, teamwork, and operational excellence ensures we're ready to meet the toughest challenges the wildfire season brings.",
    category: "Emergency Response"
  },
  {
    id: "emergency-services",
    title: "Emergency Services",
    shortTitle: "Emergency Services",
    slug: "emergency-services",
    image: "/Img/Emergency.jpg",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
    shortDescription: "Fast-response teams ready for wildfires and natural disasters.",
    fullDescription: "Our emergency response team provides rapid deployment for various critical situations. We maintain 24/7 readiness to respond to natural disasters, environmental emergencies, and urgent safety situations across multiple sectors.",
    category: "Emergency Response"
  },
  {
    id: "brush-trimming",
    title: "Brush Trimming",
    shortTitle: "Brush Trimming",
    slug: "brush-trimming",
    image: "/Img/Brush.jpg",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
    shortDescription: "Clearing brush to reduce wildfire risks and improve safety.",
    fullDescription: "Professional vegetation management and brush trimming services to reduce fire risk and maintain safe clearances around properties and infrastructure.",
    category: "Maintenance"
  },
  {
    id: "consulting",
    title: "Consulting",
    shortTitle: "Consulting",
    slug: "consulting",
    image: "/Img/Consult_Img.JPG",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
    shortDescription: "Expert advice for wildfire management and fuel plans.",
    fullDescription: "Expert environmental consulting services providing strategic guidance for fire risk assessment, emergency planning, and environmental compliance.",
    category: "Consulting"
  },
  {
    id: "video-pyrotechnics",
    title: "Video Pyrotechnics",
    shortTitle: "Video Pyrotechnics",
    slug: "video-pyrotechnics",
    image: "/Img/Services_Pic.jpg",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
    shortDescription: "Safe, controlled fire effects for film, TV, and media projects.",
    fullDescription: "Specialized pyrotechnics services for film, television, and entertainment industry with full safety protocols and professional execution.",
    category: "Specialized Services"
  },
  {
    id: "snow-removal",
    title: "Snow Removal",
    shortTitle: "Snow Removal",
    slug: "snow-removal",
    image: "/Img/Services_Pic.jpg",
    heroImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
    shortDescription: "Clearing snow to keep roads, lots, and properties safe in winter.",
    fullDescription: "Professional snow removal services for commercial and residential properties, ensuring safe access during winter weather conditions.",
    category: "Maintenance"
  },
];

// Helper function to get current year
export const getCurrentYear = () => new Date().getFullYear();

// Helper function to get service by id
export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

// Helper function to get all service ids for static generation
export const getAllServiceIds = () => {
  return services.map(service => service.id);
};