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
  constructor() {
    super();
    this.state = {
      synthesizers: [],
      cats: [],
      chanterelles: [],
      query: '',
      queryResults: []
    };
  }

  componentDidMount() {
    this.getPhotos('cats');
  }

  getPhotos(query) {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(function (response) {
        console.log(response);
    })
    .catch(function(error) {
      console.log('An error occured processing your request.', error);
    })
  }
 

  render(){
    return (
      <div className="container">
        <SearchForm onSearch={ this.getPhotos } />
        <MainNav />
        <Switch>
          <Route path="/" render={ () => <Redirect to="/synths" />} />
          <Route path="/synthesizers" render={ () => <PhotoContainer query="synthesizers" data={ this.state.synths } /> } />
          <Route path="/cats" render={ () => <PhotoContainer query="cats" data={ this.state.tuxedoCats } /> } />
          <Route path="/chanterelles" render={ () => <PhotoContainer query="chanterelles" data={ this.state.chanterelles } /> } />
          <Route path="/:query" render={ () => <PhotoContainer query={ this.state.query } data={ this.state.queryResults } /> } />
          <Route component={ NotFound } />
        </Switch>

      </div>
    );
  }
}

export default App;
