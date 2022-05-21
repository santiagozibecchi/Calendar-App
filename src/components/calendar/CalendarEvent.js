import React from 'react'

// en el event recibo todo el objeto
const CalendarEvent = ({ event }) => {

      const { title, user } = event;


      return (
            <div>
                  <span>{title}</span>
                  <strong>- {user.name}</strong>
            </div>
      )
}

export default CalendarEvent