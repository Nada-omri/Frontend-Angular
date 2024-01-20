import './Articles.css';
import Products from './Products';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import  FilterBy from '../filter/FilterBy';
import data from './MOCK_DATA.json';

function App() {
  
  const [sortedData, setSortedData] = useState([]);
  const [articles, setArticles]=useState(data.slice(0,30));
  const [pageNumber, setPageNumber]= useState(0);

  const articlesPerPage=6;
  const pagesVisited = pageNumber * articlesPerPage;
  function handleFilteredData(data) {
    setSortedData(data);
  }

  // useEffect(() => {
  //   fetch("/MOCK_DATA.json")
  //     .then((response) => response.json())
  //     .then((data) => setSortedData(data));
  // }, []);


  const displayArticles = articles.slice(pagesVisited, pagesVisited + articlesPerPage).map((article)=>{
    return (

      <div className='Article'>
        <img/>
        <div className='title'>{article.title}</div>
        <div className='price'>Price : {article.price}</div>
        <button className='seeMore'>See more</button>    
      </div>
    );
  });
  const pageCount = Math.ceil(articles.length/
  articlesPerPage);
  const changePage=({selected})=>{
    setPageNumber(selected);
  }
  return (
    <div className="App">
      
      <Products/> <div className='dix'>
      <h2 className='bbb'>Showing all products</h2>
      <FilterBy  className="btnxx"></FilterBy></div>
      <div className='displayArticles'>
      {displayArticles}
      </div>
      <br/>
      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationButtons"}
      previousLinkClassName={'nextButton'}
      activeClassName={"paginationActive"}
      />
    </div>
  );
     
}

export default App;