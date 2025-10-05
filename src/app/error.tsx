'use client'
type Props = {
    error: Error
}
export default function Error({ error }: Props) {
    return (
      <div>
        <h1 className="text-red-600 text-3xl font-bold mt-100 text-center">
          Something went wrong
        </h1>
        <p className="text-red-600 text-xl font-bold text-center">{error.message}</p>
      </div>
    );
    

}