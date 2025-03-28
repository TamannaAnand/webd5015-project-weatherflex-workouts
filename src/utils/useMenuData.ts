import { useSession } from "next-auth/react";
import menuData from "@/components/Header/menuData";
import { Menu } from "@/types/menu"
// Wrapper component to conditionally add WeatherFlex App menu item
const useMenuData = () => {
  const { data: session } = useSession();
  
  // If user is logged in, add WeatherFlex App to menu
  if (session) {
    return [
      ...menuData,
      {
        id: 5,
        title: "WeatherFlex App",
        path: "/weatherflex",
        newTab: false,
      }
    ];
  }
  
  // Return original menu if not logged in
  return menuData;
};

export default useMenuData;