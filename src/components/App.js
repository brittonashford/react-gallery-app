import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import '../App.css';
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';
import axios from 'axios';
import apiKey from '../config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      dogs: [],
      birds: [],
      query: '',
      queryResults: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const tagBtns = ["cats", "dogs", "birds"];
    tagBtns.map((tag) => this.getPhotos(tag))
  }

  isLoading = bool => {
    this.setState({isLoading: bool})
  }

  getPhotos =tag => {
    this.isLoading(true);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({query: tag}) //setState DOES NOT work here
      if(tag === 'cats'){
        this.setState({cats: response.data.photos.photo}) //setState works here
      } else if(tag === 'dogs'){
        this.setState({dogs: response.data.photos.photo}) //setState works here
      } else if (tag === 'birds'){
        this.setState({birds: response.data.photos.photo}) //setState works here
      }else { 
        this.setState({queryResults: response.data.photos.photo}) //setState DOES NOT work here
      } 
      this.isLoading(false);       
    })
    .catch(function(error) {
      console.log('An error occurred processing your request.', error);
    })
  }
 

  render(){
    return (
      <div className="container">
        <SearchForm onSearch={this.getPhotos} />
        <MainNav />
        {
          (this.state.isLoading) ? <h2>Loading Images....</h2> :
          (
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/cats" />} />
              <Route path="/cats" render={() => <PhotoContainer photos={this.state.cats} />} />
              <Route path="/dogs" render={() => <PhotoContainer photos={this.state.dogs} />} />
              <Route path="/birds" render={() => <PhotoContainer photos={this.state.birds} />} />
              <Route path="/:query" render={() => <PhotoContainer photos={this.state.queryResults} />} />
              <Route component={NotFound} />
            </Switch>
        )
      }
      </div>
    );
  }
}

export default App;
