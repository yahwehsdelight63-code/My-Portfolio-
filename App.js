function createInvoice() {
    alert("Create Invoice page coming soon!");
}

let customers = JSON.parse(localStorage.getItem("customers")) || [];

function addCustomer() {

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const phone = document.getElementById("customerPhone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all customer details.");
        return;
    }

    const customer = {
        name: name,
        email: email,
        phone: phone
    };

    customers.push(customer);

localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();

    document.getElementById("customerName").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("customerPhone").value = "";
}

function displayCustomers() {

    const customerContainer = document.getElementById("customers");

    customerContainer.innerHTML = "";

    customers.forEach(function(customer, index) {

        const customerDiv = document.createElement("div");

        customerDiv.innerHTML = `
            <div class="customer">
                <h4>${customer.name}</h4>
                <p>${customer.email}</p>
                <p>${customer.phone}</p>

                <button onclick="deleteCustomer(${index})">
                    Delete
                </button>
            </div>
        `;

        customerContainer.appendChild(customerDiv);
    });
}

function deleteCustomer(index) {

    customers.splice(index, 1);

localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}
function calculateInvoice() {

    const quantity = Number(
        document.getElementById("itemQuantity").value
    );

    const price = Number(
        document.getElementById("itemPrice").value
    );

    if (quantity <= 0 || price < 0) {
        alert("Please enter a valid quantity and price.");
        return;
    }

    const total = quantity * price;

    document.getElementById("invoiceTotal").textContent =
        total.toLocaleString("en-NG");
}


let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

function saveInvoice() {

    const invoiceNumber =
        document.getElementById("invoiceNumber").value;

    const customer =
        document.getElementById("invoiceCustomer").value;

    const date =
        document.getElementById("invoiceDate").value;

    const item =
        document.getElementById("itemName").value;

    const quantity =
        Number(document.getElementById("itemQuantity").value);

    const price =
        Number(document.getElementById("itemPrice").value);

    if (
        invoiceNumber === "" ||
        customer === "" ||
        date === "" ||
        item === "" ||
        quantity <= 0 ||
        price < 0
    ) {
        alert("Please fill in all invoice details.");
        return;
    }

    const total = quantity * price;

    const invoice = {
        number: invoiceNumber,
        customer: customer,
        date: date,
        item: item,
        quantity: quantity,
        price: price,
        total: total,
        status: "Pending"
    };

    invoices.push(invoice);
localStorage.setItem("invoices", JSON.stringify(invoices));
    displayInvoices();
updateDashboard();

    alert("Invoice saved successfully!");

    document.getElementById("invoiceNumber").value = "";
    document.getElementById("invoiceCustomer").value = "";
    document.getElementById("invoiceDate").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("invoiceTotal").textContent = "0";
}


function displayInvoices() {

    const invoiceList =
        document.getElementById("invoiceList");

    invoiceList.innerHTML = "";

    if (invoices.length === 0) {
        invoiceList.innerHTML =
            "<p>No invoices saved yet.</p>";
        return;
    }

    invoices.forEach(function(invoice, index) {

        const invoiceDiv =
            document.createElement("div");

        invoiceDiv.className = "invoice-card";

        invoiceDiv.innerHTML = `
            <h3>${invoice.number}</h3>

            <p>
                <strong>Customer:</strong>
                ${invoice.customer}
            </p>

            <p>
                <strong>Date:</strong>
                ${invoice.date}
            </p>

            <p>
                <strong>Item:</strong>
                ${invoice.item}
            </p>

            <p>
                <strong>Total:</strong>
                ₦${invoice.total.toLocaleString("en-NG")}
            </p>

            <label>Status:</label>

            <select onchange="changeInvoiceStatus(${index}, this.value)">
                <option value="Pending"
                    ${invoice.status === "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="Paid"
                    ${invoice.status === "Paid" ? "selected" : ""}>
                    Paid
                </option>

                <option value="Overdue"
                    ${invoice.status === "Overdue" ? "selected" : ""}>
                    Overdue
                </option>
            </select>

            <button onclick="deleteInvoice(${index})">
                Delete Invoice
            </button>
        `;

        invoiceList.appendChild(invoiceDiv);
    });
}


function changeInvoiceStatus(index, status) {

    invoices[index].status = status;
localStorage.setItem("invoices", JSON.stringify(invoices));
    displayInvoices();
updateDashboard();

    alert("Invoice status changed to " + status);
}


function deleteInvoice(index) {

    if (confirm("Delete this invoice?")) {

        invoices.splice(index, 1);
localStorage.setItem("invoices", JSON.stringify(invoices));
        displayInvoices();
    }
    updateDashboard();
}

function updateDashboard() {

    const total = invoices.length;

    const paid = invoices.filter(function(invoice) {
        return invoice.status === "Paid";
    }).length;

    const pending = invoices.filter(function(invoice) {
        return invoice.status === "Pending";
    }).length;

    const overdue = invoices.filter(function(invoice) {
        return invoice.status === "Overdue";
    }).length;

    document.getElementById("totalInvoices").textContent = total;
    document.getElementById("paidInvoices").textContent = paid;
    document.getElementById("pendingInvoices").textContent = pending;
    document.getElementById("overdueInvoices").textContent = overdue;
}
updateDashboard();