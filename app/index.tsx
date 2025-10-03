import CalendarView from "@/components/CalendarView";
import SearchButton from "@/components/Searchbtton";
import TournamentCard from "@/components/TournamentCard";
import React from "react";
import { FlatList } from "react-native";

const TOURNAMENTS = [
  {
    id: "1",
    title: "Durand Cup 2025",
    sport: "Football",
    startDate: "17 Aug 2025",
    endDate: "19 Aug 2025",
    category: "Domestic",
    logo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
    fixtures: [
      {
        id: "f1",
        homeTeam: "Jamshedpur",
        awayTeam: "Hyderabad",
        homeLogo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
        awayLogo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
        stage: "Quarter Final",
        date: "17 Aug 2025",
        time: "07:10 PM",
        venue: "Saket Sports Club",
      },
    ],
  },
  {
    id: "2",
    title: "European Smash-Sweden 2025",
    sport: "Table Tennis",
    startDate: "20 Aug 2025",
    endDate: "21 Aug 2025",
    category: "International",
    logo: "https://i.ibb.co/nM6kz8b/tabletennis.png",
    fixtures: [],
  },
  {
    id: "3",
    title: "Indian Badminton Sports",
    sport: "Badminton",
    startDate: "23 Aug 2025",
    endDate: "27 Aug 2025",
    category: "National",
    logo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
    fixtures: [],
  },
  {
    id: "4",
    title: "Indian Badminton Sports",
    sport: "Badminton",
    startDate: "23 Aug 2025",
    endDate: "27 Aug 2025",
    category: "National",
    logo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
    fixtures: [],
  },
  {
    id: "5",
    title: "Indian Badminton Sports",
    sport: "Badminton",
    startDate: "23 Aug 2025",
    endDate: "27 Aug 2025",
    category: "National",
    logo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
    fixtures: [],
  },
  {
    id: "6",
    title: "Indian Badminton Sports",
    sport: "Badminton",
    startDate: "23 Aug 2025",
    endDate: "27 Aug 2025",
    category: "National",
    logo: "https://m.media-amazon.com/images/I/51XapeTNtWL.jpg",
    fixtures: [],
  },
];

export default function Index() {
const handleSportSelect = (sport: { id: string | number; name: string }) => {
  // console.log("Selected Sport:", sport.id, sport.name);
  // // setSelectedSport(sport);
};



  return (
    <FlatList
      data={TOURNAMENTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TournamentCard {...item} />}
      contentContainerStyle={{ padding: 12 }}
       showsVerticalScrollIndicator={false} 
      ListHeaderComponent={
        <>
          <SearchButton onSelect={handleSportSelect} />
          <CalendarView />
        </>
      }
    />
  );
}
