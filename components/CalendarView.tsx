import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';


const CalendarView = () => {
  return (
    <View style={styles.container}>
      <Calendar
        current={'2025-10-03'}
        onDayPress={(day) => {
          console.log('Selected day', day);
        }}
        onMonthChange={(month) => {
          console.log('Month changed', month);
        }}
        hideArrows={false}
        // Custom arrows
        renderArrow={(direction) => (
          <Text style={{ color: '#FF9933', fontSize: 30, }}>
            {direction === 'left' ? '<' : '>'}
          </Text>
        )}
        markedDates={{
          '2025-10-03': { selected: true, marked: true, selectedColor: '#FF9933' },
          '2025-10-05': { marked: true, dotColor: '#FF9933' },
        }}
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#FF9933',
          selectedDayBackgroundColor: '#FF9933',
          todayTextColor: '#FF9933',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#FF9933',
          selectedDotColor: '#FFFFFF',
          monthTextColor: '#FF9933',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  
  },
});

export default CalendarView;
