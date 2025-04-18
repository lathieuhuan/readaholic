import NavigationBar from "@/components/navigation-bar";

export default function SignedInLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
