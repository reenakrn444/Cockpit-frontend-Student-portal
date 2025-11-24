// import { keyframes } from '@emotion/react';

// // Define keyframes using Emotion
// const scroll = keyframes`
//   0% { transform: translateX(0%); }
//   100% { transform: translateX(-50%); }
// `;

// const partners = [
//     { name: '4 Stripes', src: '/src/assests/images/4StripesPartner.png' },
//     { name: 'Aviators Library', src: '/src/assests/images/AviatorsLibraryPartners.jpg' },
// ];

// const PartnerSection = () => {
//     return (
//         <Box sx={{ textAlign: 'center', py: 6, backgroundColor: '#f9f9f9' }}>
//             <Typography variant="h4" fontWeight={700} mb={1} sx={{ fontFamily: "Exo", color: "#1D1D1D" }}>
//                 Our Trusted Partners
//             </Typography>
//             <Typography variant="subtitle1" color="#777777" mb={4}>
//                 we collaborate with top aviation brands to deliver unmatched experiences
//             </Typography>

//             <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
//                 <Box
//                     sx={{
//                         display: 'inline-block',
//                         animation: `${scroll} 30s linear infinite`,
//                         '& img': {
//                             mx: 5,
//                             height: 110,
//                             filter: 'grayscale(80%)',
//                             opacity: 0.7,
//                         },
//                     }}
//                 >
//                     {[...partners, ...partners].map((partner, index) => (
//                         <img
//                             key={`${partner.name}-${index}`}
//                             src={partner.src}
//                             alt={partner.name}
//                             loading="lazy"
//                         />
//                     ))}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default PartnerSection;

import {
  HeaderLogo,
  FourStripesPartnerLogo,
  AviationPartnerLogo,
  IFALogo,
  Keralaflightacademy,
} from "./ImagesRender";

import { keyframes } from "@emotion/react";

// Scroll only 60% to the left
const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-60%); }
`;

const partners = [
  { name: "4 Stripes", src: FourStripesPartnerLogo },
  { name: "Aviators Library", src: AviationPartnerLogo },
  { name: "IFA", src: IFALogo },
  { name: "kerala flight academy", src: Keralaflightacademy },
];

const PartnerSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        backgroundColor: theme.HomeHeader.background2,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
        sx={{ fontFamily: "Exo", color: theme.HomeHeader.partnerText }}
      >
        Our Trusted Partners
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: theme.HomeHeader.smallPartnerText }}
        mb={4}
      >
        we collaborate with top aviation brands to deliver unmatched experiences
      </Typography>

      <Box sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <Box
          sx={{
            display: "inline-block",
            animation: `${scroll} 25s linear infinite`,
            "& img": {
              mx: 3,
              height: 110,

              filter: "grayscale(80%)",
              opacity: 0.7,
            },
          }}
        >
          {partners.map((partner, index) => (
            <img
              key={`${partner.name}-${index}`}
              src={partner.src}
              alt={partner.name}
              loading="lazy"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerSection;
