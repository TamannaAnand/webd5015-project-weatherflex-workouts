import { useSession } from "next-auth/react";
import menuData from "@/components/Header/menuData";

const useMenuData = () => {
  const { data: session } = useSession();

  let updatedMenu = [...menuData];

  if (session?.user?.role === "User") {
    updatedMenu.push({
      id: 4,
      title: "WeatherFlex App",
      path: "/weatherflex",
      newTab: false,
    });
  } else if (session?.user?.role === "Admin") {
    updatedMenu.push({
      id: 5,
      title: "Admin Dashboard",
      path: "/adminDashboard",
      newTab: false,
    });
  }

  return updatedMenu;
};

export default useMenuData;