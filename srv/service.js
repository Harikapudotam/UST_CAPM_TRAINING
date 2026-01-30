const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

    const { PurchaseOrder, PurchaseOrderItem } = this.entities

    //

    this.before('*', PurchaseOrder, req => {
        const today = new Date();
        const orderDate = new Date(req.data.orderDate)

        if (orderDate > today) {
            req.error(400, 'Order Date cannot be in the future')
        }
    })

    //before event.

    this.before('CREATE', PurchaseOrderItem, req => {

        const { quantity, Unitprice } = req.data;

        //quantity validation

        if (quantity <= 0) {
            req.error(400, 'Quantity must be greater than zero')
        }

        if (Unitprice <= 0) {
            req.error(400, 'Unitprice must be greater than zero')
        }

    })

    //on 

    //after event. 

    this.after('CREATE', PurchaseOrderItem, res => {
        console.log('record has been created')
    })

    this.before('CREATE', PurchaseOrder, req => {

        const today = new Date();
        const orderDate = new Date(req.data.orderDate)

        if (orderDate > today) {
            req.error(400, 'Order Date cannot be in the future')
        }

    })
    //on event -

    //after 

    this.before('UPDATE', PurchaseOrderItem, req => {
        if (req.data.quantity != undefined & req.data.quantity <= 0) {
            req.error(400, 'Quantity should be greated than 0')
        }
    })
    //on update

    //after update 

    //  this.before('DELETE',PurchaseOrder,req=>{
    //     req.error(400,'Delete is not allowed for this PurchaseOrder')
    //  })




    // const { PurchaseOrder, PurchaseOrderItem } = this.entities

    // // un bound action
    this.on('approveOrder', async (req) => {

        console.log('action triggered');

        const { ID } = req.data;
        console.log(ID);

        const order = await SELECT.one.from(PurchaseOrder).where({ ID });
        console.log(order);

        if (!order) {
            req.error(404, 'Order not found');
        }

        if (order.totalAmount > 50000) {
            req.error(400, 'Approval limit exceeded');
        }

        await UPDATE(PurchaseOrder)
            .set({ status: 'APPROVED' })
            .where({ ID });

        return 'Order approved successfully';

    })


    //unbound one
    this.on('getOrderTotal', async (req) => {
        const { ID } = req.data; // array of UUIDs

        const totals = [];
        for (const ids of ID) {
            let total = 0;
            const items = await SELECT.from(PurchaseOrderItem)
                .where({ parent_ID: ids });


            for (const item of items) {
                total += item.quantity * item.UnitPrice;
            }
            totals.push(total);


        }


        return totals;
    });

    // //bound action

    this.on('approve', async (req) => {
        const poID = req.params[0].ID;
        //get the data here , and do approve and reject here

        await UPDATE('ust.training.PurchaseOrder')
            .set({ status: 'Approved' })
            .where({ ID: poID });

        return {
            status: 'SUCCESS',
            message: 'Purchase Order approved successfully'
        };
    })
    this.on('getTotal', PurchaseOrder, async req => {
        const poID = req.params[0].ID;

        const items = await SELECT
            .from('ust.training.PurchaseOrderItem')
            .where({ parent_ID: poID });

        let total = 0;
        for (const item of items) {
            total += item.quantity * item.UnitPrice;
        }

        return total;
    });

    this.on('sendforapproval', async req => {
        const poID = req.data;
        console.log(poID)


    })

});