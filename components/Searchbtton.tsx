import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onSelect: (sport: { id: string; name: string }) => void;
}

const SearchButton = ({ onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [sportsList, setSportsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch sports list
  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://stapubox.com/sportslist");
        setSportsList(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching sports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  // filter sports by query
  const filteredSports = sportsList.filter((sport) =>
    (sport.sport_name ?? sport.name ?? "")
      .toLowerCase()
      .includes(query.toLowerCase())
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

      {/* Dropdown */}
      {showDropdown && (
        <View style={styles.dropdown}>
          {loading ? (
            <Text style={styles.noResult}>Loading...</Text>
          ) : filteredSports.length > 0 ? (
            filteredSports.map((sport, index) => {
              const id = sport.sports_id ?? sport.id ?? sport.sport_id; // ✅ fixed
              const name = sport.sport_name ?? sport.name;              // ✅ fixed
              return (
                <TouchableOpacity
                  key={id ?? index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect({ id, name });
                    setQuery(name);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{name}</Text>
                </TouchableOpacity>
              );
            })
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
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    zIndex: 1000,
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
