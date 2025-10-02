import CalendarView from "@/components/CalendarView";
import NodataPage from "@/components/Nodata";
import { View } from "react-native";

export default function Index() {
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
      <CalendarView/>
      <NodataPage/>
      </>
    </View>
    
  );
}
