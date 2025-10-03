import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Chip, Divider, IconButton, Text } from "react-native-paper";

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  stage: string;
  date: string;
  time: string;
  venue: string;
}

interface TournamentCardProps {
  id: string;
  title: string;
  sport: string;
  startDate: string;
  endDate: string;
  category: string;
  logo: string;
  fixtures: Fixture[];
}

const TournamentCard = ({
  title,
  sport,
  startDate,
  endDate,
  category,
  logo,
  fixtures,
}: TournamentCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getCategoryColor = () => {
    switch (category) {
      case "Domestic":
        return "#f25c05";
      case "International":
        return "#007bff";
      case "National":
        return "#28a745";
      default:
        return "#444";
    }
  };

  return (
    <Card style={styles.card}>
      {/* Header */}
      <Card.Title
        title={title}
        titleStyle={styles.title}
        subtitle={
          <View>
            <Text style={styles.sport}>{sport}</Text>
            <Text style={styles.date}>
              {startDate} - {endDate}
            </Text>
          </View>
        }
        left={() => (
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri:
                  logo && logo.trim() !== ""
                    ? logo
                    : "https://cdn-icons-png.flaticon.com/512/616/616408.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}
        right={() => (
          <View style={styles.rightBox}>
            <IconButton
              icon="heart-outline"
              size={20}
              onPress={() => {}}
              style={{ margin: 0, padding: 0 }}
            />
            <Text
              style={[
                styles.category,
                { color: getCategoryColor(), marginTop: 2 },
              ]}
            >
              {category}
            </Text>
          </View>
        )}
      />

      {/* Expand/Collapse Button */}
      <Divider />
      <IconButton
        icon={expanded ? "chevron-up" : "chevron-down"}
        size={22}
        onPress={() => setExpanded(!expanded)}
        style={styles.expandBtn}
        iconColor="#f25c05"
      />

      {/* Expanded Fixture View */}
      {expanded &&
        fixtures.map((fixture) => (
          <View key={fixture.id} style={styles.fixtureBox}>
            {/* Fixture Header */}
            <View style={styles.fixtureHeader}>
              <Text style={styles.fixtureTitle}>
                {fixture.homeTeam} vs {fixture.awayTeam}
              </Text>
              <Chip
                mode="outlined"
                style={styles.stageChip}
                textStyle={{
                  color: "#f25c05",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {fixture.stage}
              </Chip>
            </View>

            {/* Logos */}
            <View style={styles.teamsRow}>
              <Image
                source={{ uri: fixture.homeLogo }}
                style={styles.teamLogo}
              />
              <Text style={styles.vs}>VS</Text>
              <Image
                source={{ uri: fixture.awayLogo }}
                style={styles.teamLogo}
              />
            </View>

            {/* Date + Time */}
            <Card mode="outlined" style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconButton icon="calendar" size={16} />
                <Text style={styles.infoText}>{fixture.date}</Text>
                <IconButton icon="clock-outline" size={16} />
                <Text style={styles.infoText}>{fixture.time}</Text>
              </View>
              <View style={[styles.infoRow, { marginTop: 4 }]}>
                <IconButton icon="map-marker-outline" size={16} />
                <Text style={styles.infoText}>{fixture.venue}</Text>
              </View>
            </Card>
          </View>
        ))}
    </Card>
  );
};

export default TournamentCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
  logoContainer: {
    width: 55,
    height: 55,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden", 
    backgroundColor: "#eee", 
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },
  sport: {
    fontSize: 13,
    color: "#f25c05",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  rightBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
  },
  expandBtn: {
    alignSelf: "center",
    marginVertical: -6,
  },
  fixtureBox: {
    padding: 12,
  },
  fixtureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fixtureTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  stageChip: {
    borderColor: "#f25c05",
    backgroundColor: "#fff",
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  teamsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  teamLogo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  vs: {
    marginHorizontal: 12,
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
  },
  infoCard: {
    marginTop: 8,
    borderRadius: 10,
    borderColor: "#FF9933",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#333",
    marginRight: 10,
  },
});
