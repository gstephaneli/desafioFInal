const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');

const insertTransaction = async (req, res) => {
    try {
        const transactionData = req.body

        if(!transactionData){
            throw new Error('Invalid data')
        }

        const transaction = new TransactionModel(transactionData)
        transaction.save()

        res.status(200).send('Transaction registered')
    } catch (error) {
        res.status(500).send(`Transaction return error: ${error}`)
    }   
}

const getTransaction = async (req, res) => {
    try {
        const { period } = req.params
        const transaction = await TransactionModel.find({ yearMonth: period })

        if(!transaction || transaction.length <= 0){
            throw new Error('Invalid Period')
        }

        res.status(200).send(transaction)
    } catch (error) {
        res.status(500).send(`Transaction return error: ${error}`)
    }
}

const updateTransaction = async (req, res) => {
    try {
        const transactionData = req.body
        if(!transactionData){
            throw new Error('Invalid data')
        }

        const transaction = await TransactionModel.findOneAndUpdate(transactionData._id,transactionData,{new: true})
        if(!transaction){
            throw new Error('Transaction not found')
        }

        res.status(200).send('Updated transaction')
    } catch (error) {
        res.status(500).send(`Transaction return error: ${error}`)
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            throw new Error('Id not informated')
        }

        const transactionD = await TransactionModel.findOneAndDelete({_id:id})
        if(transactionD.deletedCount <= 0){
            throw new Error(`Transaction not found to delete`)
        }
        
        res.status(200).send('Deleted transaction')
    } catch (error) {
        res.status(500).send(`Transaction return error: ${error}`)
    }
}

module.exports = { insertTransaction, getTransaction, updateTransaction, deleteTransaction}