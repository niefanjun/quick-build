import React from 'react';
import './home.less';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: 'hello world1'
		}
	}
	render() {
		const { word } = this.state;
		return (
			<div className="App">
				{ word }
			</div>
		)
	}
}

export default Home;