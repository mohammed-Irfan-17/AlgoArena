// import Navbar from "../../components/homepage/Navbar/Navbar";
import HeroSection from "../../components/homepage/HeroSection/HeroSection";
import FeatureHighlights from "../../components/homepage/FeatureHighlights/FeatureHighlights";
import FeaturedProblems from "../../components/homepage/FeaturedProblems/FeaturedProblems";
import PlatformStats from "../../components/homepage/PlatformStats/PlatformStats";
import CallToAction from "../../components/homepage/CallToAction/CallToAction";
import Footer from "../../components/homepage/Footer/Footer";

import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            {/* <Navbar /> */}

            <main>
                <HeroSection />
                <FeatureHighlights />
                <FeaturedProblems />
                <PlatformStats />
                <CallToAction />
            </main>
            <Footer/>

        </div>
    );
}

export default Home;