import React, { useEffect, useState } from 'react';
import { User } from './components/User';
import { AddUser } from './components/AddUser';
import './styles.css';
import axios from 'axios';
export default function App() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  //console.log(users)
  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   await fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.log(error));
  // };
  const fetchData = async () => {
    const { data } = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setUsers(response.data);
      });
    // setUsers(data);
  };

  const onAdd = async (name, email) => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: name,
        body: email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  const searchShows = (search) => {
    setSearch(search);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${search}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const onAdd = async (name, email) => {
  //   const data = {
  //     title: name,
  //     body: email
  //   }
  //   // await fetch('https://jsonplaceholder.typicode.com/posts', {
  //     axios.post('https://jsonplaceholder.typicode.com/posts', data).then(res => {
  //     // method: 'POST',
  //     // body: JSON.stringify({
  //     //   title: name,
  //     //   body: email,
  //     // })
  //     // headers: {
  //     //   'Content-type': 'application/json; charset=UTF-8',
  //     // },
  //   })
  //     .then((response) => {
  //       if (response.status !== 201) {
  //         return;
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       setUsers((users) => [...users, data]);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const onEdit = async (id, name, email) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.title = name;
            user.body = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <AddUser onAdd={onAdd} />

      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          name={user.title}
          email={user.body}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
