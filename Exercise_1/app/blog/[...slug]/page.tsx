interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function blog({ params }: Props) {
  const { slug } = await params;

  const slugPath = slug?.join("/") || "Home";

  return <h1>Blog: {slugPath}</h1>;
}