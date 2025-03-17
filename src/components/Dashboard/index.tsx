
import SectionTitle from "../Common/SectionTitle";
import WeatherInfo from "./WeatherInfo";
import WorkoutRecommendations from "./WorkoutRecommendation";
import { fetchWeatherData } from "@/utils/fetchWeatherData";

const Dashboard = async() => {

  const weatherData = await fetchWeatherData()

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="Dashboard">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Dashboard"
            title="Dashboard"
            paragraph=""
            center
          />
        </div>
        <WeatherInfo weatherData={weatherData}/>
        <WorkoutRecommendations />
        <div className="-mx-4 flex flex-wrap justify-center">
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
