'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { ConfirmModal } from "@/components/ConfirmModal";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

const transactions: ITransaction[] = [
  {
    id: "1",
    title: "Salário",
    price: 5000,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-01"),
  },
  {
    id: "2",
    title: "Aluguel",
    price: 1500,
    category: "Moradia",
    type: "OUTCOME",
    data: new Date("2024-06-05"),
  },
  {
    id: "3",
    title: "Supermercado",
    price: 300,
    category: "Alimentação",
    type: "OUTCOME",
    data: new Date("2024-06-10"),
  },
  {
    id: "4",
    title: "Freelance",
    price: 1200,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-15"),
  }
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);

  const handleFormSubmit = (transaction: ITransaction) => {
    if (transactionToEdit) {
      setTransactionData((prev) => prev.map((t) => t.id === transaction.id ? transaction : t));
    } else {
      setTransactionData((prev) => [...prev, transaction]);
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(null);
  }

  const handleOpenEdit = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  }

  const handleConfirmDelete = () => {
    setTransactionData((prev) => prev.filter((t) => t.id !== transactionToDeleteId));
    setTransactionToDeleteId(null);
  }

  const calculaTotal = useMemo(() => {
    return transactionData.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 });
  }, [transactionData]);

  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)} />
      <BodyContainer>
        <CardContainer totalValues={calculaTotal} />
        <Table
          data={transactionData}
          onEdit={handleOpenEdit}
          onDelete={(id) => setTransactionToDeleteId(id)}
        />
      </BodyContainer>

      {isFormModalOpen && (
        <FormModal
          closeModal={handleCloseFormModal}
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"}
          onSubmit={handleFormSubmit}
          transaction={transactionToEdit ?? undefined}
        />
      )}

      {transactionToDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja excluir esta transação?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setTransactionToDeleteId(null)}
        />
      )}
    </div>
  );
}
