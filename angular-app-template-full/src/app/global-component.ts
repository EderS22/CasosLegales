export const GlobalComponent = {
    // Api Calling
    API_URL : 'https://localhost:44367/api/',
    //API_URL : 'https://localhost:44367/api/',

    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"https://localhost:44367/api/",
    //AUTH_API:"https://localhost:44367/api/",
    
    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
}