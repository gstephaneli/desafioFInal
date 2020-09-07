const express = require('express');
const transactionRouter = express.Router()
const transactionService = require('../services/transactionService')

transactionRouter.get('/:period',transactionService.getTransaction)
transactionRouter.post('',transactionService.insertTransaction)
transactionRouter.put('/:id',transactionService.updateTransaction)
transactionRouter.delete('/:id',transactionService.deleteTransaction)

module.exports = transactionRouter;
