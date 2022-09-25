import { CreateProduct } from "../components/CreateProduct";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { IProduct } from '../models'
import { Product } from "../components/Product";
import { useProducts } from "../hooks/products";
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext'

export function ProductsPage() {
    const {loading, error, products, addProduct} = useProducts()
    const {modal, open, close} = useContext(ModalContext)
  
    const createHandler = (product: IProduct) => {
      close()
      addProduct(product)
    }
  
    return (
      <>
      <div className="container mx-auto max-w-2xl pt-5">
        { loading && <Loader/> }
        { error && <ErrorMessage error={error} /> }
        { products.map(product => <Product product={product} key={product.id} />) }
  
      {modal && <Modal title="Create new product" onClose={close}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button 
      className="fixed bottom-5 right-5 rounded-full bg-blue-700 text-white text-2xl px-4 py-2"
      onClick={open}
      >+</button>
      </div>
      </>
    )
}