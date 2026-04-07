import React, { useState } from 'react';

import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

export default function PricingCalculator() {
    const [alto, setAlto] = useState<number | undefined>(undefined);
    const [ancho, setAncho] = useState<number | undefined>(undefined);
    const [tinta, setTinta] = useState('negra');
    const [errors, setErrors] = useState({ alto: '', ancho: '' });
    const [resultado, setResultado] = useState('');
    const [rate, setRate] = useState(0);
    const [whatsappMessage, setWhatsappMessage] = useState('')

    const validate = () => {
        let valid = true;
        const newErrors = { alto: '', ancho: '' };

        if (!alto || isNaN(alto) || Number(alto) <= 0) {
            newErrors.alto = 'Ingresa un valor válido y mayor a 0.';
            valid = false;
        }
        if (!ancho || isNaN(ancho) || Number(ancho) <= 0) {
            newErrors.ancho = 'Ingresa un valor válido y mayor a 0.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const calcular = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            setResultado('');
            return;
        }

        const area = Number(alto) * Number(ancho);
        let precioStr = "";

        if (area < 25) {
            precioStr = "$500 - $600";
            setRate(500)
        } else if (area >= 25) {
            const rate = area * 5 + 500
            setRate(rate)
            precioStr = `$${rate} - $${(rate + 100)}`;
        }

        setResultado(precioStr)

        setWhatsappMessage(`Hola, me gustaría obtener un presupuesto para la eliminación de tatuajes con las siguientes dimensiones: Altura: ${alto} cm, Ancho: ${ancho} cm, Tipo de tinta: ${tinta}. Mi cotización inicial fue de ${precioStr}, ¿me das información personalizada?`)
    };

    const title = "Cotizador de tatuajes";
    const breadcrumbs = [
        { title: 'Inicio', href: '/' },
        { title: title, href: '/pricing-calculator' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="max-w-6xl mx-2 md:mx-auto bg-custom-beige-light dark:bg-custom-oscuro rounded-[32px] p-6 md:p-10 shadow-sm border border-custom-piel/10 dark:border-custom-beige/20 mb-16 px-4 mt-4">
                <form onSubmit={calcular} className="flex flex-col gap-6">
                    <div>
                        <h2
                            className="text-md md:text-xl font-medium tracking-tight text-custom-piel dark:text-custom-beige font-fira"
                        >
                            Ingresa las dimensiones de tu tatuaje, envianos un mensaje y comienza tu tratamiento
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Alto Input */}
                        <div className="flex-1 flex flex-col relative">
                            <label className="text-sm font-medium text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1">
                                Alto (en cm) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={alto}
                                onChange={(e) => {
                                    setAlto(Number(e.target.value));
                                    if (errors.alto) setErrors({ ...errors, alto: '' });
                                }}
                                className={`w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/10 border ${errors.alto
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige'
                                    } outline-none transition-all duration-300 focus:ring-2 focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige`}
                                placeholder="Ej. 10"
                            />
                            {errors.alto && (
                                <span className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.alto}</span>
                            )}
                        </div>

                        {/* Ancho Input */}
                        <div className="flex-1 flex flex-col relative">
                            <label className="text-sm font-medium text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1">
                                Ancho (en cm) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={ancho}
                                onChange={(e) => {
                                    setAncho(Number(e.target.value));
                                    if (errors.ancho) setErrors({ ...errors, ancho: '' });
                                }}
                                className={`w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/10 border ${errors.ancho
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige'
                                    } outline-none transition-all duration-300 focus:ring-2 focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige`}
                                placeholder="Ej. 5"
                            />
                            {errors.ancho && (
                                <span className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.ancho}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col relative">
                        <label className="text-sm font-medium text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1">
                            Tipo de Tinta
                        </label>
                        <div className="relative">
                            <select
                                value={tinta}
                                onChange={(e) => setTinta(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/10 border border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige outline-none transition-all duration-300 focus:ring-2 focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige appearance-none cursor-pointer"
                            >
                                <option value="negra">Tinta Negra</option>
                                <option value="color">Color</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-custom-piel/60 dark:text-custom-beige/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 py-3.5 rounded-full bg-custom-piel dark:bg-custom-beige text-custom-beige-light dark:text-custom-oscuro font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
                    >
                        Obtener estimación
                    </button>
                </form>

                {resultado && (
                    <div className="mt-8 pt-6 border-t border-custom-piel/10 dark:border-custom-beige/10 flex flex-col items-center animate-fade-in-up">
                        <span className="text-sm font-light text-custom-oscuro dark:text-custom-piel mb-2">Costo estimado por sesión</span>
                        <p className="text-4xl md:text-5xl font-medium text-custom-piel dark:text-custom-beige font-fira">
                            {resultado}
                        </p>
                        <div className="flex flex-col gap-2 mt-4 text-center">
                            <p className="text-2xl md:text-2xl font-medium text-custom-piel dark:text-custom-beige font-fira flex flex-col gap-2 md:flex-row justify-center">
                                <span className="text-lg font-light text-custom-oscuro dark:text-custom-piel mb-2">Paquete de 4 sesiones:</span><div><span className="line-through">${rate * 4}</span>&nbsp;&nbsp;<span className='font-bold'>${(rate * 4 - (rate * 4 * 0.1)).toLocaleString()}</span></div>
                            </p>
                            <p className="text-2xl md:text-2xl font-medium text-custom-piel dark:text-custom-beige font-fira flex flex-col gap-2 md:flex-row justify-center">
                                <span className="text-lg font-light text-custom-oscuro dark:text-custom-piel mb-2">Paquete de 8 sesiones:</span><div><span className="line-through">${rate * 8}</span>&nbsp;&nbsp;<span className='font-bold'>${(rate * 8 - (rate * 8 * 0.15)).toLocaleString()}</span></div>
                            </p>
                            <p className="text-2xl md:text-2xl font-medium text-custom-piel dark:text-custom-beige font-fira flex flex-col gap-2 md:flex-row justify-center">
                                <span className="text-lg font-light text-custom-oscuro dark:text-custom-piel mb-2">Paquete de 12 sesiones:</span><div><span className="line-through">${rate * 12}</span>&nbsp;&nbsp;<span className='font-bold'>${(rate * 12 - (rate * 12 * 0.20)).toLocaleString()}</span></div>
                            </p>

                        </div>

                    </div>
                )}
            </div>

        </AppLayout >
    );
}
