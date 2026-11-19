import { useForm, Link } from '@inertiajs/react'

export default function CreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        tipo: 'particular',
        contacto: '',
        email: '',
        morada: '',
        setor: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/clientes')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Novo Cliente</h1>

                <form onSubmit={submit} className="space-y-4 rounded-lg bg-white p-6 shadow">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
                        <input
                            type="text"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Tipo *</label>
                        <select
                            value={data.tipo}
                            onChange={(e) => setData('tipo', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="particular">Particular</option>
                            <option value="empresa">Empresa</option>
                        </select>
                        {errors.tipo && <p className="mt-1 text-sm text-red-600">{errors.tipo}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Contacto *</label>
                        <input
                            type="text"
                            value={data.contacto}
                            onChange={(e) => setData('contacto', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        {errors.contacto && <p className="mt-1 text-sm text-red-600">{errors.contacto}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Morada</label>
                        <input
                            type="text"
                            value={data.morada}
                            onChange={(e) => setData('morada', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Setor</label>
                        <input
                            type="text"
                            value={data.setor}
                            onChange={(e) => setData('setor', e.target.value)}
                            placeholder="ex: escolar, hospitalar, hotelaria"
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Guardar
                        </button>
                        <Link href="/clientes" className="text-gray-600 hover:underline">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}