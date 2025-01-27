// Initialize data storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        document.getElementById(`${item.dataset.tab}-content`).classList.add('active');
    });
});

// Update summary totals
function updateSummary() {
    let totalGive = 0;
    let totalGet = 0;
    
    transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
            totalGive += transaction.amount;
        } else {
            totalGet += transaction.amount;
        }
    });
    
    document.getElementById('totalGive').textContent = totalGive.toLocaleString();
    document.getElementById('totalGet').textContent = totalGet.toLocaleString();
}

// Transaction functions
function addTransaction() {
    const description = document.getElementById('transactionDescription').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const type = document.getElementById('transactionType').value;
    
    if (description && amount) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            date: new Date().toLocaleDateString()
        };
        
        transactions.unshift(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
        updateSummary();
        clearForm('transactionDescription', 'transactionAmount');
    }
}

function displayTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = transactions.map(transaction => `
        <div class="list-item">
            <div>
                <strong>${transaction.description}</strong>
                <div class="text-muted">${transaction.date}</div>
            </div>
            <div class="${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toLocaleString()}
            </div>
        </div>
    `).join('');
}

// Customer functions with search and filter
let customerSearchTimeout;
const customerSearch = document.getElementById('customerSearch');
const customerFilter = document.getElementById('customerFilter');

if (customerSearch) {
    customerSearch.addEventListener('input', (e) => {
        clearTimeout(customerSearchTimeout);
        customerSearchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            filterAndDisplayCustomers(searchTerm, customerFilter.value);
        }, 300);
    });
}

if (customerFilter) {
    customerFilter.addEventListener('change', (e) => {
        filterAndDisplayCustomers(customerSearch.value.toLowerCase(), e.target.value);
    });
}

function filterAndDisplayCustomers(searchTerm, filterValue) {
    let filteredCustomers = customers;
    
    if (searchTerm) {
        filteredCustomers = filteredCustomers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm)
        );
    }
    
    if (filterValue === 'active') {
        filteredCustomers = filteredCustomers.filter(customer => customer.balance > 0);
    } else if (filterValue === 'inactive') {
        filteredCustomers = filteredCustomers.filter(customer => customer.balance <= 0);
    }
    
    displayCustomers(filteredCustomers);
}

function addCustomer() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    if (name && phone) {
        const customer = {
            id: Date.now(),
            name,
            phone,
            address,
            balance: 0,
            date: new Date().toLocaleDateString()
        };
        
        customers.unshift(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        displayCustomers(customers);
        clearForm('customerName', 'customerPhone', 'customerAddress');
    }
}

function displayCustomers(customersToDisplay = customers) {
    const customersList = document.getElementById('customersList');
    if (!customersList) return;
    
    customersList.innerHTML = customersToDisplay.map(customer => `
        <div class="list-item">
            <div>
                <strong>${customer.name}</strong>
                <div>${customer.phone}</div>
                <div class="text-muted">${customer.address}</div>
            </div>
            <div>
                <div class="balance ${customer.balance >= 0 ? 'income' : 'expense'}">
                    ₹${Math.abs(customer.balance).toLocaleString()}
                </div>
                <div class="text-muted">${customer.date}</div>
            </div>
        </div>
    `).join('');
}

// Supplier functions
function addSupplier() {
    const name = document.getElementById('supplierName').value;
    const phone = document.getElementById('supplierPhone').value;
    const product = document.getElementById('supplierProduct').value;
    
    if (name && phone) {
        const supplier = {
            id: Date.now(),
            name,
            phone,
            product,
            balance: 0,
            date: new Date().toLocaleDateString()
        };
        
        suppliers.unshift(supplier);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        displaySuppliers();
        clearForm('supplierName', 'supplierPhone', 'supplierProduct');
    }
}

function displaySuppliers() {
    const suppliersList = document.getElementById('suppliersList');
    if (!suppliersList) return;
    
    suppliersList.innerHTML = suppliers.map(supplier => `
        <div class="list-item">
            <div>
                <strong>${supplier.name}</strong>
                <div>${supplier.phone}</div>
                <div class="text-muted">${supplier.product}</div>
            </div>
            <div>
                <div class="balance ${supplier.balance >= 0 ? 'income' : 'expense'}">
                    ₹${Math.abs(supplier.balance).toLocaleString()}
                </div>
                <div class="text-muted">${supplier.date}</div>
            </div>
        </div>
    `).join('');
}

// Inventory functions
function addInventoryItem() {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseFloat(document.getElementById('itemPrice').value);
    
    if (name && quantity && price) {
        const item = {
            id: Date.now(),
            name,
            quantity,
            price,
            value: quantity * price,
            date: new Date().toLocaleDateString()
        };
        
        inventory.unshift(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        displayInventory();
        clearForm('itemName', 'itemQuantity', 'itemPrice');
    }
}

function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    if (!inventoryList) return;
    
    inventoryList.innerHTML = inventory.map(item => `
        <div class="list-item">
            <div>
                <strong>${item.name}</strong>
                <div>Quantity: ${item.quantity}</div>
                <div>Price: ₹${item.price.toLocaleString()}/unit</div>
            </div>
            <div>
                <div class="total-value">₹${item.value.toLocaleString()}</div>
                <div class="text-muted">${item.date}</div>
            </div>
        </div>
    `).join('');
}

// Utility functions
function clearForm(...ids) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
}

// Initialize displays
updateSummary();
displayTransactions();
displayCustomers();
displaySuppliers();
displayInventory();

// Handle bulk upload button
document.querySelector('.bulk-upload')?.addEventListener('click', () => {
    alert('Bulk upload feature coming soon!');
});

// Handle view report button
document.querySelector('.view-report')?.addEventListener('click', () => {
    alert('Detailed report feature coming soon!');
});
