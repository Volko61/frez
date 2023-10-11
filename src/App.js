import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState('');
  const [isNewMovieOscar, setIsNewMovieOscar] = useState('');

  //Update Title States
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState('');

  //File upload states
  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, 'movies');
  const getListMovie = async () => {
    //READ THE DATA
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
    //SET THE MOVIE LIST
  };
  useEffect(() => {
    getListMovie();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        gotAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });
      getListMovie();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    try {
      await deleteDoc(movieDoc);
      getListMovie();
    } catch (error) {
      console.error(error);
    }
  };
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    try {
      await updateDoc(movieDoc, { title: updatedMovieTitle });
      getListMovie();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if(!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder='Release date...' type='number' onChange={(e) => setNewReleaseDate(e.target.value)} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>Submit the Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.gotAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder='New title...' onChange={(e) => setUpdatedMovieTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
