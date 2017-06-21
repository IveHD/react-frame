import React from 'react';
import { connect } from 'react-redux';
import Briefing from '@component/totalResult/briefing';
import ResultSummary from '@component/totalResult/resultSummary';
import KnowledgePoint from '@component/totalResult/knowledgePoint';
import Conclusion from '@component/totalResult/analyseConclusion';
import './style.less'
class TotalResult extends React.Component{
	componentDidMount () {
		document.title = '穿杨模考';
	}
	render(){
		return (
			<div className="total-result">
				<div className="section-1">
					<Briefing/>
				</div>
				<div className="section-2">
					<ResultSummary/>
				</div>
				<div className="section-3">
					{
						this.props.subject && this.props.subject.length > 0 ? (
							<KnowledgePoint/>

						) : ''
					}
				</div>
				<div className="section-4">
					<Conclusion/>
				</div>
			</div>
		)
	}	
}

const mapStateToProps = (state) => {
	return {
		subject: state.subject.data
	};
}

export default connect(mapStateToProps)(TotalResult)
