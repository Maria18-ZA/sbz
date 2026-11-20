import { Link, router } from '@inertiajs/react'

const estados = ['medicao', 'corte', 'costura', 'prova', 'entrega']

const corEstado = {
    medicao: 'bg-gray-100 text-gray-700',
    corte: 'bg-yellow-100 text-yellow-700',
    costura: 'bg-blue-100 text-blue-700',
    prova: 'bg-purple-100 text-purple-700',
    entrega: 'bg-green-100 text-green-700',
}

export default function ShowPage({ pedido }) {
    function mudarEstado(estado) {
        router.patch(`/pedidos/${pedido.id}/estado`, { estado_producao: estado })
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/pedidos" className="mb-4 inline-block text-blue-600 hover:underline">← Voltar</Link>

                {/* Cabeçalho */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Pedido #{pedido.id}</h1>
                            <p className="mt-1 text-gray-600">Cliente: {pedido.cliente.nome}</p>
                            <p className="text-gray-600">Orçamento: #{pedido.orcamento.id}</p>
                            <p className="text-gray-600">Entrega: {pedido.data_entrega ?? '—'}</p>
                            <p className="text-gray-600">Responsável: {pedido.responsavel ?? '—'}</p>
                        </div>
                        <span className={`rounded px-3 py-1 text-sm font-medium ${corEstado[pedido.estado_producao]}`}>
                            {pedido.estado_producao}
                        </span>
                    </div>

                    {/* Avançar estado */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {estados.map((e) => (
                            <button key={e} onClick={() => mudarEstado(e)}
                                disabled={pedido.estado_producao === e}
                                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 disabled:opacity-40">
                                {e}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Itens do orçamento de origem */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-3 text-lg font-semibold text-gray-800">Peças do Pedido</h2>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Descrição</th>
                                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Tipo</th>
                                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Qtd</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pedido.orcamento.itens.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-3 py-2 text-gray-800">{item.descricao}</td>
                                    <td className="px-3 py-2 text-gray-600">{item.tipo_servico ?? '—'}</td>
                                    <td className="px-3 py-2 text-right text-gray-600">{item.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Histórico */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-3 text-lg font-semibold text-gray-800">Histórico de Produção</h2>
                    {pedido.historico.length === 0 ? (
                        <p className="text-gray-500">Sem registos.</p>
                    ) : (
                        <ol className="relative border-l border-gray-200 pl-4">
                            {pedido.historico.map((h) => (
                                <li key={h.id} className="mb-4">
                                    <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500"></span>
                                    <p className="text-sm font-medium text-gray-800">{h.estado}</p>
                                    <p className="text-xs text-gray-500">{h.data}</p>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    )
}