import { NumericFormat } from "react-number-format";

import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

import { HttpClient } from "@/extensions/http-client/http-client"; // seu http client
import { isApiError } from "@/model/ApiError";
import { parsePriceFunction } from "@/utils/parsePrice";
import { useNavigate } from "react-router-dom";

export interface CreateProductModalRef {
  open: () => void;
  close: () => void;
}

const api = HttpClient("http://localhost:3000");

export const CreateProductModal = forwardRef<CreateProductModalRef>(
  (_, ref) => {
    const modalRef = useRef<DefaultModalRef>(null);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.open(),
      close: () => {
        modalRef.current?.close();
      },
    }));

    const form = useForm<ProductFormValues>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: "",
        price: "",
        sku: "",
      },
    });

    const onSubmit = async (data: ProductFormValues) => {
      try {
        const payload = {
          ...data,
          price: parsePriceFunction(data.price),
        };

        const response = await api.post("products", payload);

        if (response.status >= 200 && response.status < 300) {
          toast.success("Produto cadastrado com sucesso!");
          modalRef.current?.close();
          form.reset();
        } else if (isApiError(response.data)) {
          const message =
            response.data.message === "SKU already exists"
              ? "SKU já está em uso"
              : response.data.message;

          toast.error(message);
          navigate("/");
        } else {
          toast.error("Erro ao cadastrar produto. Tente novamente.");
        }
      } catch (error) {
        toast.error("Erro inesperado. Tente novamente mais tarde." + error);
      }
    };

    return (
      <DefaultModal ref={modalRef} blur>
        <div className="rounded-xl w-full max-w-md bg-white p-6 text-black">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Cadastrar Produto
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
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </Form>
        </div>
      </DefaultModal>
    );
  }
);
