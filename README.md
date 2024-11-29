## E-Commerce Web API
<hr>

## Introduction

This project is an Ecommerce API built using Node.js. It provides a set of endpoints for managing users, products, categories, orders, and authentication using JWT. The API allows clients to perform CRUD operations on products, manage user authentication and authorization, and handle customer orders. 

<hr>

## Run
<h4>Install</h4>

```bash
git install

```
## Start API
```bash
npm start

```

## Routes

<h4>Users</h4>

| Methods |  URLs  | 
|:-----|:--------:|
| GET   | /api/v1/users |
| GET   | /api/v1/users/:id |
| POST   | /api/v1/users |
| PUT   | /api/v1/users/:id |
| DELETE   | /api/v1/users/:id |
| GET   | /api/v1/users/get/count |users count

<h4>Orders</h4>

| Methods |  URLs  | 
|:-----|:--------:|
| GET   | /api/v1/orders |
| GET   | /api/v1/orders/:id |
| POST   | /api/v1/orders |
| PUT   | /api/v1/orders/:id |
| DELETE   | /api/v1/orders/:id |
| GET   | /api/v1/orders/get/count | orders count

<h4>Register new user</h4>

| Methods |  URLs  | 
|:-----|:--------:|
| POST   | /api/v1/users/register |

<h4>Login user</h4>
To login the user and get the auth token:

| Methods |  URLs  | 
|:-----|:--------:|
| POST   | /api/v1/users/login |

<h4>Products</h4>

| Methods |  URLs  | 
|:-----|:--------:|
| GET   | /api/v1/products |
| GET   | /api/v1/products/:id |
| POST   | /api/v1/products |
| PUT   | /api/v1/products/:id |
| DELETE   | /api/v1/products/:id |
| PUT    | /api/v1/products/gallery-images/:id | gallery-images
| GET   | /api/v1/products/get/featured/:count | featured products
| GET   | /api/v1/products/get/count | products count  

<hr>
<h3>Your feedback and contributions are welcome!</h3>
