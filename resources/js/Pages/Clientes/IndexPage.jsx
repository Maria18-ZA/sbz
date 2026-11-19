import { Link } from '@inertiajs/react'

export default function IndexPage({ clientes }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
                    <Link
                        href="/clientes/create"
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Novo Cliente
                    </Link>
                </div>

                {clientes.length === 0 ? (
                    <p className="text-gray-500">Ainda não há clientes registados.</p>
                ) : (
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Contacto</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td className="px-6 py-4 text-gray-800">{cliente.nome}</td>
                                        <td className="px-6 py-4 text-gray-600">{cliente.tipo}</td>
                                        <td className="px-6 py-4 text-gray-600">{cliente.contacto}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/clientes/${cliente.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}