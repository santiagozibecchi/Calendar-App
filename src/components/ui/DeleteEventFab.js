import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDelete } from '../../actions/events';

const DeleteEventFab = () => {

      const dispatch = useDispatch();

      const handleDelete = () => {
            dispatch(eventDelete());
      }

      return (

            <button
                  className='btn btn-danger fab-danger'
                  onClick={handleDelete}
            >
                  <i className='fas fa-trash'></i>
                  <span>Borrar evento</span>
            </button>
      )
}

export default DeleteEventFab