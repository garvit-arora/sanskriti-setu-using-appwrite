import React from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../css/CulturalCalendar.css";

const hardcodedEvents = [
  { title: 'Navratri', date: '2025-10-03', color: '#F59E0B' },
  { title: 'Dussehra', date: '2025-10-12', color: '#F87171' },
  { title: 'Diwali', date: '2025-11-02', color: '#FBBF24' },
  { title: 'Bhai Dooj', date: '2025-11-04', color: '#34D399' },
  { title: 'Holi', date: '2025-03-12', color: '#F472B6' },
];

const CulturalCalendar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-6 mx-auto max-w-7xl"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Cultural Calendar
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={hardcodedEvents} // only hardcoded events here
        height={650}
        eventTextColor="#fff"
        selectable={true}
        dayMaxEvents={true}
      />
    </motion.div>
  );
};

export default CulturalCalendar;
