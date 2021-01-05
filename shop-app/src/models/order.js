import moment from "moment";

class Order {
  constructor(items, totalAmount) {
    this.id = new Date().toString();
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = new Date();
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
