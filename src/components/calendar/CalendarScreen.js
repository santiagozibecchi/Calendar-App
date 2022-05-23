import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import NavBar from '../ui/NavBar';
import { messages } from "../../helpers/calendar-messeger-spanish";
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

      const dispatch = useDispatch();
      const { events, activeEvent } = useSelector(state => state.calendar);
      // TODO leer los eventos del ST y mostrar en el calendario


      // Mantener el estado de que cuando una variable cambie
      // actualize las cosas
      const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

      // EVENTOS
      const onDoubleClick = (e) => {
            dispatch(uiOpenModal())
            // console.log(e);
      }
      const onSelectEvent = (e) => {
            dispatch(eventSetActive(e));
      }

      // Este evento esta capturando la pantalla donde estoy
      // capturo y guardo la ultima vista en el LS.
      const onViewChange = (e) => {
            // Si la vista cambia, se ejecuta el estado y guarda nuevamente en LS.
            setLastView(e);
            localStorage.setItem('lastView', e);
      }

      const onSelectSlot = (e) => {
            dispatch(eventClearActiveEvent())
      }

      const eventStyleGetter = (event, start, end, isSelected) => {

            const style = {
                  backgroundColor: '#367CF7',
                  borderRadius: '0px',
                  opacity: 0.8,
                  display: 'block',
                  color: 'white'
            }
            return {
                  style
            }
      }

      return (
            <div className='calendar-screen'>
                  <NavBar />

                  <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        messages={messages}
                        eventPropGetter={eventStyleGetter}
                        components={{
                              event: CalendarEvent
                        }}
                        view={lastView}
                        onDoubleClickEvent={onDoubleClick}
                        onSelectEvent={onSelectEvent}
                        onSelectSlot={onSelectSlot}
                        selectable={true}
                        onView={onViewChange}
                  />

                  <AddNewFab />

                  {
                        (activeEvent) && <DeleteEventFab />
                  }


                  <CalendarModal />
            </div>
      )
}

export default CalendarScreen