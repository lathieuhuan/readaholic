import { getUserSession } from "@app/_utils/auth-utils";

export async function UserProfile() {
  const user = await getUserSession();

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}
