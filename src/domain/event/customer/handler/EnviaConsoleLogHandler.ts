import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface <CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void{
        console.log(`Endereço do cliente: ${event.id}, ${event.name} alterado para: ${event.endereco} `);
    }
}