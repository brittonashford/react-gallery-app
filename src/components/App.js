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
      synthesizers: [],
      cats: [],
      chanterelles: [],
      query: '',
      queryResults: []
    };
  }

  componentDidMount() {
    const tagBtns = ["synthesizers", "cats", "chanterelles"];
    tagBtns.map((tag) => this.getPhotos(tag))
    console.log("synth", this.state.synthesizers);
    console.log("cats", this.state.cats);
    console.log("chants", this.state.chanterelles);
  }

  getPhotos(tag) {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      console.log("axios response", tag, response);
      console.log("response.data.photos.photo", response.data.photos.photo);
      this.setState({query: tag})
      if(tag === 'synthesizers'){
        this.setState({synthesizers: response.data.photos.photo})
      } else if(tag === 'cats'){
        this.setState({cats: response.data.photos.photo}) 
      } else if (tag === 'chanterelles'){
        this.setState({chanterelles: response.data.photos.photo})
      }else { 
        this.setState({queryResults: response.data.photos.photo})
      }        
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
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/synthesizers" />} />
          <Route path="/synthesizers" render={() => <PhotoContainer photos={this.state.synthesizers} />} />
          <Route path="/cats" render={() => <PhotoContainer photos={this.state.cats} />} />
          <Route path="/chanterelles" render={() => <PhotoContainer photos={this.state.chanterelles} />} />
          <Route path="/:query" render={() => <PhotoContainer photos={this.state.queryResults} />} />
          <Route component={NotFound} />
        </Switch>

      </div>
    );
  }
}

export default App;
