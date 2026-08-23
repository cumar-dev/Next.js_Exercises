type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Users({ params }: Props) {
  const { username } = await params;

  return <h1>Welcome {username}</h1>;
}