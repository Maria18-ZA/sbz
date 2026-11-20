import { Link } from '@inertiajs/react'

export default function IndexPage({ orcamentos }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Orçamentos</h1>
                    <Link href="/orcamentos/create" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Novo Orçamento
                    </Link>
                </div>

                {orcamentos.length === 0 ? (
                    <p className="text-gray-500">Ainda não há orçamentos.</p>
                ) : (
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Nº</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Cliente</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Data</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Validade</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Estado</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Total (Kz)</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orcamentos.map((o) => (
                                    <tr key={o.id}>
                                        <td className="px-4 py-3 text-gray-800">#{o.id}</td>
                                        <td className="px-4 py-3 text-gray-700">{o.cliente.nome}</td>
                                        <td className="px-4 py-3 text-gray-600">{o.data}</td>
                                        <td className="px-4 py-3 text-gray-600">{o.validade ?? '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded px-2 py-1 text-xs font-medium ${
                                                o.estado === 'aprovado' ? 'bg-green-100 text-green-700' :
                                                o.estado === 'rejeitado' ? 'bg-red-100 text-red-700' :
                                                o.estado === 'enviado' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {o.estado}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-800">{o.total}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link href={`/orcamentos/${o.id}`} className="text-blue-600 hover:underline">
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