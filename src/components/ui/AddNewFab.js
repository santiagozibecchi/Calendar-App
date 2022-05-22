import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

const AddNewFab = () => {

      const dispatch = useDispatch();

      const handleOnClickModel = () => {
            dispatch(uiOpenModal());
      }

      return (
            <button
                  className='btn btn-primary fab'
                  onClick={handleOnClickModel}
            >
                  <i className='fas fa-plus'></i>
            </button>
      )
}

export default AddNewFab;