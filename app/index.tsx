import CalendarView from "@/components/CalendarView";
import NodataPage from "@/components/Nodata";
import SearchButton from "@/components/Searchbtton";
import { View } from "react-native";

export default function Index() {
   const handleSportSelect = (sport: string) => {
    console.log("Selected Sport:", sport);
    // yahan tum apna logic laga sakte ho (navigate, filter, etc.)
  };
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      
    >
      {/* <NodataPage/> */}
      {/* <Loader/> */}
      <>
      <SearchButton onSelect={handleSportSelect}/>
      <CalendarView/>
      <NodataPage/>
      </>
    </View>
    
  );
}
