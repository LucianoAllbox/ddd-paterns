import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    _id: string;
    _name: string;

    _street: string;
    _number: number;
    _zip: string;
    _city: string;

    constructor(eventData: any){
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }

    set id(id: string){
        this._id = id;
    }
    get id(){
        return this._id;
    }

    set name(name: string){
        this._name = name;
    }
    get name(){
        return this._name;
    }

    set street(street: string){
        this._street = street;
    }
    set number(number: number){
        this._number = number;
    }
    set zip(zip: string){
        this._zip = zip;
    }
    set city(city: string){
        this._city = city;
    }

    get endereco(){
        return this._street + " " + this._number + " " + this._zip + " " + this._city;
    }


}