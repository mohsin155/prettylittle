import express,{Request, Response} from "express";
import { stockAvailable } from "../utility";
/*
* Routes class to for endpoint
*/
export class Stocks { 
    
    public routes(app: express.Application): void { //received the express instance from app.ts file         
        app.route('/stocks')
        .get(async (req: Request, res: Response) => {
            try{
                if(!req.query.sku){
                    /*
                    *Validate incoming request with mandatory SKU in query string
                    */
                    return res.status(400).json({error:"SKU is required"}); 
                }

                let reqSku = req.query.sku as string;
                /*
                * Get available stock for the input SKU
                */
                let response = await stockAvailable(reqSku); 

                return  res.status(200).json({message:"Success", data: response}); //Return stock data when SKU exists
            }catch(e: any){
                return  res.status(500).json({error:e.message}); 
            }   
        })               
    }
}