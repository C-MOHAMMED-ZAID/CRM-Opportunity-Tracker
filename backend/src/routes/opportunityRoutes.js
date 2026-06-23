const express = require('express');
const {
  createOpportunity,
  deleteOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
} = require('../controllers/opportunityController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createOpportunity).get(getOpportunities);
router
  .route('/:id')
  .get(getOpportunityById)
  .put(updateOpportunity)
  .delete(deleteOpportunity);

module.exports = router;
