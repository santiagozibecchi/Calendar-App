// Mantener y actualizar los modals
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
      content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
      },
};

Modal.setAppElement('#root');

// config. de como quiero ver la fecha
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
      title: '',
      notes: '',
      start: now.toDate(),
      end: nowPlus1.toDate()
}

const CalendarModal = () => {

      const dispatch = useDispatch();
      const { modalOpen } = useSelector(state => state.ui);
      const { activeEvent } = useSelector(state => state.calendar);

      // toDate es para que lo haga con la fecha actual
      const [dateStart, setDateStart] = useState(now.toDate());
      const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
      const [titleValid, setTitleValid] = useState(true);

      const [formValue, setFormValues] = useState(initEvent);

      const { title, notes, start, end } = formValue;

      // necesito estar pendiente del activeEvente
      useEffect(() => {
            // console.log(activeEvent);
            // como la primera vez regresa null, hago una validacion para que exista
            if (activeEvent) {
                  // si no es null
                  setFormValues(activeEvent);
            } else {
                  // si el activeEvent esta en null:
                  setFormValues(initEvent);
            }

      }, [activeEvent, setFormValues])

      const handleInputChange = ({ target }) => {
            setFormValues({
                  // recibo todos los valore que tiene actualmente el formValue
                  ...formValue,
                  // y unicamente voy a cambiar el que estoy recibiendo como arguemnto
                  // en este evento (el target del event onChange):
                  [target.name]: target.value
                  // entre llaves cuadradas porque quiero computar el nombre de la propiedad
                  // target.value como nuevo valor a esa propiedad
                  //[] valor de la variable
            })
      }

      const closeModal = () => {
            // console.log('Cerrar modal');
            dispatch(uiCloseModal());
            dispatch(eventClearActiveEvent())
            setFormValues(initEvent);
      }

      // recibo un evento que es la fecha
      const handleStartDateChange = (e) => {
            setDateStart(e);
            setFormValues({
                  ...formValue,
                  start: e
            })
      }
      const handleEndDateChange = (e) => {
            setDateEnd(e);
            setFormValues({
                  ...formValue,
                  end: e
            })
      }

      const handleSubmitForm = (e) => {
            e.preventDefault();

            // VALIDACIONES - utilizo moment para ocupar las validaciones que incorpora

            const momentStart = moment(start);
            const momentEnd = moment(end);

            if (momentStart.isSameOrAfter(momentEnd)) {
                  return Swal.fire('Error', 'La fecha final debe de ser mayor a la fecha de inicio')
            }
            if (title.trim().length < 2) {
                  return setTitleValid(false)
            }

            // El active event me sirve para saber si puedo editar o no, ya que si no esta seleccionado esta en null
            if (activeEvent) {
                  dispatch(eventStartUpdate(formValue))
            } else {
                  // creamos una nueva mientras que arriba la actualizamos
                  dispatch(eventStartAddNew(formValue));
            }

            // para que se quite la clase de boostrap
            setTitleValid(true);
            closeModal();
      }

      return (
            <Modal
                  // si esta en true se muestra
                  isOpen={modalOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  closeTimeoutMS={200}
                  className="modal"
                  overlayClassName="modal-fondo"
            >
                  <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
                  <hr />
                  <form
                        className="container"
                        onSubmit={handleSubmitForm}
                  >

                        <div className="form-group">
                              <label>Fecha y hora inicio</label>
                              <DateTimePicker
                                    onChange={handleStartDateChange}
                                    value={dateStart}
                                    className="form-control"
                              />
                        </div>

                        <div className="form-group">
                              <label>Fecha y hora fin</label>
                              {/* Conf. de la fecha final */}
                              <DateTimePicker
                                    onChange={handleEndDateChange}
                                    value={dateEnd}
                                    className="form-control"
                                    // Validaciones
                                    minDate={dateStart}
                              />
                        </div>

                        <hr />
                        <div className="form-group">
                              <label>Titulo y notas</label>
                              <input
                                    type="text"
                                    className={`form-control ${!titleValid && 'is-invalid'}`}
                                    placeholder="Título del evento"
                                    name="title"
                                    autoComplete="off"
                                    value={title}
                                    onChange={handleInputChange}
                              />
                              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                        </div>

                        <div className="form-group">
                              <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Notas"
                                    rows="5"
                                    name="notes"
                                    value={notes}
                                    onChange={handleInputChange}
                              ></textarea>
                              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                        </div>

                        <button
                              type="submit"
                              className="btn btn-outline-primary btn-block"
                        >
                              <i className="far fa-save"></i>
                              <span> Guardar</span>
                        </button>

                  </form>
            </Modal>
      )
}

export default CalendarModal