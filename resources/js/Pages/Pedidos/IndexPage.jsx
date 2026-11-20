import { Link } from '@inertiajs/react'

const corEstado = {
    medicao: 'bg-gray-100 text-gray-700',
    corte: 'bg-yellow-100 text-yellow-700',
    costura: 'bg-blue-100 text-blue-700',
    prova: 'bg-purple-100 text-purple-700',
    entrega: 'bg-green-100 text-green-700',
}

export default function IndexPage({ pedidos }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Pedidos</h1>

                {pedidos.length === 0 ? (
                    <p className="text-gray-500">Ainda não há pedidos. Crie um a partir de um orçamento aprovado.</p>
                ) : (
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Nº</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Cliente</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Orçamento</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Entrega</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Estado</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Responsável</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pedidos.map((p) => (
                                    <tr key={p.id}>
                                        <td className="px-4 py-3 text-gray-800">#{p.id}</td>
                                        <td className="px-4 py-3 text-gray-700">{p.cliente.nome}</td>
                                        <td className="px-4 py-3 text-gray-600">#{p.orcamento.id}</td>
                                        <td className="px-4 py-3 text-gray-600">{p.data_entrega ?? '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded px-2 py-1 text-xs font-medium ${corEstado[p.estado_producao]}`}>
                                                {p.estado_producao}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{p.responsavel ?? '—'}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link href={`/pedidos/${p.id}`} className="text-blue-600 hover:underline">Ver</Link>
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