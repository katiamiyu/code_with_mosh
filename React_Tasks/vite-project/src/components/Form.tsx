// import { useRef } from 'react';
import { useState } from 'react';

const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    age: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(person);
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            value={person.name ?? ''}
            className='form-control'
            onChange={e => setPerson({ ...person, name: e.target.value })}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Age</label>
          <input
            type='number'
            value={person?.age || ''}
            className='form-control'
            onChange={e =>
              setPerson({ ...person, age: parseInt(e.target.value) })
            }
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

/* const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: '', age: 0 };
  return (
    <>
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (nameRef.current) person.name = nameRef.current.value;
            if (ageRef.current) person.age = parseInt(ageRef.current.value);
            console.log(person)
          }}
        >
          <div className='mb-3'>
            <label className='form-label'>Name: </label>
            <input className='form-control' type='text' ref={nameRef} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Age</label>
            <input className='form-control' type='number' ref={ageRef} />
          </div>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}; */

export default Form;
