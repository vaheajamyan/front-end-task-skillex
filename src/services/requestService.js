import filterService from "./filterService";

const tempData = {
    "products": [
        {
            "id": 1,
            "name": "Wireless Headphones",
            "category": "Electronics",
            "brand": "Brand A",
            "price": 99.99,
            "rating": 4.5,
            "imageUrl": "https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640"
        },
        {
            "id": 2,
            "name": "Bluetooth Speaker",
            "category": "Electronics",
            "brand": "Brand B",
            "price": 49.99,
            "rating": 4.0,
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkwVlXVumWVBv0SHal7MRD1fOGfrJrPrZHoA&s"
        },
        {
            "id": 3,
            "name": "Running Shoes",
            "category": "Footwear",
            "brand": "Brand C",
            "price": 59.99,
            "rating": 4.2,
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWzfbWE7qefZjIb2AQrzrE1ZEmP5ErCdQlQ&s"
        },
        {
            "id": 4,
            "name": "Smartphone",
            "category": "Electronics",
            "brand": "Brand D",
            "price": 499.99,
            "rating": 4.8,
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV9O8IKL0fCUh2D26rXHPceV_7Zu_eUDnGw&s"
        },
        {
            "id": 5,
            "name": "Leather Jacket",
            "category": "Clothing",
            "brand": "Brand E",
            "price": 199.99,
            "rating": 4.7,
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_j0K1d2JIDBo6PuVvZyXcOw2VIDNcz244Q&s"
        }
    ]
}


export default function requestService(filters) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(filterService(tempData, filters));
        }, 500)
    })
}