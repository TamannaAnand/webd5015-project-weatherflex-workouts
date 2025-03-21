// import { revenue, invoices, customers } from './placeholder-data';
// import { formatCurrency } from './utils';



// export async function fetchRevenue() {
//   try {
//     console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     // Replace the database call with the placeholder data
//     const data = revenue;

//     console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     // Simulate fetching the latest 5 invoices
//     const latestInvoices = invoices.slice(0, 5).map((invoice) => {
//       const customer = customers.find((customer) => customer.id === invoice.customer_id);
//       return {
//         ...invoice,
//         customerName: customer?.name,
//         customerImageUrl: customer?.image_url,
//         customerEmail: customer?.email,
//         amount: formatCurrency(invoice.amount),
//       };
//     });

//     return latestInvoices;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }


// export async function fetchCardData() {
//   try {
//     const numberOfInvoices = invoices.length;
//     const numberOfCustomers = customers.length;

//     const totalPaidInvoices = invoices
//       .filter((invoice) => invoice.status === 'paid')
//       .reduce((sum, invoice) => sum + invoice.amount, 0);

//     const totalPendingInvoices = invoices
//       .filter((invoice) => invoice.status === 'pending')
//       .reduce((sum, invoice) => sum + invoice.amount, 0);

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices: formatCurrency(totalPaidInvoices),
//       totalPendingInvoices: formatCurrency(totalPendingInvoices),
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }


// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(query: string, currentPage: number) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     // Filter invoices based on the query
//     const filteredInvoices = invoices
//       .filter(
//         (invoice) =>
//           customers.find((customer) =>
//             customer.name.toLowerCase().includes(query.toLowerCase()) ||
//             customer.email.toLowerCase().includes(query.toLowerCase())
//           ) ||
//           invoice.amount.toString().includes(query) ||
//           invoice.date.includes(query) ||
//           invoice.status.toLowerCase().includes(query)
//       )
//       .slice(offset, offset + ITEMS_PER_PAGE)
//       .map((invoice) => {
//         const customer = customers.find((customer) => customer.id === invoice.customer_id);
//         return {
//           ...invoice,
//           customerName: customer?.name,
//           customerImageUrl: customer?.image_url,
//           customerEmail: customer?.email,
//           amount: formatCurrency(invoice.amount),
//         };
//       });

//     return filteredInvoices;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }


// export async function fetchInvoicesPages(query: string) {
//   try {
//     const filteredInvoices = invoices.filter(
//       (invoice) =>
//         customers.find((customer) =>
//           customer.name.toLowerCase().includes(query.toLowerCase()) ||
//           customer.email.toLowerCase().includes(query.toLowerCase())
//         ) ||
//         invoice.amount.toString().includes(query) ||
//         invoice.date.includes(query) ||
//         invoice.status.toLowerCase().includes(query)
//     );

//     const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// // export async function fetchInvoiceById(id: string) {
// //   try {
// //     const invoice = invoices.find((invoice) => invoice.id === id);
// //     if (!invoice) {
// //       throw new Error('Invoice not found.');
// //     }

// //     const customer = customers.find((customer) => customer.id === invoice.customer_id);
// //     return {
// //       ...invoice,
// //       customerName: customer?.name,
// //       customerEmail: customer?.email,
// //       customerImageUrl: customer?.image_url,
// //       amount: formatCurrency(invoice.amount),
// //     };
// //   } catch (error) {
// //     console.error('Error:', error);
// //     throw new Error('Failed to fetch invoice.');
// //   }
// // }


// export async function fetchCustomers() {
//   try {
//     return customers;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const filteredCustomers = customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(query.toLowerCase()) ||
//         customer.email.toLowerCase().includes(query.toLowerCase())
//     );

//     // Add invoice data for each customer
//     const customersWithInvoiceData = filteredCustomers.map((customer) => {
//       const customerInvoices = invoices.filter((invoice) => invoice.customer_id === customer.id);
//       const totalPending = customerInvoices
//         .filter((invoice) => invoice.status === 'pending')
//         .reduce((sum, invoice) => sum + invoice.amount, 0);
//       const totalPaid = customerInvoices
//         .filter((invoice) => invoice.status === 'paid')
//         .reduce((sum, invoice) => sum + invoice.amount, 0);

//       return {
//         ...customer,
//         totalPending: formatCurrency(totalPending),
//         totalPaid: formatCurrency(totalPaid),
//       };
//     });

//     return customersWithInvoiceData;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch customer table.');
//   }
// }


