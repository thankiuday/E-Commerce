Progress Log - E-commerce Store

Date: 2025-02-08

✅ Backend Creation

Created server.js to set up the server configuration.

Developed auth.controller.js for authentication logic.

Configured db.js for database connection.

Defined user.model.js to establish the user schema.

Created auth.route.js to handle authentication routes.

🔧 Environment & Dependencies

Created .env file for environment variables.

Installed required dependencies in package.json and package-lock.json.

Date: 2025-02-08

saving all the temporary user with the name,email and password
1. uday,udaythanki2@gmail.com,123456
2. bhargav,bhargavmodha2e5

🔗 Redis Implementation
Logged into Upstash to set up Redis for caching and performance optimization.
Login with github account, and created a free database.

What is Redis?
Redis (Remote Dictionary Server) is an open-source, in-memory data structure store primarily used as a cache, database, and message broker. It is designed for high-performance and low-latency operations.

Key Features of Redis:
✅ In-Memory Storage – Stores data in RAM for super-fast access.
✅ Key-Value Store – Works like a dictionary with key-value pairs.
✅ Supports Various Data Structures – Strings, Lists, Sets, Hashes, Streams, etc.
✅ Persistence Options – Can persist data to disk for durability.
✅ Distributed & Scalable – Supports clustering for high availability.
✅ Pub/Sub Messaging – Can be used as a real-time message broker.

Where is Redis Used?
Caching (to speed up database queries)
Session Management (storing user sessions in web apps)
Rate Limiting (controlling API request limits)
Queuing System (background task processing)
Leaderboard Systems (storing ranked data)
Why Use Redis in Your E-commerce Project?
For your MERN Stack E-commerce Store, Redis can help with:
🔹 Caching frequently accessed data (e.g., product details)
🔹 Reducing database load (by storing session data)
🔹 Improving response time (by serving data faster)

Since you're integrating Redis via Upstash, you're using a serverless, managed Redis service, meaning you don’t have to set up or manage the Redis infrastructure manually. 🚀

Date : 28-02-2025
Completed the SignUp,Login,And The LogOut functinality along with the,
setting cookies,and storing accessToken and refrence token in Upstach

Date  : 1 march 2025, time : 5:00 Pm
created Product model
completed the product route
completed the middleware route
created the getAllProducts route. in that we are authenticating the admin.
created the featuredproducts route and its  controller 

time : 11:46
 - we are using cloundary platfrom to store and retrieve the images
 - in that we have crated a free acount using my main gmail id.
 - In that we have get the name from dashboard and stored in .evl file, like this :
     Cloudinary_CLOUD_NAME
 - also the api key by going on setting->api key
     Cloudinary_API_KEY
 - and also an api secret key, by getting it in main account gmail id
     Cloudinary_API_SECRET 

 - after that we have crated a config function in lib/cloudnary.js which is the configuration
of the cloudnary platfrom.

 - after that we have created create product route and its function
 - which will get the all product information and store in cloudnary platfrom as well as in   
 database.
 - Then we also have crated a delete product route which is get the id of the product in params
   and also have created the controller for that which will first delete the image of
   the product form cloudnary using the id of image and also delete the product from 
   database using the param id.

Date 2-march-2025
- created the recommedation product route along with its controller in product.controller.js
- in getRecommendedProducts controller we have used the aggregate funtion of mongo db.  
- MongoDB Aggregation is a database process that allows us to perform complex data     transformations and computations on collections of documents or rows. It enables us to group, filter, and manipulate data to produce summarized results.

- created a getproductBycategory route which will get the category through params
- created a controller in product.controller.js, which will only fetch and return the specified
  category product.

- created the toggleFeaturedProduct route and its controller.
- also created the updateFeaturedProductsCache function which will set the featured product in
redis cache.

- created a new route in server.js for cart
- After that created all the possible routes like :
  getAllCartItems
  addToCart
  removeAllFromCart
  updateQuantity
  in the car.route.js
- After that i have created the all this function(controller in cart.controller.js)
- it is very tough to understrand, but somehow we have created that controller.

Date : 3-march-2025
- created the coupon route along with its controller.
- the controller is having two routes :
 1. getCopon from the user.
 2. validateCoupon

Date : 4-march-2025
 - Setting up the stripe  for payment.
 - since stripe is not available in my country, so i have crated mock api lets see if it is works