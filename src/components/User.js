import React, { useState } from 'react';

export const User = ({ name, email, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(id, evt.target.name.value, evt.target.email.value);
    setIsEdit(!isEdit);
  };

  return (
    <div className="table">
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Title" name="name" defaultValue={name} />
          <input placeholder="Body" name="email" defaultValue={email} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div className="user">
          <tr>
            <td>{name}</td>
            <td>{email}</td>
          </tr>
          {/* <span className="user-name">{name}</span>
          <span className="user-email">{email}</span> */}
          <div>
            <td>
              {' '}
              <button onClick={handleEdit}>Edit</button>
            </td>
            <td>
              {' '}
              <button onClick={handleDelete}>Delete</button>
            </td>
          </div>
        </div>
      )}
    </div>
  );
};
