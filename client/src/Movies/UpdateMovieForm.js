import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}



export default function UpdateMovieForm(props) {
    const [movie, setMovie] = useState(initialItem);
    const { id } =useParams();
    const history = useHistory();

  useEffect(()=> {
      axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res=> setMovie(res.data))
            .catch(err => console.log(err))
  },[id])
    
  const handleChanges = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value})

  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`,movie)
        .then(()=> {
            props.getMovieList();
            props.history.push(`/movies/${id}`);
        })
        .catch(err => console.log(err))


  }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={handleChanges}
                placeholder="Title"
                value={movie.title}
                
                />

                <input
                type="text"
                name="director"
                onChange={handleChanges}
                placeholder="Director"
                value={movie.director}
                
                />

<input
                type="text"
                name="metascore"
                onChange={handleChanges}
                placeholder="Metascore"
                value={movie.metascore}
                
                />

{/* <input
                type="text"
                name=""
                onChange={handleChanges}
                value=
                
                /> */}

                <button type="submit">Edit</button>

            </form>
            
        </div>
    )
}



