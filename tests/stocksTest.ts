import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;
import {stockAvailable} from '../src/utility';

describe('Stock quantity',()=>{
    it("Check the returned object keys", async()=>{
        return await expect(stockAvailable('PGL751486/42/83')).to.eventually.have.keys("sku","qty");
    })

    it("Get current stock quantity which has only order of SKU of PGL751486/42/83", async()=>{
        return await expect(stockAvailable('PGL751486/42/83')).to.eventually.have.property("qty", 1442);
    })

    it("Get current stock quantity which has order and refund of SKU of NPR640416/53/91", async()=>{
        return await expect(stockAvailable('NPR640416/53/91')).to.eventually.have.property("qty", 3196);
    })
    //NMK838808/89/94

    it("Show error when SKU (SXB930757/87/87a) does not exist", async()=>{
        return await expect(stockAvailable('SXB930757/87/87a')).to.be.rejectedWith('SKU does not exist');
    })
})