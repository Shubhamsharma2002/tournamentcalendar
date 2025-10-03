import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onSelect: (sport: string) => void;
}

const sportsList = ["Football", "Badminton", "Cricket", "Tennis", "Hockey"];

const SearchButton = ({ onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSports = sportsList.filter((sport) =>
    sport.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Input field */}
      <View style={styles.searchContainer}>
       
        <TextInput
          style={styles.input}
          placeholder="Search your sport"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown list */}
      {showDropdown && (
        <View style={styles.dropdown}>
          {filteredSports.length > 0 ? (
            filteredSports.map((sport, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(sport);
                  setQuery(sport);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{sport}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResult}>No sport found</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
container: {
  marginVertical: 10,
  zIndex: 100,
  width: "100%",
  position: "relative",
   // ✅ important
},

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF8F2",
    height: 50,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
 dropdown: {
  position: "absolute",   // ✅ make it float
  top: 50,                // ✅ just below input box
  left: 0,
  right: 0,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  backgroundColor: "#fff",
  elevation: 5,
  zIndex: 1000,           // ✅ higher than calendar
},

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  noResult: {
    padding: 12,
    textAlign: "center",
    color: "#999",
  },
});
