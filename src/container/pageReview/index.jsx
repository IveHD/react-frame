import React from 'react';
import { connect } from 'react-redux';
import Briefing from '@component/totalResult/briefing';
import PageReviewList from '@component/pageReview/pageReviewList'
class PageReview extends React.Component{
	componentWillMount () {
	}
	render(){
		return (
			<div className="page-review-wrapper">
				<div className="section-1">
					<Briefing/>
				</div>
				<div className="section-2">
					<PageReviewList/>
				</div>
			</div>
		)
	}	
}
const mapStateToProps = (state) => {
	return {};
};
export default connect(mapStateToProps)(PageReview);