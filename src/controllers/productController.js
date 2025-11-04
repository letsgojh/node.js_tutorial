let products = [];
let nextId = 1;

//전체조회
export const getAllProducts = (req,res)=>{
    res.status(200).json({data : products});
}


//단일 조회
export const getProductById = (req,res)=>{
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id); //{id : k, name : 유재환}으로 되어있을때 찾기
    if(!product){ //발견 못한다면 error 출력
        return res.status(404).json({error : 'Product not found'});
    }
    return res.json({data : product});
}

//상품 생성
export const createProduct =  (req,res)=>{
    const {name, price} = req.body;
    if(!name || !price){
        return res.status(404).json({error : "Namd and price are required "});
    }
    const newProduct = {id : nextId++,name,price};
    products.push(newProduct);
    res.status(201).json({data : newProduct});
}

//상품 정보 업데이트
export const updateAllProduct =  (req,res)=>{
    const id = Number(req.params.id); //id로 수정하기
    const index = products.findIndex(u => u.id === id); //몇번째 index에 있는지 찾기
    
    const {name,price} = req.body;

    if(index === -1){ //못찾으면
        return res.status(404).json({data : "Name and price are required"});
    }
    products[index] = {id,name,price}; //아예 새로운 객체를 할당

    res.json({data : products[index]});
}

//상품 정보 부분 업데이트
export const updatePartProduct =  (req,res)=>{
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if(!product){
        return res.status(404).json({data : `Name and price are required`});
    }
    const {name, price} = req.body;
    //둘 중에 아무거나 수정해도된다.(입력 안하면 그냥 넘어가도록)
    if(name) product.name = name;
    if(price) product.price = price;

    res.json({data : product});
}


export const deleteProduct = (req,res)=>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({data : "There is no content"});
    }
    products = products.filter(p => p.id !== id);
    res.status(204).send();
}