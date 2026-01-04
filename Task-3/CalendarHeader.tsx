import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  onToday 
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">Calendar App</h1>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToday}
          className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Today
        </button>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onPrevMonth}
            className="p-2 hover:bg-blue-500 rounded-full"
          >
            &lt;
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button 
            onClick={onNextMonth}
            className="p-2 hover:bg-blue-500 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}