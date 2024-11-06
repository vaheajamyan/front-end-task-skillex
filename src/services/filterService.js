export default function filterService(data, filters={}) {
    let tempData = [...data.products];

    // Filter By Category
    if (filters.category) {
        tempData = tempData.filter((item) =>
            item.category ===  filters.category
        )
    }
    // Filter By Brand
    if (filters.brand) {
        tempData = tempData.filter((item) =>
            item.brand ===  filters.brand
        )
    }
    // Filter By Min Price
    if (filters.minPrice !== "") {
        tempData = tempData.filter((item) =>
            item.price >=  +filters.minPrice
        )
    }
    // Filter By max Price
    if (filters.maxPrice !== "") {
        tempData = tempData.filter((item) =>
            item.price <=  +filters.maxPrice
        )
    }
    // Filter By Rating
    if (filters.rating !== "") {
        tempData = tempData.filter((item) =>
            item.rating <=  +filters.rating
        )
    }

    return tempData
}

//     rating: '',