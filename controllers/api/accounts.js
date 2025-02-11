const Account = require('../../models/account');

module.exports = {
  create,
  update,
  delete: deleteAccount,
  index,
  show,
};

async function create(req, res) {
  try {
    const account = await Account.create({ ...req.body, user: req.user._id });
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(account);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteAccount(req, res) {
  try {
    await Account.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const accounts = await Account.find({ user: req.user._id });
    res.json(accounts);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const account = await Account.findOne({ _id: req.params.id, user: req.user._id });
    if (!account) throw new Error();
    res.json(account);
  } catch (err) {
    res.status(404).json('Account not found');
  }
}
