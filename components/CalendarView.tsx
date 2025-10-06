import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Loader from "./Loader";
import NodataPage from "./Nodata";
import TournamentCard from "./TournamentCard";

const CalendarView = ({ selectedSport }: { selectedSport: { id: string | number; name: string } | null }) => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);  

  const toISTDateYMD = (iso: string) =>
    new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

  useEffect(() => {
    const fetchTournaments = async () => {
      if (!selectedSport) return;
      setLoading(true);  // ✅ start loader

      try {
        const months = [8, 9, 10];
        let allTournaments: any[] = [];

        for (let m of months) {
          const res = await axios.get(
            `https://stapubox.com/tournament/demo?sports_id=${selectedSport.id}&month=${m}`
          );

          const grouped = res.data?.data || [];
          grouped.forEach((grp: any) => {
            grp.tournaments.forEach((t: any) => {
              // console.log("Tournament Data:", t); 
              allTournaments.push({
                id: t.id.toString(),
                title: t.name,
                sport: grp.sport_name,
                startDate: toISTDateYMD(t.start_date),
                endDate: t.end_date ? toISTDateYMD(t.end_date) : "",
                category: t.level,
                logo: t.tournament_img_url,  
                fixtures: (t.matches || []).map((m: any) => ({
                  id: m.id.toString(),
                  homeTeam: m.team_a,
                  awayTeam: m.team_b,
                  stage: m.stage,
                  date: toISTDateYMD(m.start_date),
                  time: new Date(m.start_date).toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  venue: m.venue,
                  homeLogo: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
                  awayLogo: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
                })),
              });
            });
          });
        }

        setTournaments(allTournaments);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      } finally {
        setLoading(false);  
      }
    };

    fetchTournaments();
  }, [selectedSport]);

  const markedDates = useMemo(() => {
    const marks: any = {};
    tournaments.forEach((t) => {
      marks[t.startDate] = { marked: true, dotColor: "#FF9933" };
    });
    if (selectedDate) {
      marks[selectedDate] = { selected: true, selectedColor: "#FF9933" };
    }
    return marks;
  }, [tournaments, selectedDate]);

  const tournamentsToShow = selectedDate
    ? tournaments.filter((t) => t.startDate === selectedDate)
    : tournaments;

  if (loading) return <Loader />;   

  return (
    <View style={styles.container}>
      <Calendar
        current={"2025-08-01"}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        hideArrows={false}
        renderArrow={(direction) => (
          <Text style={{ color: "#FF9933", fontSize: 30 }}>
            {direction === "left" ? "<" : ">"}
          </Text>
        )}
        markedDates={markedDates}
        theme={{
          backgroundColor: "#FFFFFF",
          calendarBackground: "#FFFFFF",
          textSectionTitleColor: "#FF9933",
          selectedDayBackgroundColor: "#FF9933",
          todayTextColor: "#FF9933",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#FF9933",
          selectedDotColor: "#FFFFFF",
          monthTextColor: "#FF9933",
        }}
      />

      <ScrollView style={{ flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
        {tournamentsToShow.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            <NodataPage/> 
          </Text>
        ) : (
          tournamentsToShow.map((t) => <TournamentCard key={t.id} {...t} />)
        )}
      </ScrollView>
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
