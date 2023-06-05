'use client';

import { useState, useEffect } from 'react';

import ContentCard from './ContentCard'

const ContentCardList = ({ data, handleContentClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((content) => {
        <ContentCard 
          key={content._id}
          content={content}
          handleContentClick={handleContentClick}
        />
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchContents = async () => {
      const response = await fetch('');
      const data = await response.json();

      setContents(data);
    }

    fetchContents();
  }, []);

  return (
    <section className='feed'>
        <form className="relative w-full flex-center">
          <input 
            type="text"
            placeholder="Procure por uma Categoria ou Título"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <ContentCardList 
          data={[contents]}
          handleContentClick={ () => {} }
        />

    </section>
  )
}

export default Feed