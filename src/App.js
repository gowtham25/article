import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
	.article-ind-container {
		border: 1px solid #ccc;
	}
	.article-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 10px;
		.active {
			background: blue;
		}
	}
`;

const articleArray = [
	{
		articleId: 1,
		title: "Harry Potter and the Sorcerer’s Stone Review",
		upvotes: 56,
		date: '12/23/2016'
	},

	{
		articleId: 2,
		title: "Harry Potter and the Half Blood Prince Review",
		upvotes: 23,
		date: '12/2/2016'
	},
	{
		articleId: 3,
		title: "Harry Potter and the Goblet of Fire Review",
		upvotes: 3,
		date: '11/2/2017'
	}
];

const articleJSON = {
	articleId: 1,
	content: "Great Book, Among the top 100, childrens’ favorite"
}


function App() {
	const [searchText, setSearchText] = useState('');
	const [articleDetails, setArticleDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [articleIndDetail, setIndArticleDetails] = useState({});

	const getArticle = () => {
		setLoading(true)
		fetch(`/articles?authorName=${searchText}`)
			.then(data => {
				setLoading(false);
				setArticleDetails(articleArray);
			})
			.catch((err) => {
				console.log(123);
			})
	}

	const handleClickTitle = (id) => {
		fetch(`/article/details?articleId=${id}`)
			.then(data => {
				setLoading(false);
				setIndArticleDetails(articleJSON);
			})
			.catch((err) => {
				console.log(123);
			})
	}
	const sort = (key) => {
		const sortData = [...articleArray]
		console.log(sortData);
		setArticleDetails(sortData.sort((a, b) => a[key] - b[key]));
	}
	console.log(articleIndDetail);
	return (
		<AppContainer>
			<div className="App">
				<div className='fetch-container' >
					<input type='text' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} /> <button onClick={() => { getArticle() }} disabled={(loading || searchText) ? false : true} className='fetch-button'>Fetch</button>
					{articleDetails && !articleDetails.lenght && <p>No Articles Found</p>}
					{articleDetails && articleDetails.length > 0 && <div><button onClick={() => { sort('date') }}>Sort by Newest</button><button onClick={() => { sort('upvotes') }}>Sort by Top</button></div>}
					<table className='article-container'>
						{articleDetails && articleDetails.length > 0 && articleDetails.map((aVal, index) => {
							const { articleId, title, upvotes, date } = aVal || {};
							return (
								<div className='article-ind-container' key={articleId}>
									<div className='details-container'>
										<div className='row-container'><div>Title:</div><a onClick={() => handleClickTitle(articleId)}>{title}</a></div>
										<div className='row-container'><div>UpVote:</div><div>{upvotes}</div></div>
										<div className='row-container'><div>Date:</div><div>{date}</div></div>
									</div>
								</div>
							)
						})}
					</table>
				</div>
			</div>
		</AppContainer>
	);
}

export default App;
