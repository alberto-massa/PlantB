<h1 align="center">Welcome to  <strong>PlantB</strong> :seedling: </h1>

<p> This is a project made with React hooks fully responsive, we have three types of roles (user, shop, admin). Our users can buy and sell plants, can send messages to each other and it renders different info taking into consideration if you are or aren´t signed in and which role is logged in. We have a search bar made with Ajax on the navbar. We have apis as Google Maps. <p>

<p align="center">
  
   <a href="https://www.linkedin.com/in/massa-alberto/">
     <img alt="Linkedin: Alberto Massa" src="https://img.shields.io/badge/Linkedin-Alberto%20Massa-lightgrey?style=flat&logo=linkedin&labelColor=blue" target="_blank" />
   </a>
  
   <a href="https://www.linkedin.com/in/jose-bohopo">
     <img alt="Linkedin: Jose Bohopo" src="https://img.shields.io/badge/Linkedin-Jose%20Bohopo-lightgrey?style=flat&logo=linkedin&labelColor=blue" target="_blank" />
   </a> 
  
   <a href="https://www.npmjs.com/">
     <img src="https://img.shields.io/badge/npm-v7.22.0-brightgreen" />
   </a>
  
   <a href="https://www.mongodb.com/cloud/atlas/lp/try2?      utm_content=controlhterms&utm_source=google&utm_campaign=gs_emea_spain_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624563&gclid=Cj0KCQjw18WKBhCUARIsAFiW7JxndhZMH08YpjdWksOmVSblF1hcLt_cuvK3eh0iqYsNPzGz6oTJRCgaAhE3EALw_wcB">
     <img src="https://img.shields.io/badge/MongoDB-5.0.2-brightgreen" />
   </a>

   <a href="https://nodejs.org/en/">
     <img src="https://img.shields.io/badge/Node.js-v14.17.4-brightgreen" />
   </a>

   <a href="https://expressjs.com/">
     <img src="https://img.shields.io/badge/Express-4.17.1-brightgreen" />
   </a>

   <a href="https://es.reactjs.org/">
    <img alt="React" src="https://img.shields.io/badge/React-v1.6.4-brightgreen" target="_blank" />
   </a>

   <a href="https://getbootstrap.com/">
    <img src="https://img.shields.io/badge/Bootstrap-v5.1.1-brightgreen" />
   </a>
   
   <a href="https://react-bootstrap.github.io/">
    <img src="https://img.shields.io/badge/React%20Bootstrap-v2.0.0-brightgreen">
   </a>
  
</p>

## The website
<p>
  Check the website here: https://plantb.herokuapp.com
</p>

<br>

<p align="center">
  <img src="./client/public/large.png" height="350" title="large screen version">
  <img src="./client/public/small.png" height="350" title="mobile version">
</p>

<p align="center" style="font-style:8px">
  large screen and mobile screen preview.
 </p>





FRONT PATHS:

| Path                  | Description                           | 
| --------------------- | ------------------------------------- |
| /register             | Form to register                      |
| /login                | Form to sing in                       |
| /                     | View that shows homepage              |
| /search               | Displays product                      |
| /item/:id             | Description of a single product       |
| /user/:username       | User's profile                        |
| /shop/:name           | Shows a shop's profile                |
| /edit/:username       | User is able to edit it's own profile |
| /edit/:shop           | Shop is able to edit it's own profile |
| /new-item             | Upload a product                      |
| /admin/shop           | Shop's entire list                    |
| /admin/user           | User's entire list                    |
| /admin/shop/:name     | Edit and delete shops info            |
| /admin/user/:username | Edit and delete users info            |
| /admin/item/:id       | Edit and delete items info            |
| /admin/control        | Approves shops regiter application    |
| /new-comment          | Creates a comment                     |
| /sendmsg/:targetname  | Sends message to a shop or user       |
| /messages             | Shows a message list                  |
| /cart                 | Shows the cart                        |


BACK PATHS:

| METHOD |         PATH          |              DESCRIPTION               |
| ------ | --------------------- | -------------------------------------- |
|  POST  |        /signup        |     Saves the user in the Database     |
|  POST  |     /signup-shop      |     Saves the shop in the Database     |
|  POST  |        /login         |     Logs the user in the Database      |
|  POST  |      /login-shop      |     Logs the shop in the Database      |
|  GET   |        /logout        | Logs the user/shop out of the database |
|  POST  |      /isloggedin      | Check if the user/shop has been logged |
|  GET   |      /plant/:id       |             Gets one plant             |
|  GET   |    /user/:username    |             Gets one user              |
|  PUT   |    /user/:username    |               Edit user                |
|  GET   |      /shop/:name      |             Gets one shop              |
|  PUT   |      /shop/:name      |               Edit shop                |
|  PUT   |     /plant/:name      |               Edit Plant               |
|  GET   |        /search        |       Gets all items/users/shops       |
|  POST  |      /new-plant       |           Create a new plant           |
|  GET   |     /admin/users      |         Gets list of all users         |
|  GET   |     /admin/shops      |         Gets list of all shops         |
|  PUT   | /admin/user/:username |             Edit one user              |
|  DEL   | /admin/user/:username |            Delete one user             |
|  PUT   |   /admin/shop/:name   |             Edit one shop              |
|  DEL   |    /admin/shop/:id    |            Delete one shop             |
|  GET   |    /admin/control     |          Gets shops requests           |
|  POST  |    /admin/control     |          Approve shop request          |
|  DEL   |    /admin/control     |          Decline shop request          |
|  DEL   |      /plant/:id       |        Admin can delete comment        |
|  POST  | /sendmsg/:targetname  |           Create new message           |
|  GET   |       /messages       |         Gets list of messages          |
|  GET   |     /message/:id      |            Gets one message            |
|  DEL   |     /message/:id      |           Delete one message           |
|  DEL   |     /comment/:id      |       (Admin) Delete one comment       |
|  POST  |     /comment/:id      |           Create new comment           |
|  GET   |     /comment/:id      |            Gets one comment            |
|  GET   |     /:id/comments     |      View one item's all comments      |
|  GET   |     /cart/:id         |      cart of the selected product      |
|  POST  |     /cart             |      gets plant details                |
