interface props {
    params: Promise<{
        slug: string
    }>
}
export default async function blog({params}: props) {
const {slug} = await params;
const slugPath = slug?.join(" / ") || "Home";
return <h1>blog: {slugPath}</h1>
}