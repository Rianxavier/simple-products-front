import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type ProductFormValues,
  productSchema,
} from "@/schemas/product-schema";
import { DefaultModal, type DefaultModalRef } from "./default-modal";

import { HttpClient } from "@/extensions/http-client/http-client";
import { isApiError } from "@/model/ApiError";
import { parsePriceFunction } from "@/utils/parsePrice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UpdateProductModalRef {
  open: (id: string) => void;
  close: () => void;
}

const api = HttpClient("http://localhost:3000");

export const UpdateProductModal = forwardRef<UpdateProductModalRef>(
  (_, ref) => {
    const modalRef = useRef<DefaultModalRef>(null);
    const navigate = useNavigate();
    const [productId, setProductId] = useState<string | null>(null);

    const form = useForm<ProductFormValues>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: "",
        price: "",
        sku: "",
      },
    });

    useImperativeHandle(ref, () => ({
      open: async (id: string) => {
        setProductId(id);
        try {
          const response = await api.get<ProductFormValues>(`products/${id}`);
          if (response.status >= 200 && response.status < 300) {
            const { name, price, sku } = response.data;

            form.reset({
              name,
              sku,
              price:
                typeof price === "number"
                  ? Number(price).toFixed(2).replace(".", ",")
                  : price,
            });

            modalRef.current?.open();
          } else {
            toast.error("Erro ao buscar produto");
          }
        } catch {
          toast.error("Erro inesperado ao buscar o produto.");
        }
      },
      close: () => {
        modalRef.current?.close();
      },
    }));

    const onSubmit = async (data: ProductFormValues) => {
      if (!productId) return;

      try {
        const payload = {
          ...data,
          price: parsePriceFunction(data.price),
        };

        const response = await api.put(`products/${productId}`, payload);

        if (response.status >= 200 && response.status < 300) {
          toast.success("Produto atualizado com sucesso!");
          modalRef.current?.close();
          form.reset();
          navigate("/");
        } else if (isApiError(response.data)) {
          const message =
            response.data.message === "SKU already exists"
              ? "SKU já está em uso"
              : response.data.message;

          toast.error(message);
        } else {
          toast.error("Erro ao atualizar produto. Tente novamente.");
        }
      } catch (error) {
        toast.error("Erro inesperado. Tente novamente mais tarde." + error);
      }
    };

    return (
      <DefaultModal ref={modalRef} blur>
        <div className="rounded-xl w-full max-w-md bg-white p-6 text-black">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Atualizar Produto
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Preço</FormLabel>
                    <FormControl>
                      <NumericFormat
                        {...field}
                        customInput={Input}
                        placeholder="Preço"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        prefix="R$ "
                        onValueChange={(values) => {
                          field.onChange(values.value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <Button type="submit">Atualizar</Button>
              </div>
            </form>
          </Form>
        </div>
      </DefaultModal>
    );
  }
);
