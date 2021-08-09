import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {

  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
      <div className="form-row mb-5 mt-5" style={{display: 'flex', flexDirection: 'row'}}>
          <div className="col-10">
              <input 

                  onChange={this.props.searchMovieProp} 
                  type="text" className="form-control" 
                  placeholder="Seach a movie" 
              />
          </div>
          <div className="col-2">
              <Link to="/add" type="button" 
                      className="btn btn-md btn-danger"
                      style={{float: 'right'}}
                      >Add Movie
              </Link>
          </div>
      </div>
  </form>
    )
  }
}

export default SearchBar
