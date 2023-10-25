import React, {useState } from "react";
import axios from "axios";
import './App.css';


const Searchbook = () => {
  const [searchData, setSearchData] = useState(null);
  const [endPoint, setEndPoint] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${endPoint}&key=AIzaSyCPQ5VTALlFIBtiq4QhUMSRVaFSM1xnM1o`);
      setSearchData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearchChange = (e) => {
    setEndPoint(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
     <section className="one">
        <img className="book" src="https://cdn.pixabay.com/photo/2017/07/02/09/03/books-2463779_1280.jpg" alt="Books"  />
        <h2> Les livres sont la lumière qui éclaire notre chemin dans l'obscurité de l'ignorance.<br/><span>"Bernd Schuster"</span></h2>  
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={endPoint}
            onChange={handleSearchChange}
            placeholder="Rechercher un livre"
          />
          <button type="button" onClick={handleSubmit}>Rechercher</button>
        </form>

       
    </section>
    <h3 className="titre">Liste des livres</h3>
    
      {searchData !== null ?  ( 
        <div className="cardsearch">
          {searchData.items && searchData.items.length > 0 ? (
            searchData.items.map((book) => (
              <div key={book.id} className="card">
                <p>Titre : {book.volumeInfo.title}</p>
                <p>Auteur(s) : {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Inconnu"}</p>
                <img
                  src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ""}
                  alt={`Miniature de ${book.volumeInfo.title}`}
                />
              <p>Prix : {book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Non disponible"}</p>
              </div>
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
      ) : (
        <p>Chargement des données des livres disponibles dans quelque secondes...</p>
      )}
    
  </>
  );
};

export default Searchbook;
