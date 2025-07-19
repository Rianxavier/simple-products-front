import { DataTable } from "@/components/ui/date-table";
import { HttpClient } from "@/extensions/http-client/http-client";
import { ProductModel } from "@/model/product-model";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CreateProductModal,
  type CreateProductModalRef,
} from "../components/modal/create-product-modal";
import {
  UpdateProductModal,
  type UpdateProductModalRef,
} from "../components/modal/update-product-modal";
import { tableColumns } from "../components/table-columns";

const api = HttpClient("http://localhost:3000");

export const ProductPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const modalRef = useRef<CreateProductModalRef>(null);
  const updateModalRef = useRef<UpdateProductModalRef>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get<ProductModel[]>("products")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const list = response.data.map((item) => new ProductModel(item));
          setProducts(list);
          setError(null);
        } else {
          setError(`Erro ao carregar produtos: ${response.status}`);
        }
      })
      .catch(() => setError("Erro na requisição"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.pathname === "/product/create") {
      modalRef.current?.open();
    }
    if (location.pathname === `/product/edit/${id}`) {
      updateModalRef.current?.open(id!);
    }
  }, [id, location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1D3E] via-[#1F3B70] to-[#306DAD] text-white">
      <header className="flex items-center justify-between px-8 py-6 shadow-lg bg-[#0C1D3E] border-b border-[#1F3B70]">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>

        <button
          className="bg-[#339CFF] hover:bg-[#2687DD] text-white px-4 py-2 rounded"
          onClick={() => navigate("/product/create")}
        >
          Adicionar Produto
        </button>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Lista de Produtos
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-6 text-black">
          {loading ? (
            <p>Carregando produtos...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <DataTable columns={tableColumns} data={products} />
          )}
        </div>
      </main>

      <CreateProductModal ref={modalRef} />
      <UpdateProductModal ref={updateModalRef} />
    </div>
  );
};
