'use client';

import { useState, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { Event } from './types/event';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Load events from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('calendarEvents');
      if (savedEvents) {
        try {
          const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
            ...event,
            date: new Date(event.date)
          }));
          setEvents(parsedEvents);
        } catch (error) {
          console.error('Error parsing saved events:', error);
        }
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && events.length > 0) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    }
  }, [events]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const prevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Omit<Event, 'id'>) => {
    if (!selectedDate) return;
    
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => 
        prev.map(e => 
          e.id === selectedEvent.id 
            ? { ...event, id: selectedEvent.id, date: selectedDate }
            : e
        )
      );
    } else {
      // Add new event
      const newEvent: Event = {
        ...event,
        id: uuidv4(),
        date: selectedDate
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <CalendarHeader 
          currentMonth={currentMonth} 
          onPrevMonth={prevMonth} 
          onNextMonth={nextMonth} 
          onToday={goToToday} 
        />
        
        <CalendarGrid 
          currentMonth={currentMonth}
          monthDays={monthDays}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </div>

      {isModalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          onDelete={selectedEvent ? () => handleDeleteEvent(selectedEvent.id) : undefined}
        />
      )}
    </main>
  );
}