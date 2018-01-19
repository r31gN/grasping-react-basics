const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const express = require('express');
const router = express.Router();

const filePath = path.join(__dirname, '../data/puppies.json');

const services = require('../services/services');
let STARTING_ID = services.determineStartingId();

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

/**
 * GET Calls
 */
router.get('/', async (req, res) => {
  try {
    let puppies = await readFileAsync(filePath, 'utf8');
    puppies = JSON.parse(puppies);

    return res.send(puppies);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let puppies = await readFileAsync(filePath, 'utf8');
    puppies = JSON.parse(puppies);

    const puppy = puppies.find(el => el.id == parseInt(req.params.id, 10));

    if (puppy) {
      return res.send(puppy);
    }

    return res.status(404).send({ message: 'No puppy found.' });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

/**
 * POST Call
 */
router.post('/', async (req, res) => {
  try {
    const puppy = {
      id: STARTING_ID++,
      name: req.body.name,
      type: req.body.type,
      adopted: false
    };

    let puppies = await readFileAsync(filePath, 'utf8');
    puppies = JSON.parse(puppies);
    puppies.push(puppy);
    await writeFileAsync(filePath, JSON.stringify(puppies));

    return res.send(puppy);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

/**
 * PUT Call
 */
router.put('/:id', async (req, res) => {
  try {
    let puppies = await readFileAsync(filePath, 'utf8');
    puppies = JSON.parse(puppies);

    const indexOfPuppy = puppies.findIndex(
      el => el.id == parseInt(req.params.id, 10)
    );

    if (indexOfPuppy === -1) {
      return res.status(404).send({ message: 'No puppy found.' });
    }

    const puppy = Object.assign(puppies[indexOfPuppy], {
      name: req.body.name,
      type: req.body.type,
      adopted: req.body.adopted
    });
    puppies[indexOfPuppy] = puppy;
    await writeFileAsync(filePath, JSON.stringify(puppies));

    return res.send(puppy);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

/**
 * DELETE Call
 */
router.delete('/:id', async (req, res) => {
  try {
    let puppies = await readFileAsync(filePath, 'utf8');
    puppies = JSON.parse(puppies);

    const indexOfPuppy = puppies.findIndex(
      el => el.id == parseInt(req.params.id, 10)
    );

    if (indexOfPuppy === -1) {
      return res.status(404).send({ message: 'No puppy found.' });
    }

    puppies = [
      ...puppies.slice(0, indexOfPuppy),
      ...puppies.slice(indexOfPuppy + 1)
    ];
    await writeFileAsync(filePath, JSON.stringify(puppies));

    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
