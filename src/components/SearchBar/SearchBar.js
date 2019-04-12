import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewd': 'review_count'
}

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeySearch = this.handleKeySearch.bind(this);
    }

    getSortByClass(sortOption){
        if(this.state.sortBy === sortOption){
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortOption, event){
        this.setState({sortBy: sortOption});
        this.handleSearch(event);
    }

    handleTermChange(event){
        this.setState({term: event.target.value});        
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
        
    }

    searchY(event){
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handleSearch(event){
        this.searchY(event);
    }

    handleKeySearch(event){
        if(event.key === 'Enter'){
            this.searchY(event);
        }
    }

    renderSortByOptions(){
        return Object.keys(sortByOptions).map(sortOption => {
            let sortOptionValue = sortByOptions[sortOption];
            return (
                <li key={sortOptionValue} 
                    className={this.getSortByClass(sortOptionValue)} 
                    onClick={this.handleSortByChange.bind(this, sortOptionValue)}>
                    {sortOption}
                </li>
            );
        });
    }

    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
                    <input placeholder="Where?" onChange={this.handleLocationChange} onKeyUp={this.handleKeySearch}/>
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch}>
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;