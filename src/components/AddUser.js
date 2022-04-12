import React from 'react';

export const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAdd(evt.target.name.value, evt.target.email.value);
    evt.target.name.value = '';
    evt.target.email.value = '';
  };

  const searchShows = (e) => {
    e.preventDefault();
    searchShows(e.target.value);
    e.target.value = '';
    e.target.value = '';
  };

  return (


    <form onSubmit={handleOnSubmit}>
      <h3>Add User</h3>
      <input placeholder="Title" name="name" />
      <input placeholder="Body" name="email" />
      <button onSubmit={handleOnSubmit}>Add</button>
      <hr />
      <div className="col-xs-12 col-md-3">
         <input type="text" className="form-control" placeholder="Search" value={} onChange={e => searchShows(e.target.value)} />      
       </div>
    </form>
    
  );
};
