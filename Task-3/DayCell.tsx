import { format, isSameDay, isSameMonth } from 'date-fns';
import { Event } from '../types/event';

interface DayCellProps {
  day: Date;
  currentMonth: Date;
  events: Event[];
  onDateClick: (day: Date) => void;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

export default function DayCell({ 
  day, 
  currentMonth, 
  events, 
  onDateClick, 
  onEventClick 
}: DayCellProps) {
  const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isToday = isSameDay(day, new Date());
  
  return (
    <div 
      onClick={() => onDateClick(day)}
      className={`
        min-h-24 p-2 border border-gray-200
        ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
        ${isToday ? 'border-2 border-blue-500' : ''}
        cursor-pointer hover:bg-gray-50 transition-colors
      `}
    >
      <div className="text-right">
        <span className={`
          inline-flex items-center justify-center rounded-full w-6 h-6
          ${isToday ? 'bg-blue-500 text-white' : ''}
        `}>
          {format(day, 'd')}
        </span>
      </div>
      <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
        {dayEvents.map(event => (
          <div
            key={event.id}
            onClick={(e) => onEventClick(event, e)}
            className="text-xs p-1 rounded truncate"
            style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}