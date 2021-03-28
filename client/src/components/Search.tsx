import './Search.scss';

export function Search(props: any) {
	return (
		<form className='search' onSubmit={props.handleSubmit}>
			<input value='Search' className='search-btn' type="submit" />{'\
			'}<input className='search-bar' value={props.query} onChange={props.handleChange} />
		</form>
	);
}
