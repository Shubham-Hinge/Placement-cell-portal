export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Unauthorized
        </h1>

        <p className="mt-4">
          You do not have permission
          to access this page.
        </p>
      </div>
    </div>
  );
}