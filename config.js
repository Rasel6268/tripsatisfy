let baseUrl = "http://localhost:3000";
if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://tripsatisfy.com";
}

export default {
    APP_NAME:"Trip Satisfy",
    BACKEND_API:"https://admin.tripsatisfy.com/api",
    ERROR_CONSOLE:true,
    baseURL:process.env.ROOT_URL || baseUrl,
    address:`TripSatisfy Ltd. Paltan China Town (West Tower), W-10/11(09th floor lift) 67/1 <br/>  Naya Paltan, Dhaka -1000, Bangladesh`,
    social:{
        facebook:'https://www.facebook.com/tripsatisfy',
        youtube:'https://www.youtube.com/',
        linkedin:'https://www.linkedin.com/',
        twitter:'https://twitter.com/',
        instagram:'https://www.instagram.com/'
    },
    ssl_fee:2.50,
    commission_percent:7,
    ait_tax: 0.3,
    domestic_convenience:100,
    int_convenience:300,
    GOOGLE_CLIENT_ID: '724010261847-loi07a2dkndhechraic4akjosu2b2onl.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '2497574880408521',
    FACEBOOK_APP_SECRET: '3e9dab06585e695973fcdf9a599f3f0a',
    facebook_call_back:'/callback/fb'
}