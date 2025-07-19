import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type JSX,
} from "react";

export interface DefaultModalProps {
  children?: JSX.Element | JSX.Element[];
  blur?: boolean;
}

export interface DefaultModalRef {
  open: () => void;
  close: () => void;
}

export const DefaultModal = forwardRef(
  (
    { children, blur }: DefaultModalProps,
    ref: ForwardedRef<DefaultModalRef>
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
      }),
      []
    );

    if (!open) return null;

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          blur ? "backdrop-blur-sm bg-black/30" : "bg-black/30"
        }`}
      >
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
          {children}
        </div>
      </div>
    );
  }
);
