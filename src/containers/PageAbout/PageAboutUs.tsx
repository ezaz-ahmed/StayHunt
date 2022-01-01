import rightImg from "images/about-hero-right.png";
import Helmet from 'react-helmet'
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";
import SectionOurValues from './SectionOurValues';


const PageAboutUs = () => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative`}
      data-nc-id='PageAbout'
    >
      <Helmet>
        <title>About Us | TicketsForTravel</title>
      </Helmet>

      <BgGlassmorphism />

      <div className='container py-16 lg:py-28 space-y-16 lg:space-y-28'>
        <SectionHero
          rightImg={rightImg}
          heading='👋 About Us.'
          btnText=''
          subHeading='We, TicketsForTravel, started our journey in 2020. Necessity drives Innovation, Innovation is necessity. In Bangladesh, we are becoming digital. But, in many sector, we are still lagging behind. Let’s hear how we initiated this startup, Our CEO, Mahfujur Rahman Miraj, who wants to travel by launch but couldn’t find any digital solutions, he had to waste too many hours, but solutions didn’t happen. The same incident happens in the bus sector. So, He came up with an idea where general people can experience all services in a single platform. Now, TicketsForTravel, developed an online platform, this serves people with bus, launch, air, train – tickets and hotel booking. TicketsForTravel makes people life easier with the innovative solutions. We make people life much easier than before with our unique digital solutions.'
        />

        <SectionOurValues />
      </div>
    </div>
  );
};

export default PageAboutUs;
