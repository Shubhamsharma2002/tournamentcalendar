import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CalendarView from "@/components/CalendarView";
import SearchButton from "@/components/Searchbtton";

export default function Index() {
  const [selectedSport, setSelectedSport] = useState<{ id: string | number; name: string } | null>(null);

  const handleSportSelect = (sport: { id: string | number; name: string }) => {
    console.log("Selected Sport:", sport.id, sport.name);
    setSelectedSport(sport);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown */}
      <SearchButton onSelect={handleSportSelect} />

      {/* Calendar + Tournament list */}
      {selectedSport ? (
        <CalendarView selectedSport={selectedSport} />
      ) : (
        <Text style={styles.placeholder}>Please select a sport</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  placeholder: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
