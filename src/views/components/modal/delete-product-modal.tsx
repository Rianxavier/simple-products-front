import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { HttpClient } from "@/extensions/http-client/http-client";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultModal, type DefaultModalRef } from "./default-modal";

export interface DeleteProductModalRef {
  open: (id: string) => void;
  close: () => void;
}

const api = HttpClient("http://localhost:3000");

export const DeleteProductModal = forwardRef<DeleteProductModalRef>(
  (_, ref) => {
    const { id } = useParams<{ id: string }>();
    const modalRef = useRef<DefaultModalRef>(null);
    const [productId, setProductId] = useState<string | null>(id!);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      open: (id: string) => {
        setProductId(id);
        modalRef.current?.open();
      },
      close: () => {
        modalRef.current?.close();
      },
    }));

    const handleDelete = async () => {
      if (!productId) return;

      try {
        const response = await api.delete(`products/${productId}`);

        if (response.status >= 200 && response.status < 300) {
          toast.success("Produto deletado com sucesso!");
          modalRef.current?.close();
          navigate("/");
        } else {
          toast.error("Erro ao deletar produto. Tente novamente.");
        }
      } catch {
        toast.error("Erro inesperado ao deletar produto.");
      }
    };

    return (
      <DefaultModal ref={modalRef} blur>
        <div className="rounded-xl w-full max-w-md bg-white p-6 text-black">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Confirmar Exclusão
          </h2>
          <p className="mb-6">
            Tem certeza que deseja excluir este produto? Esta ação não poderá
            ser desfeita.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                modalRef.current?.close();
                navigate("/");
              }}
            >
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Deletar
            </Button>
          </div>
        </div>
      </DefaultModal>
    );
  }
);
