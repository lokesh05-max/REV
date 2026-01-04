import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Event } from '../types/event';

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#ef4444', label: 'Red' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Yellow' },
  { value: '#8b5cf6', label: 'Purple' },
];

interface EventModalProps {
  date: Date | null;
  event: Event | null;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete?: (id: string) => void;
}

export default function EventModal({ 
  date, 
  event, 
  onClose, 
  onSave, 
  onDelete 
}: EventModalProps) {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [color, setColor] = useState(event?.color || colorOptions[0].value);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setColor(event.color);
    } else {
      setTitle('');
      setDescription('');
      setColor(colorOptions[0].value);
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      date,
      color,
    });
  };

  if (!date) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            {event ? 'Edit Event' : 'Add Event'}
          </h2>
          <p className="text-gray-500">
            {format(date, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Event title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Event description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full transition-all ${color === option.value ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:opacity-90'}`}
                  style={{ backgroundColor: option.value }}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <div>
              {event && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {event ? 'Update' : 'Add'} Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}