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
    const [whatsappMessage, setWhatsappMessage] = useState('');

    const copyWithTextArea = (text: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textArea);
        return copied;
    };

    const copyToClipboard = async () => {
        if (!whatsappMessage) return;

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(whatsappMessage);
            } else if (!copyWithTextArea(whatsappMessage)) {
                throw new Error('Copy command failed');
            }

            alert('Cotización copiada al portapapeles');
        } catch {
            if (copyWithTextArea(whatsappMessage)) {
                alert('Cotización copiada al portapapeles');
            } else {
                alert('No se pudo copiar la cotización. Inténtalo de nuevo.');
            }
        }
    };

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
        let precioStr = '';
        let estimatedRate = 0;

        if (area < 25) {
            precioStr = '$500 - $600';
            estimatedRate = 500;
        } else if (area >= 25) {
            estimatedRate = area * 5 + 500;
            precioStr = `$${estimatedRate} - $${estimatedRate + 100}`;
        }

        setRate(estimatedRate);
        setResultado(precioStr);

        setWhatsappMessage(`Costo estimado por sesión ${precioStr}
Paquete de 4 sesiones: $${(estimatedRate * 4 - estimatedRate * 4 * 0.1).toLocaleString()}
Paquete de 8 sesiones: $${(estimatedRate * 8 - estimatedRate * 8 * 0.15).toLocaleString()}
Paquete de 12 sesiones: $${(estimatedRate * 12 - estimatedRate * 12 * 0.2).toLocaleString()}`);
    };

    const title = 'Cotizador de tatuajes';
    const breadcrumbs = [
        { title: 'Inicio', href: '/' },
        { title: title, href: '/pricing-calculator' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="bg-custom-beige-light dark:bg-custom-oscuro border-custom-piel/10 dark:border-custom-beige/20 mx-2 mt-4 mb-16 max-w-6xl rounded-[32px] border p-6 px-4 shadow-sm md:mx-auto md:p-10">
                <form onSubmit={calcular} className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-md text-custom-piel dark:text-custom-beige font-fira font-medium tracking-tight md:text-xl">
                            Ingresa las dimensiones de tu tatuaje, envianos un mensaje y comienza tu tratamiento
                        </h2>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Alto Input */}
                        <div className="relative flex flex-1 flex-col">
                            <label className="text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1 text-sm font-medium">
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
                                className={`w-full rounded-2xl border bg-white/50 px-4 py-3 dark:bg-black/10 ${
                                    errors.alto
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige'
                                } focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige transition-all duration-300 outline-none focus:ring-2`}
                                placeholder="Ej. 10"
                            />
                            {errors.alto && <span className="mt-1.5 ml-1 text-xs font-medium text-red-500">{errors.alto}</span>}
                        </div>

                        {/* Ancho Input */}
                        <div className="relative flex flex-1 flex-col">
                            <label className="text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1 text-sm font-medium">
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
                                className={`w-full rounded-2xl border bg-white/50 px-4 py-3 dark:bg-black/10 ${
                                    errors.ancho
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige'
                                } focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige transition-all duration-300 outline-none focus:ring-2`}
                                placeholder="Ej. 5"
                            />
                            {errors.ancho && <span className="mt-1.5 ml-1 text-xs font-medium text-red-500">{errors.ancho}</span>}
                        </div>
                    </div>

                    <div className="relative flex flex-col">
                        <label className="text-custom-oscuro dark:text-custom-piel mb-1.5 ml-1 text-sm font-medium">Tipo de Tinta</label>
                        <div className="relative">
                            <select
                                value={tinta}
                                onChange={(e) => setTinta(e.target.value)}
                                className="border-custom-piel/20 dark:border-custom-beige/20 focus:border-custom-piel focus:dark:border-custom-beige focus:ring-custom-piel/20 dark:focus:ring-custom-beige/20 text-custom-piel dark:text-custom-beige w-full cursor-pointer appearance-none rounded-2xl border bg-white/50 px-4 py-3 transition-all duration-300 outline-none focus:ring-2 dark:bg-black/10"
                            >
                                <option value="negra">Tinta Negra</option>
                                <option value="color">Color</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    className="text-custom-piel/60 dark:text-custom-beige/60 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-custom-piel dark:bg-custom-beige text-custom-beige-light dark:text-custom-oscuro mt-4 w-full rounded-full py-3.5 font-medium tracking-wide shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-[0.98]"
                    >
                        Obtener estimación
                    </button>
                </form>

                {resultado && (
                    <div className="border-custom-piel/10 dark:border-custom-beige/10 animate-fade-in-up mt-8 flex flex-col items-center border-t pt-6">
                        <span className="text-custom-oscuro dark:text-custom-piel mb-2 text-sm font-light">Costo estimado por sesión</span>
                        <p className="text-custom-piel dark:text-custom-beige font-fira text-4xl font-medium md:text-5xl">{resultado}</p>
                        <div className="mt-4 flex flex-col gap-2 text-center">
                            <p className="text-custom-piel dark:text-custom-beige font-fira flex flex-col justify-center gap-2 text-2xl font-medium md:flex-row md:text-2xl">
                                <span className="text-custom-oscuro dark:text-custom-piel mb-2 text-lg font-light">Paquete de 4 sesiones:</span>
                                <div>
                                    <span className="line-through">${rate * 4}</span>&nbsp;&nbsp;
                                    <span className="font-bold">${(rate * 4 - rate * 4 * 0.1).toLocaleString()}</span>
                                </div>
                            </p>
                            <p className="text-custom-piel dark:text-custom-beige font-fira flex flex-col justify-center gap-2 text-2xl font-medium md:flex-row md:text-2xl">
                                <span className="text-custom-oscuro dark:text-custom-piel mb-2 text-lg font-light">Paquete de 8 sesiones:</span>
                                <div>
                                    <span className="line-through">${rate * 8}</span>&nbsp;&nbsp;
                                    <span className="font-bold">${(rate * 8 - rate * 8 * 0.15).toLocaleString()}</span>
                                </div>
                            </p>
                            <p className="text-custom-piel dark:text-custom-beige font-fira flex flex-col justify-center gap-2 text-2xl font-medium md:flex-row md:text-2xl">
                                <span className="text-custom-oscuro dark:text-custom-piel mb-2 text-lg font-light">Paquete de 12 sesiones:</span>
                                <div>
                                    <span className="line-through">${rate * 12}</span>&nbsp;&nbsp;
                                    <span className="font-bold">${(rate * 12 - rate * 12 * 0.2).toLocaleString()}</span>
                                </div>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={copyToClipboard}
                            className="bg-custom-piel dark:bg-custom-beige text-custom-beige-light dark:text-custom-oscuro mt-4 w-1/2 rounded-full py-3.5 font-medium tracking-wide shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:scale-[0.98]"
                        >
                            Copiar cotización
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
