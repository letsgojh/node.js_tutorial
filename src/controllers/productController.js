export const getProducts = (req, res) => {
    const { active, page } = req.query;
    res.json({
        message: "Products List",
        filters: { active, page }
    });
}

export const createProducts = (req, res) => {
    const { name, price } = req.body;
    res.status(201).json({
        message: "Products Created",
        data: {
            name: name,
            price: price
        }
    });
}