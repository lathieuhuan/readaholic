import { getUserSession } from "@/utils/auth-utils";

export default async function UserProfile() {
  const user = await getUserSession();

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}
