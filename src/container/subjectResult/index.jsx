import React from 'react';
import { connect } from 'react-redux';
import Briefing from '@component/subjectResult/briefing';
import ResultAnalyse from '@component/subjectResult/resultAnalyse';
import QuestionAnalyse from '@component/subjectResult/questionAnalyse';
import KnowledgePointAnalyse from '@component/subjectResult/knowledgePointAnalyse';
import ImproveSuggestion from '@component/subjectResult/improveSuggestion';

class SubjectResult extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="subject-result">
				{
                    this.props.subjectId ? (
						<div>
							<div className="section-1">
								<Briefing/>
							</div>
							<div className="section-2">
								<ResultAnalyse/>
							</div>
							<div className="section-3">
								<QuestionAnalyse/>
							</div>
							<div className="section-4">
								<KnowledgePointAnalyse/>
							</div>
							<div className="section-5">
								<ImproveSuggestion/>
							</div>
						</div>

					) : ''
				}
			</div>
		)
	}	
}

const mapStateToProps = (state) => {
	return {
		subjectId: state.navigator.subjectId
	}
}

export default connect(mapStateToProps)(SubjectResult);