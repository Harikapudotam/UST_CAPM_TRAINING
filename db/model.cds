using {
    cuid,
    managed,
    Currency
} from '@sap/cds/common';

namespace ust.training;

@title: '{i18n>purchaseOrder}'
entity PurchaseOrder : cuid, managed {

    @title: '{i18n>poNumber}'
    poNumber            : String(20);

    @title: '{i18n>PRType}'
    PRType              : String;

    @title: '{i18n>requestDescription}'
    Request_Description : localized String;

    @title: '{i18n>supplier}'
    supplier            : String(100);

    @title: '{i18n>orderDate}'
    orderDate           : Date;

    @title: '{i18n>totalAmount}'
    totalAmount         : Decimal(15, 2);

    @title: '{i18n>status}'
    status              : String default 'InProgress';

    @title: '{i18n>items}'
    items               : Composition of many PurchaseOrderItem
                              on items.parent = $self;
}


@title: '{i18n>purchaseOrderItem}'
entity PurchaseOrderItem : cuid, managed {

    @title: '{i18n>itemNo}'
    itemNo               : Integer;

    @title: '{i18n>material}'
    material             : String(100);

    @title: '{i18n>materialDescription}'
    Material_Description : String ;

    @title: '{i18n>purOrg}'
    PurOrg               : String;

    @title: '{i18n>plant}'
    Plant                : String ;

    @title: '{i18n>quantity}'
    quantity             : Integer;

    @title: '{i18n>uom}'
    UoM                  : String;

    @title: '{i18n>unitPrice}'
    UnitPrice            : Integer;

    @title: '{i18n>price}'
    @readonly
    Price                : Decimal = quantity * UnitPrice;

    @title: '{i18n>currency}'
    Currency             : Currency;

    @title: '{i18n>purchasingGroup}'
    PurchasingGroup      : String;

    @title: '{i18n>parent}'
    parent               : Association to PurchaseOrder;
}
