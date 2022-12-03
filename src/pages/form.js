import React,{ Component } from 'react'
import axios from 'axios';

class Create extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        bookID: '',
        bookTitle: '',
        bookAuthor: '',
      };
    }
  
    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  
    handleSubmit = async e => {
      e.preventDefault();
  
      const { bookID, bookTitle, bookAuthor } = this.state;
  
      const book = {
        bookID,
        bookTitle,
        bookAuthor,
      };
      
      try{
        axios.post('http://localhost:8888/create', book)
      } catch (err){
        console.log(err);
      }
    };
  
    render() {
      return (
        <div>
          <br />
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div style={{ width: '30%' }} className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bookID"
                  placeholder="Book ID"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div style={{ width: '30%' }} className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bookTitle"
                  placeholder="Book Title"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div style={{ width: '30%' }} className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="bookAuthor"
                  placeholder="Book Author"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div style={{ width: '30%' }}>
                <button className="btn btn-success" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Create;