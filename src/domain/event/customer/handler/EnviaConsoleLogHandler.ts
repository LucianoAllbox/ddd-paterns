import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface <CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void{
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.street + " " + event.eventData.number + " " + event.eventData.zip + " " + event.eventData.city} `);
    }
}