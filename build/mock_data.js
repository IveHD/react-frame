var data = require('./data.json');
function mockApi(app, express){
	var apiRoutes = express.Router();
	apiRoutes.get('/result-summary', function(req, res) {
		res.json(data['result-summary'])
	});
    apiRoutes.get('/subjects', function(req, res) {
        res.json(data['subjects'])
    });
    apiRoutes.get('/analyse-conclusion', function(req, res) {
        res.json(data['analyse-conclusion'])
    });
    apiRoutes.get('/knowledge-point', function(req, res) {
        res.json(data['knowledge-point'])
    });
    apiRoutes.get('/total-briefing', function(req, res) {
        res.json(data['total-briefing'])
    });
    apiRoutes.get('/subject-briefing', function(req, res) {
        res.json(data['subject-briefing'])
    });
    apiRoutes.get('/subject-result-analyse', function(req, res) {
        res.json(data['subject-result-analyse'])
    });
    apiRoutes.get('/question-analyse', function(req, res) {
        res.json(data['question-analyse'])
    });
    apiRoutes.get('/knowledge-point-analyse', function(req, res) {
        res.json(data['knowledge-point-analyse'])
    });
    apiRoutes.get('/improve-suggestion', function(req, res) {
        res.json(data['improve-suggestion'])
    });

    apiRoutes.get('/test-data', function(req, res) {
        res.json(data['test-data'])
    });
    apiRoutes.get('/getSubjectsResultByTestId', function(req, res) {
        res.json(data['subjectsResultByTestId'])
    });



    app.use('/', apiRoutes);
}

module.exports = mockApi;

