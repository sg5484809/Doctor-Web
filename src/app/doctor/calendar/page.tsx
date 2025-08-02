'use client';

import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

type EventType = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
};

const DoctorCalendar = () => {
  const [appointments, setAppointments] = useState<EventType[]>([]);
  const [currentView, setCurrentView] = useState<Views>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      const parsed = JSON.parse(stored);
      const formatted = parsed.map((appt: any) => {
        const start = new Date(`${appt.appointmentDate} ${appt.appointmentTime}`);
        const end = new Date(start.getTime() + 30 * 60 * 1000);
        return {
          id: appt.id,
          title: `${appt.name} (${appt.status || 'pending'})`,
          start,
          end,
          status: appt.status || 'pending',
        };
      });
      setAppointments(formatted);
    }
  }, []);

  const updateLocalStorageFromEvents = (updatedEvents: EventType[]) => {
    const stored = localStorage.getItem('appointments');
    if (!stored) return;

    const original = JSON.parse(stored);
    const updated = original.map((orig: any) => {
      const updatedEvent = updatedEvents.find((e) => e.id === orig.id);
      if (updatedEvent) {
        return {
          ...orig,
          appointmentDate: moment(updatedEvent.start).format('YYYY-MM-DD'),
          appointmentTime: moment(updatedEvent.start).format('hh:mm A'),
          status: updatedEvent.status,
        };
      }
      return orig;
    });

    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    const updated = appointments.map((appt) =>
      appt.id === event.id
        ? {
            ...appt,
            start,
            end,
          }
        : appt
    );
    setAppointments(updated);
    updateLocalStorageFromEvents(updated);
  };

  const handleDoubleClickEvent = (event: EventType) => {
    setSelectedEvent(event);
    setNewStatus(event.status);
  };

  const handleStatusSubmit = () => {
    if (!selectedEvent || !['seen', 'cancelled', 'pending'].includes(newStatus)) return;

    const updatedEvents = appointments.map((appt) =>
      appt.id === selectedEvent.id
        ? {
            ...appt,
            status: newStatus,
            title: appt.title.split(' (')[0] + ` (${newStatus})`,
          }
        : appt
    );

    setAppointments(updatedEvents);
    updateLocalStorageFromEvents(updatedEvents);
    setSelectedEvent(null);
    setNewStatus('');
  };

  const eventStyleGetter = (event: EventType) => {
    const today = moment().startOf('day');
    const eventDate = moment(event.start).startOf('day');

    let backgroundColor = '#60a5fa'; // upcoming
    if (eventDate.isSame(today)) backgroundColor = '#10b981'; // today
    else if (eventDate.isBefore(today)) backgroundColor = '#f97316'; // past

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '4px',
        padding: '4px',
        fontWeight: 'bold',
      },
    };
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Doctor Appointment Calendar
        </h1>

        <div className="mb-4 flex justify-center gap-4">
          {['month', 'week', 'day'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view as Views)}
              className={`px-4 py-2 rounded ${
                currentView === view ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-950'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ height: '75vh' }}>
          <DnDCalendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            view={currentView}
            onView={(view) => setCurrentView(view)}
            views={['month', 'week', 'day']}
            date={currentDate}
            onNavigate={(newDate) => setCurrentDate(newDate)}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={handleDoubleClickEvent}
            onEventDrop={handleEventDrop}
            resizable={false}
            draggableAccessor={() => true}
          />
        </div>

        {/* Form modal below the calendar */}
        {selectedEvent && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border p-4 rounded shadow-md z-50">
            <h2 className="font-semibold mb-2 text-cyan-950">Update Status for: {selectedEvent.title}</h2>
            <div className="flex gap-4 mb-2 text-indigo-950">
              {['seen', 'pending', 'cancelled'].map((status) => (
                <label key={status} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newStatus === status}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  {status}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleStatusSubmit}
              >
                Set
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-1 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default DoctorCalendar;
