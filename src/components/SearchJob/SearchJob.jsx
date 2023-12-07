import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './../Pagination/Pagination';
import axios from 'axios';
import './SearchJob.scss';

const SearchJob = ()=>{
  const [searchRecords, setSearchRecords] = useState(
    JSON.parse(localStorage.getItem('searchRecords')) || []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title:'',
    location:''
});

let PageSize = 10;

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async() =>{
    try {
      const response = await axios.get("https://skillsyncio-5e3c537e9de3.herokuapp.com/jobs/", {params: formData});
      console.log(response.data)
      setSearchRecords(response.data);
      localStorage.setItem('searchRecords', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    // Check if search records exist in local storage
  const storedRecords = JSON.parse(localStorage.getItem('searchRecords'));
  if (storedRecords) {
    // If search records exist, set them in the state
    setSearchRecords(storedRecords);
  } else{
    handleSearch();
  }
    
  }, []);

  const currentTableData = useMemo(() => {
    if (!searchRecords) {
      return [];
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchRecords?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchRecords]);

    return (
        <>
         <div className='job-search-wrapper'>
          <div className='job-search-wrapper__search-bar'>
            
            <div>
              
              <input  className='job-search-wrapper__search-input' 
                      onChange={handleChange}
                      type="text" 
                      name='title' 
                      placeholder='Job Title'
                      />
            </div>
            <div className=''>
             
              <input  className='job-search-wrapper__search-input' 
                      type="text" 
                      name='location' 
                      placeholder='Location'
                      onChange={handleChange}
                      />
            </div>
            <button className='job-search-wrapper__search-btn'
            onClick={handleSearch}
            >Search</button>
           
          </div>
          <h1>Job Listings</h1>
          <ul className='job-search-wrapper__job-list'>
                {currentTableData?.map(job => (
                    <>
                    <li className='job-search-wrapper__job-item' key={job.id}>
                      <div className='job-search-wrapper__container'>
                        <div className='job-search-wrapper__card'>
                        <Link className='job-search-wrapper__job-item-link' to={`/${job.id}/${job.title}/${job.company}`}>
                            {job.title} - {job.company}
                        </Link>

                        </div>
                        <div className='job-search-wrapper__card'>
                          <p className='job-search-wrapper__item'>{job.location}</p>
                        </div>
                        <div className='job-search-wrapper__card'>
                          <p className='job-search-wrapper__item'>{job.date}</p>
                        </div>

                        {/* <div className='job-search-wrapper__card'>
                          <p className='job-search-wrapper__item'>{job.link}</p>
                        </div> */}
                      </div>
                    </li>
                    <li className='job-search-wrapper__h-line'></li>
                    </>
                ))}
            </ul>
            {searchRecords && ( 
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={searchRecords.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            )}
        </div>
        </>
    );
}

export default SearchJob;