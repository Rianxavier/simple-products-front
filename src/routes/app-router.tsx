import { ProductPage } from "@/views/pages/product-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/create" element={<ProductPage />} />
        <Route path="/product/edit/:id" element={<ProductPage />} />
        <Route path="/product/delete/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};
