import { Button } from "@/components/ui/button";
import { ProductModel } from "@/model/product-model";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export const tableColumns: ColumnDef<ProductModel>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    size: 160,
    minSize: 160,
  },
  {
    accessorKey: "price",
    header: "Preço",
    size: 160,
    minSize: 160,
    cell: ({ row }) => {
      const price = row.original.price;
      return `R$ ${price.toFixed(2)}`;
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    size: 160,
    minSize: 160,
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    size: 160,
    minSize: 160,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "missingLetter",
    header: "Letra Ausente",
    size: 160,
    minSize: 160,
  },
  {
    id: "actions",
    header: "",
    size: 160,
    minSize: 160,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <Link to={`/product/edit/${product.id}`}>
            <Button variant="ghost" size="icon">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`/product/${product.id}/delete`}>
            <Button variant="ghost" size="icon">
              <Trash className="w-4 h-4 text-destructive" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
