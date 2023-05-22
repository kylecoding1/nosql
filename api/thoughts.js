const express = require('express');
const Thought = require('../models/Thought');

const router = express.Router();

// GET route for retrieving all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find({});
  res.json(thoughts);
});

// POST route for creating a new thought
router.post('/', async (req, res) => {
  const newThought = new Thought(req.body);
  await newThought.save();
  res.status(201).json(newThought);
});

router.post('/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  });
  
  // DELETE route to remove a reaction from a thought
  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === req.params.reactionId);
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json(thought);
  });

// PUT route for updating a thought
router.put('/:id', async (req, res) => {
  const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedThought);
});

// DELETE route for deleting a thought
router.delete('/:id', async (req, res) => {
  await Thought.findByIdAndRemove(req.params.id);
  res.json({ message: 'Thought deleted' });
});

module.exports = router;
