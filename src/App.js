import React from "react";
import { Grid } from "@material-ui/core";
import youtube from "./api/youtube";
import { Searchbar, VideoDetail, VideoList } from "./components";
class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  //The componentDidMount() method is called after the component is rendered.
  componentDidMount() {
    this.handleSubmit("");
  }
  handleSubmit = async (searchTerm) => {
    //axios instance - youtube.get - baseUrl+search
    //q- query ? searchTerm
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyBpLtCXcnmHnim4rgBg53vjNFLkipUyOt0",
        q: searchTerm,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    const { selectedVideo, videos } = this.state;

    return (
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Searchbar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
