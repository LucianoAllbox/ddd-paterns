import EventDispatcher from '../event/@shared/event-dispatcher';
import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event';
import EnviaConsoleLogHandler from '../event/customer/handler/EnviaConsoleLogHandler';
import Address from './address';

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

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({});
        customerAddressChangedEvent.id = this._id;
        customerAddressChangedEvent.name = this._name;
        
        customerAddressChangedEvent.street = this._address.street;
        customerAddressChangedEvent.number = this._address._number;
        customerAddressChangedEvent.zip = this._address._zip;
        customerAddressChangedEvent.city = this._address._city;

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