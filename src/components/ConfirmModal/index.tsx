type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-700 opacity-75" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-modal text-left shadow-xl sm:w-full sm:max-w-sm p-8">
            <h2 className="text-title text-xl font-semibold mb-4">Confirmar exclusão</h2>
            <p className="text-title mb-8">{message}</p>
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 py-3 border border-gray-300 text-title font-semibold hover:bg-gray-100 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 bg-outcome text-white font-semibold hover:opacity-80 rounded-md"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
