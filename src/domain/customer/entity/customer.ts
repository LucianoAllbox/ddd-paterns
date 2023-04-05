import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../../event/customer/customer-created.event";
import EnviaConsoleLog1Handler from "../../event/customer/handler/EnviaConsoleLog1Handler.handler";
import EnviaConsoleLog2Handler from "../../event/customer/handler/EnviaConsoleLog2Handler.handler";
import EnviaConsoleLogHandler from "../../event/customer/handler/EnviaConsoleLogHandler";
import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardsPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;

        this.validate();

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        const customerCreatedEvent = new CustomerCreatedEvent({});
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.notify(customerCreatedEvent);

    }

    validate(){
        if (this._id.length === 0){
            throw new Error("Id is required");
        }
        if (this._name.length === 0){
            throw new Error("Name is required");
        }
    }

    get id(): string{
        return this._id;
    }


    changeName(name: string){
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
    
        this._address = address;

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: this._id,
            name: this._name,
            street: this._address.street,
            number: this._address._number,
            zip: this._address._zip, 
            city: this._address._city
        });

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        eventDispatcher.notify(customerAddressChangedEvent);
    }

    activate(){
        if (this._address === undefined){
            throw new Error ("Address is mandatory to activate a customer")
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    addRewardPoints(point: number){
        this._rewardsPoints += point;
    }

    get rewardPoints(): number{
        return this._rewardsPoints;
    }

    set Address(address: Address) {
        this._address = address;
    }
    
    
    get Address(): Address {
        return this._address;
    }
    
    get name(): string{
        return this._name;
    }

    isActive(): boolean{
        return this._active;
    }
    
}