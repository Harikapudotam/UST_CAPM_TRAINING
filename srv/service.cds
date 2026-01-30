// using {ust.training as schema} from '../db/model';

// service MyService @(path: 'MyService') {
//     entity PurchaseOrder  as projection on schema.PurchaseOrder

//     actions{
//         action approve() returns{
//             status : String;
//             message : String;
    
//         }
//     }
//     function getTotal() returns Decimal(15,2);
//     // action definition basic example 
//     action approveOrder(ID : UUID) returns {
//         status : String;
//         message : String;
//     };

//     function getOrderTotal(ID : UUID) returns Decimal(15,2);

    

// }

using { ust.training as schema } from '../db/model';

service MyService @(path: 'MyService') {
    action approveOrder(ID : UUID) returns { //unbounded action
        status  : String;
        message : String;
    };

    function getOrderTotal(ID : array of UUID) returns array of Decimal(15,2);
    entity PurchaseOrder as projection on schema.PurchaseOrder 
    actions {
        action approve() returns {
            status  : String;
            message : String;
        };
        function getTotal() returns Decimal(15,2);
        // bound action for sending approval 
        action sendforapproval(ID : array of UUID) ;
        
        
    }
    
    
}
