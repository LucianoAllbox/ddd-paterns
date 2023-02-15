import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("Should throw error when id is empty", () => {
        
        expect(() => {
            let customer = new Customer("", "john");
        }).toThrowError("Id is required");

    });

    it("Should throw error when name is empty", () => {
        
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");

    });

    it("Should change name", () => {
        //Arrange        
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");

    });

    it("Should activate customer", () => {
        //Arrange        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12345-123", "Rio");
        customer.Address = address;

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true);

    });

    it("Should deactivate customer", () => {
        //Arrange        
        const customer = new Customer("1", "Customer 1");

        //Act
        customer.deactivate();

        //Assert
        expect(customer.isActive()).toBe(false);

    });

    it("Should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
    
        }).toThrowError("Address is mandatory to activate a customer")
    });

    it("Should add reward points", () => {
        const customer =  new Customer("1", "Customer 1");
        
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    });

});