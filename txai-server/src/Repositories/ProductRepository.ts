import Products from "../Model/Products";
import User from "../Model/Users";

class ProductRepository {
    async createProduct(product: Products) {
        let findProduct;

        /*caso seja passado um id a ação será identificada como uma atualização*/
        if (product.hasOwnProperty('id')) {
            findProduct = await Products.query().where("id", product.id).first()
        } else {
            findProduct = await Products.query().where("name", product.name).first()
        }

        if (!findProduct) {
            findProduct = new Products()
        }

        findProduct.name = product.name || findProduct.name
        findProduct.value = product.value || findProduct.value
        findProduct.quantity = product.quantity || findProduct.quantity
        findProduct.id_user = product.id_user || findProduct.id_user

        await findProduct.save()

        return findProduct
    }

    async deleteProduct(product: Products) {
        console.log(product)
        let findProduct = await Products.query().where("id", product.id).first()

        if(findProduct){
            findProduct.delete()
        }

    }

    async showUserProducts(user: User) {
        const findProducts = await Products.query().where("id_user", user.id)

        return findProducts
    }
}

export default ProductRepository;