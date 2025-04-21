import { NavigationBar } from "@app/_components/navigation-bar";

export default function SignedInLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
