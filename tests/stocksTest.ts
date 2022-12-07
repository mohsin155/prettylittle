import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;
import rewire from 'rewire';
import {stockAvailable} from '../src/utility';
const calculateTest =  rewire('../src/utility');
const calculateStock = calculateTest.__get__('calculateStock')

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
    it("Sustract stock when transaction is order", ()=>{
        expect(calculateStock([{
            "sku": "TZH873296/06/42",
            "type": "order",
            "qty": 2
        }], 10)).to.be.equal(8);
    })

    it("Add to stock when transaction is refund", ()=>{
        expect(calculateStock([{
            "sku": "NPR640416/53/91",
            "type": "refund",
            "qty": 4
        }], 10)).to.be.equal(14);
    })

    it("Test when transaction is refund and order both", ()=>{
        expect(calculateStock([{
            "sku": "NPR640416/53/91",
            "type": "refund",
            "qty": 4
        }, {
            "sku": "TZH873296/06/42",
            "type": "order",
            "qty": 2
        }], 10)).to.be.equal(12);
    })

    it("Throw error when SKU (SXB930757/87/87a) does not exist", async()=>{
        return await expect(stockAvailable('SXB930757/87/87a')).to.be.rejectedWith('SKU does not exist');
    })
})