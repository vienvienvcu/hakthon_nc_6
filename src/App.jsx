import "./App.css";
import CartList from "./component/CartList";
import ProductList from "./component/ProductList";
import Head from "./layouts/Head";

function App() {
  return (
    <>
      {/* phan header */}
      <Head />
      {/* danh sach san pham */}
      <section className="section_products">
        <ProductList />
      </section>
    </>
  );
}

export default App;
