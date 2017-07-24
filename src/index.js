import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'; 
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAAYGUJBqC3-JgMj-xibFGNHRv9dC6EySk';

//create one component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {videos:[],
			selectedVideo: null,
		};
		this.videoSearch('淘气');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY,term:term},(videos) => {
			console.log(videos);
			this.setState({videos:videos,
				selectedVideo:videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term)=>this.videoSearch(term),300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}


//show on the page(in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));