import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Address from "../../../../domain/customer/value-object/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/checkout/entity/order";
import Product from "../../../../domain/produtct/entity/product";
import Customer from "../../../../domain/customer/entity/customer";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem, ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.items.length).toBe(2);

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: ordemItem2.id,
          name: ordemItem2.name,
          price: ordemItem2.price,
          quantity: ordemItem2.quantity,
          order_id: "123",
          product_id: "123",
        },

      ],
    });
  });



  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("P1", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem("Item 1", product.name, product.price, product.id, 3);

    const order = new Order("OR1", "C1", [ordemItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);



    const orderModel1 = await OrderModel.findOne({
      where: { id: "OR1" },
      include: ["items"],
    });

    const product2 = new Product("P2", "Product 2", 4);
    await productRepository.create(product2);
    const ordemItem2 = new OrderItem("Item 2", product2.name, product2.price, product2.id, 8);
    order.items.push(ordemItem2);
   
    const product3 = new Product("P3", "Product 3", 8);
    await productRepository.create(product3);
    const ordemItem3 = new OrderItem("Item 3", product3.name, product3.price, product3.id, 7);
    order.items.push(ordemItem3);
    
    await orderRepository.update(order);



    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: {
        model: OrderItemModel,
      },
    });

    expect(orderModel.items.length).toBe(3);

    expect(orderModel.toJSON()).toStrictEqual({
      id: "OR1",
      customer_id: "C1",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "OR1",
          product_id: ordemItem.productId,
        },
        {
          id: ordemItem2.id,
          name: ordemItem2.name,
          price: ordemItem2.price,
          quantity: ordemItem2.quantity,
          order_id: "OR1",
          product_id: ordemItem2.productId,
        },
        {
          id: ordemItem3.id,
          name: ordemItem3.name,
          price: ordemItem3.price,
          quantity: ordemItem3.quantity,
          order_id: "OR1",
          product_id: ordemItem3.productId,
        },
      ],
    });

  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );


    const order = new Order("OF1", "123", [ordemItem, ordemItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFind = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderFind);
    expect(orderFind.items.length).toStrictEqual(2);

  });


it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("XPTO");
    }).rejects.toThrow("Order not found");
  });

  
  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );


    const order = new Order("OF1", "123", [ordemItem, ordemItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFind = await orderRepository.findAll();

    expect(orderFind).toHaveLength(1);
    expect(orderFind[0].items).toContainEqual(ordemItem);
    expect(orderFind[0].items).toContainEqual(ordemItem2);
  });

});
