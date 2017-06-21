import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import LineTitle from '@component/common/lineTitle';
import ECharts from '@component/common/ECharts';
import { fetchKnowledgePointAnalyse } from '@src/action/subjectResult';
import Table from 'antd/lib/table';
import 'antd/lib/table/style';
import Tab from '@component/common/tab/index';
let TabPane = Tab.TabPane;
let TabContainer = Tab.TabContainer;

class KnowledgePointAnalyse extends React.Component {
    render () {
        let {
            chartOption = {},
            dataSource = [],
            columns = []
        } = this.props;
        return (
            <div className="knowledge-point-analyse-wrapper">
                <LineTitle style={{color: '#afcaca'}}>知识点分析</LineTitle>
                <div className="knowledge-point-analyse-vice-wrapper">
                    <TabContainer>
                        <TabPane tabText="总分" tabValue="1">
                            <ECharts style={{ width: '980px', height: '550px'}} option={chartOption}/>
                        </TabPane>
                        <TabPane tabText="分科" tabValue="2">
                            <div>
                                <Table pagination={false} dataSource={dataSource} columns={columns}/>
                            </div>
                        </TabPane>
                    </TabContainer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chartOption: state.knowledgePointAnalyse.chartOption,
        columns: state.knowledgePointAnalyse.columns,
        dataSource: state.knowledgePointAnalyse.dataSource
    }
};

export default connect(mapStateToProps)(KnowledgePointAnalyse);
