import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Stocks } from './stockInterface';
import { StockTransaction } from './transactionInterface'; 

export const stockAvailable = async (sku: string): Promise<{ sku: string, qty: number }> => {
    let stocksArray = JSON.parse(await fsPromises.readFile(
        path.join(__dirname, './../stock.json'),
        { encoding: 'utf-8' },
    )); //Read stock.json and save it as Array of objects
    let stockObj = stocksArray.find((e: Stocks) => e.sku == sku) //Find if sku exists in stock.json

    let transacArray = JSON.parse(await fsPromises.readFile(
        path.join(__dirname, './../transactions.json'),
        { encoding: 'utf-8' },
    )); //Read transactions.json and save it as Array of objects
    let transObj = transacArray.filter((e: StockTransaction) => e.sku == sku); //Filter transactions of that sku

    if (!stockObj && transObj.length == 0) { //Check if sku does not exist in both stock.json and transactions.json
        throw new Error('SKU does not exist');
    }

    let initialQty = 0;
    if (stockObj) {
        initialQty = stockObj.stock; //Stock quantity initial from stock.json
    }

    var transactQuantity = 0;
    if (transObj.length > 0) {
        transactQuantity = transObj.reduce(function (orderQuantity: number, trans: StockTransaction) {
            if (trans.type == 'order') {
                return orderQuantity + trans.qty;
            }
            if (trans.type == 'refund') {
                return orderQuantity - trans.qty;
            }
        }, 0)
    }

    return { sku: sku, qty: initialQty - transactQuantity }
}