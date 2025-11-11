export default function UserProfile({ params }) {
  return (
    <>
      <h1>The Guy!</h1>
      <h2>Hello {params.username}</h2>
    </>
  );
}
