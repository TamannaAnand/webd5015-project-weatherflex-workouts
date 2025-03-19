
import SectionTitle from "../Common/SectionTitle";
import Gemini from "../Gemini";
import CardWrapper from "./cards";
import RevenueChart from "./revenue-chart";
import WeatherInfo from "./WeatherInfo";
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
            title="Welome to your Dashboard!"
            paragraph=""
            center
          />
        </div>
        <div>
        <WeatherInfo weatherData={weatherData} />
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full lg:w-1/3">
            <CardWrapper />
          </div>
          <div className="w-full lg:w-2/3">
            <RevenueChart />
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
