const Opportunity = require('../models/Opportunity');

const createOpportunity = async (req, res) => {
  try {
    const {
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    } = req.body;

    if (!customerName || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and requirement are required',
      });
    }

    const opportunity = await Opportunity.create({
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while creating opportunity',
    });
  }
};

const getOpportunities = async (req, res) => {
  try {
    // const opportunities = await Opportunity.find({ owner: req.user._id }).sort({
    //   createdAt: -1,
    // });
    const opportunities = await Opportunity.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching opportunities',
    });
  }
};

const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching opportunity',
    });
  }
};

const updateOpportunity = async (req, res) => {
  try {
    const allowedUpdates = [
      'customerName',
      'contactName',
      'contactEmail',
      'contactPhone',
      'requirement',
      'estimatedValue',
      'stage',
      'priority',
      'nextFollowUpDate',
      'notes',
    ];

    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const opportunity = await Opportunity.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Opportunity updated successfully',
      data: opportunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while updating opportunity',
    });
  }
};

const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Opportunity deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting opportunity',
    });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
