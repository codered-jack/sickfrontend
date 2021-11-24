import formatMoney from '../lib/formatMoney'

describe('format Money function', ()=>{
    it('works with fractional rupees',()=>{
        expect(formatMoney(1)).toEqual('₹0.01');
        expect(formatMoney(10)).toEqual('₹0.10');
        expect(formatMoney(140)).toEqual('₹1.40');
    })
    it('leaves off cents when its whole rupees',()=>{
        expect(formatMoney(5000)).toEqual('₹50');
    })
})