import { Navbar } from "@/widgets/navbar";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center" />
    </div>
  );
};
