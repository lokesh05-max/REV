import { format, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import DayCell from './DayCell';
import { Event } from '../types/event';

interface CalendarGridProps {
  currentMonth: Date;
  monthDays: Date[];
  events: Event[];
  onDateClick: (day: Date) => void;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

export default function CalendarGrid({ 
  currentMonth, 
  monthDays, 
  events, 
  onDateClick,
  onEventClick
}: CalendarGridProps) {
  const weekStart = startOfWeek(monthDays[0]);
  const weekEnd = endOfWeek(monthDays[monthDays.length - 1]);
  
  const days = [];
  let day = weekStart;
  while (day <= weekEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7">
      {weekDays.map((day) => (
        <div key={day} className="p-2 text-center font-semibold bg-gray-100">
          {day}
        </div>
      ))}
      {days.map((day, i) => (
        <DayCell
          key={i}
          day={day}
          currentMonth={currentMonth}
          events={events.filter(event => isSameDay(new Date(event.date), day))}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
}